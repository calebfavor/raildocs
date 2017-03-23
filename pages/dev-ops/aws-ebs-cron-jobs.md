# AWS EBS Cron Jobs

<!-- MarkdownTOC -->

1. Setup
1. Deployment
1. How does this work?
    1. Documentation
    1. How does this work?
        1. Parts
        1. A little explaination maybe?
        1. Protecting the new routes on the "web" environment
    1. How do I deploy? How do I ssh in?
1. Troubleshooting notes
    1. tail access log
    1. `CronTestTarget` command for testing functionality.
    1. "gotchas"
        1. Deployment gotchas
        1. rebuilding
1. Todo

<!-- /MarkdownTOC -->

## Setup

1. [ ] Follow instructions for *dusterio/laravel-aws-worker* package
1. [ ] Create worker environment for your application
    * You do not need to create a queue to use
        * you will configure —or use a saved configuration that configures— the worker environment to generate a queue (and dead-letter queueu) upon creation|rebuilding.
    * "Actions" → "Create Environment" → "Create Worker"
    * there may be a saved environment configuration you can use. If there is not, copy (manually, arg) from the 'web' environment. Don't clone.
        * for Pianote — as of January 10th 2017 — you can use "pianote-worker-isabella"
    * You can chose the default settings, **except**
        * "Worker Details" → "HTTP path" *must* be `/worker/queue`.
    * in "Worker Details" you'll keep the default "Worker queue" option of "Autogenerate queue". This means that as described in the *dusterio/laravel-aws-worker* package instructions, you must specify the queue to be used. Refer to those instructions, setting the queue name as an environment variable that is passed into the `config/queue.php` file.
        * if you used the "pianote-worker-env-isabella" there are "SQS_QUEUE" and "SQS_QUEUE_URL" environment variables available to set ("Configuration" → "Software Configuration" → "Environment Properties")
        * Remember —as per the *dusterio/laravel-aws-worker* package instructions— to set the sqs queue url not as the actual url noted in the SQS details, but rather just as the first two sections, So, instead of `https://sqs.us-east-1.amazonaws.com/671790291617/awseb-e-83z72jgszx-stack-AWSEBWorkerQueue-ZZUA42F2JETR`, you'll have just `https://sqs.us-east-1.amazonaws.com/671790291617` (truncate it so it ends with your user number. Also, note that there' no trailing slash).
1. [ ] `REGISTER_WORKER_ROUTES` environment variable
    * [ ] set it to `true` for the worker-environment
    * [ ] set it to `false` for the web-environment
1. [ ] Make sure the "document root" is set to `/public/` (found in "Configuration" → "Software Configuration" → "Container Options")

**Continue with instructions in "Deployment" section below.**

## Deployment

1. [ ] Commit your changes.
1. [ ] right before commiting
    1. [ ] Pull to ensure you're deploying the latest version of the application.
    1. [ ] run the `gulp` command locally. to ensure compiled assets haved changed. I'm not sure if this is required for the worker, but it doesn't seem like a risk worth taking. You definitely want to do this when deploying the web environment, so just make a habit of it.
1. [ ] deploy to worker (something along the lines of `eb deploy pianote-worker-alejendra`).
1. [ ] after you deploy, ssh into the worker and 
    1. [ ] comment out the following sections of .htaccess (in /public):
        * get there with this: `sudo nano /var/www/html/public/.htaccess`
        * It'll look like this:
            ```
                # Force WWW
            #    RewriteCond %{HTTP_HOST} !^dev* [NC]
            #    RewriteCond %{HTTP_HOST} !^$
            #    RewriteCond %{HTTP_HOST} !^www\. [NC]
            #    RewriteCond %{HTTPS} !=on
            #    RewriteRule ^ https://www.%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

                # Force HTTPS
            #    RewriteCond %{HTTP:X-Forwarded-Proto} =http [OR]
            #    RewriteCond %{HTTP:X-Forwarded-Proto} =""
            #    RewriteCond %{HTTPS} !=on
            #    RewriteCond %{SERVER_NAME} !^dev*
            #    RewriteRule ^.*$ https://%{SERVER_NAME}%{REQUEST_URI} [R=301,L]
            ```
    1. [ ] change permissions of `storage/` directory by running (likely) `sudo chmod -R 777 /var/www/html/storage/`


## How does this work?

### Documentation

