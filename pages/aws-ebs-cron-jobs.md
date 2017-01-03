# aws-ebs-cron-jobs.md (working notes)

<!-- MarkdownTOC -->

1. How does this work?
    1. Documentation
    1. How does this work?
        1. Parts
        1. A little explaination maybe?
        1. Protecting the new routes on the "web" environment
    1. How do I deploy? How do I ssh in?
1. setup
    1. instructions
    1. "gotchas"
        1. one
        1. two

<!-- /MarkdownTOC -->

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
   url: "/worker/queue"
   schedule: "* * * * *"
```

The url will be called every minute. Do not change this*.

<span class="small-text">* Unless you understand what follows and change it with good reason and don't break anything.</span>

This "worker/schedule" route is supplied by the *dusterio/laravel-aws-worker* package and will call the `schedule` method of `App\Console\Kernel::class`. This is where you define what (custom Artisan) commands to call — and when to call them. Specify when to call them [as per the Laravel documentation](https://laravel.com/docs/5.3/scheduling).

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


## setup

### instructions

1. [ ] Follow instructions for *dusterio/laravel-aws-worker* package
2. [ ] create "REGISTER_WORKER_ROUTES" environment variable
    * [ ] set it to `true` for the worker-environment
    * [ ] set it to `false` for the web-environment
3. [ ] deploy to worker.

### "gotchas"

(all in worker environment unless noted otherwise)

#### one

*worker environment → Configuration → Software configuration → Document root* must be set to `/public` (same as "web" environment).

#### two

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