* [Stackoverflow answer to "AWS Elastic Beanstalk, running a cronjob"](http://stackoverflow.com/a/28719447)
    * Do **not** use [the accepted answer](http://stackoverflow.com/a/15233848) — it is obsolete
* [EBS Worker Environments](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features-managing-env-tiers.html)
    * [Periodic Tasks](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features-managing-env-tiers.html#worker-periodictasks)
* [dusterio/laravel-aws-worker](https://packagist.org/packages/dusterio/laravel-aws-worker)
    * [blog post about how this works](https://blog.menara.com.au/2016/06/running-laravel-in-amazon-elastic-beanstalk/)

### How does this work?

#### Parts

There's four elements:

1. [A custom Artisan command](https://laravel.com/docs/5.3/artisan) that does what you need.
1. `App\Console\Kernel@schedule` where you register your command as a scheduled event
1. The *dusterio/laravel-aws-worker* package is added to the project.
1. A *cron.yaml* file in the project root. Do not add to this file. It should only call the "worker/schedule" and it should do it every minute. <span class="small-text">Continue reading to understand what' going on here.</span>

#### A little explaination maybe?

cron.yaml:
```yaml
version: 1
cron:
 - name: "schedule"
   url: "/worker/schedule"
   schedule: "* * * * *"
```

The url will be called every minute. Do not change this*.

<span class="small-text">* Unless you understand what follows and change it with good reason and don't break anything.</span>

This "worker/schedule" route is supplied by the *dusterio/laravel-aws-worker* package and will call the `schedule` method of `App\Console\Kernel::class`. This is where you define what (custom Artisan) commands to call — and when to call them. Specify when to call them [as per the Laravel documentation](https://laravel.com/docs/5.3/scheduling).

```php
protected function schedule(Schedule $schedule)
{
    $schedule->command('renewals')->cron("0 */8 * * *");
}
```

This will run the `Renewals` command (whose signature is "renewals"), [every eight hours](https://crontab.guru/#0_*/8_*_*_*).

#### Protecting the new routes on the "web" environment

##### Riddle

Your worker instance is not exposed to the interwebs you don't have to worry about it. But because everything on your worker environment is also on your web environment, you need to make sure these endpoints are not available to the public. How will you do this?

##### Answer:

*dusterio/laravel-aws-worker* evaluates an environment variable called "REGISTER_WORKER_ROUTES" and only registers these routes if that variable is true. Thus set it to `true` for the worker-environment and `false` for the web-environment.

Thus the endpoints are available in the worker-environment, but not in the web-environment.

### How do I deploy? How do I ssh in?

(With the EBS CLI installed)

From Pianote root (location of `.elasticbeanstalk/` directory), type run `eb list` command. That'll show you the environments (and what they're called as far as the CLI is concerned).

For example:

```
C:\web-workspace\pianote (production) 
λ eb list
* pianote-production-primary
pianote-worker-env-louisa
```

The one with the asterisk is the default.

To deploy the default run `eb deploy`. To deploy a non-default environment, just append the name of the environment. Like: `eb deploy pianote-worker-env-louisa`.

Same with ssh.

`eb ssh` to ssh into "*pianote-production-primary*" above.
`eb ssh pianote-worker-env-louisa` to ssh into "*pianote-worker-env-louisa*".


## Troubleshooting notes

### tail access log

`tail -f /var/log/httpd/access_log`

### `CronTestTarget` command for testing functionality.

The "crontesttarget" command (`\App\Console\Commands\CronTestTarget`) will send an email (address is hardcoded in the `\App\Mail\CronTestEmail` Mailable class — obviously change as needed) will send an email and log some info. Real handy.

### "gotchas"

#### Deployment gotchas

If you fail to do these when you deploy you're gonna have a bad time.

##### one

*worker environment → Configuration → Software configuration → Document root* must be set to `/public` (same as "web" environment).

##### two

Comment-out lines from .htaccess (/var/www/html/public).

```
    # Force WWW
#   RewriteCond %{HTTP_HOST} !^dev* [NC]
#   RewriteCond %{HTTP_HOST} !^$
#   RewriteCond %{HTTP_HOST} !^www\. [NC]
#   RewriteCond %{HTTPS} !=on
#   RewriteRule ^ https://www.%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

    # Force HTTPS
#   RewriteCond %{HTTP:X-Forwarded-Proto} =http [OR]
#   RewriteCond %{HTTP:X-Forwarded-Proto} =""
#   RewriteCond %{HTTPS} !=on
#   RewriteCond %{SERVER_NAME} !^dev*
#   RewriteRule ^.*$ https://%{SERVER_NAME}%{REQUEST_URI} [R=301,L]
```

#### rebuilding

If you rebuild an environment that is configured with an autogenerated queue, a new queue will be created. Thus, in addition to the above to "deployment gotchas" you've also got to update the environment properties that pass the queue name|identifier to the application.

In pianote as of January 10th 2017 —using the "pianote-worker-env-isabella" saved configuration— this is the "SQS_QUEUE" environment property.

## Todo

Handling of failed messages. Right now we're just notified of failed renewals via the logs, and failed messages go to the "Dead letter queue".