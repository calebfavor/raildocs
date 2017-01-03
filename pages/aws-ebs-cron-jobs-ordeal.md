# aws-ebs-cron-jobs.md (working notes)

<!-- MarkdownTOC -->

1. Learning how to do this
    1. Resources
    1. Understanding
1. Deciding what to do
    1. options for experimentation
    1. RE *#5 - From Scratch*
        1. What would this look like though?
        1. An issue with this approach
    1. RE *#1 - Do It Live*
    1. RE #5, again
    1. conclusion
1. CronTestTarget command
1. Trying to trigger route w/o using SQS
1. Trying to understand route only on worker-tier
1. Attempting usage of dusterio's laravel-aws-worker package
1. Trouble-shooting EBS periodic task failure
    1. Understanding the logs
    1. Looking into why it's failing
        1. general trouble shooting
        1. Maybe there's a permissions issue?
1. Friday, December 30th — The Battle Continues
1. some new search results
1. results from AWS Support
    1. steps:
    1. trying it out
1. FML This was the answer...

<!-- /MarkdownTOC -->

Learning how to do this
-----------------------

### Resources

1. [User *xaralis*'s answer to StackOverflow - "AWS Elastic Beanstalk, running a cronjob"](http://stackoverflow.com/a/28719447). <span class="small-text">(Do **not** use the (originally) accepted answer by user *Anarchtica*)<span>

1. [Worker Environments section of AWS EBS docs](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features-managing-env-tiers.html#worker-periodictasks).

1. https://packagist.org/packages/dusterio/laravel-aws-worker

1. https://blog.menara.com.au/2016/06/running-laravel-in-amazon-elastic-beanstalk

### Understanding

A worker tier enables the processing of tasks seperate from the web-app serving tier, so that the latter can focus on it's job of serving the application.

We create cron jobs by a simple EBS-specific .yaml file. I was initially unsure why|if we would worker instances in this case, but actually it does make sense. We'll have our worker instance churning away processing the renewals one-by-one, because remember it grabs a list, then trys to make a payment by calling an external (stripe|paypal) api, so every renewal has that massive delay in it. Add it all together and it's a seriously be time-suck. So, offload t worker instance. Ok, sold.

Read about [AWS SQS](https://aws.amazon.com/documentation/sqs/).


Deciding what to do
-------------------

### options for experimentation

1. **Do It Live** - Create a worker instance in the production application (pianote-production-primary). This is the "just go it" approach. I would create a new command that would do something very simple (like send an email) to be called by the cron job.
2. **Clone Pianote** - clone pianote-production-primary. The issue here is that it still uses the production database.
3. **Create Pianote Staging App** - Try to create a whole new version of the pianote application. A kind of staging or testing application. The problem with this that I have not idea how close I'll be able get to being able to getting it working. That's a stupid sentence.
4. **Sample Application** - Do something with the sample application provided by AWS. The problem here is the time spent figuring out how change that application.
5. **From Scratch** - Create a whole new application while learning how to use EBS from scratch. The benefit here is that I'll then know a lot more about EBS. The downside is the slow pace.

My thoughts are leaning towards both "*1 - Do It Live*" and "*5 - From Scratch*".

### RE *#5 - From Scratch*

[Deploying a Laravel Application to Elastic Beanstalk](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/php-laravel-tutorial.html) <span class="small-text">(AWS Documentation » AWS Elastic Beanstalk » AWS Elastic Beanstalk Developer Guide » Creating and Deploying PHP Applications on AWS Elastic Beanstalk)</span>     

#### What would this look like though?

1. Create some kind of local application based on a sample Laravel application.
2. Create a command that ~~sends mail~~ writes to the log. (Sending mail is an unneccesary complication)
3. Create an EBS application from this.
4. Create an worker tier for that EBS application.

#### An issue with this approach

Setting up the local environment. Creating the docker environment and all that. More complication, more having to learn pitfalls on my way to learning more pitfalls.

Instead let's look at option 1 ("*Do It Live*") first.

### RE *#1 - Do It Live*

* [x] Create a worker environment
* [x] Create & push a command to send me an email when triggered.
* [x] Create & push cron yaml file.
* [x] Deploy (**Make sure you're on latest production commit, run gulp, then eb deploy**).
* [x] Check email inbox

No luck. What now. No errors in logs

### RE #5, again

But if I did figure out how to create a new development environment while documenting, then it would be a great learning experience, and we'd have some documenation.

### conclusion

\#1 it is.

Use Laravel's Scheduler functionality. (See "IMPLEMENTATION" --> "SCHEDULER" [here](https://blog.menara.com.au/2016/06/running-laravel-in-amazon-elastic-beanstalk/) for good reasons about why to use it).


CronTestTarget command
----------------------

I created an artisan command that can be called with `php artisan crontesttarget`.

It has four components:

1. registered in app/Console/Kernel.php
2. app/Console/Commands/CronTestTarget.php
3. app/Mail/CronTestEmail.php
4. resources/views/emails/cron-test.blade.php


Trying to trigger route w/o using SQS
-------------------------------------

* create worker environment.
    * Configure with SQS Queue "pianote-production-queue"?
* create `cron.yaml` file
* create post route for triggering command
    * Only for worker tier though
        * but how to do that?)
    * address authentication issue. See comment by user "xaralis" @ user "christian" [here](http://stackoverflow.com/a/28719447).
* review gotchas's in [stackoverflow answer (28719447)](http://stackoverflow.com/a/28719447).


Trying to understand route only on worker-tier
----------------------------------------------

Will (*Illuminate\Support\Facades\\*)***App::environment*** return this information?

Google: aws ebs worker environment get environment

nothing interesting

Google: ebs post endpoint worker only

interesting: https://packagist.org/packages/dusterio/laravel-aws-worker

^ makes me think that the worker-specific endpoint might start with "/worker" (as in "/worker/foo", rather than "/foo").

Attempting usage of dusterio's laravel-aws-worker package
---------------------------------------------------------

https://packagist.org/packages/dusterio/laravel-aws-worker

    AWS doesn't allow you to run *IX commands or to add cron tasks directly.


Trouble-shooting EBS periodic task failure
------------------------------------------

### Understanding the logs

google: apache access log

["Log Files - Apache HTTP Server Version 2.4"](https://httpd.apache.org/docs/2.4/logs.html)

How to double check what version of Apache I have?

["How To Check the Version of Apache"](https://www.liquidweb.com/kb/how-to-check-the-version-of-apache/)

`$ httpd -v`

But first I need the environment back up and running. Good thing for the saved configuration.

Output:

```
[ec2-user@ip-10-185-54-158 ~]$ httpd -v
Server version: Apache/2.4.23 (Amazon)
Server built:   Jul 29 2016 21:42:17
```

Version 2.4.24

Great.

Ok, now back to ["Log Files - Apache HTTP Server Version 2.4"](https://httpd.apache.org/docs/2.4/logs.html).

Ah yes, this has what I'm looking for (under the ["AccessLog" section](https://httpd.apache.org/docs/2.4/logs.html#accesslog)).

Just to review, the log files are in `/var/log/httpd/`. Tail them with `tail -f /var/log/httpd/access_log`.

But first let's just confirm the format.

I'm looking for the [LogFormat Directive](https://httpd.apache.org/docs/2.4/mod/mod_log_config.html#logformat) in the [mod_log_config](https://httpd.apache.org/docs/2.4/mod/mod_log_config.html) module.

So where are the modules defined?

google: elastic beanstalk apache module configuration

Some results to look at:

1. ["AWS Developer Forums: How to configure Apache on Amazon"](https://forums.aws.amazon.com/message.jspa?messageID=330792)
2. ["php5 - How to configure Apache on Amazon Elastic Beanstalk - Server"](https://serverfault.com/questions/373092/how-to-configure-apache-on-amazon-elastic-beanstalk)

* [x] read #1 above
* [x] read #2 above

Ok...

> We don't currently have support for allowing customers to modify the httpd.conf file via the Elastic Beanstalk service/console.

> However, after you launch an Elastic Beanstalk environment, you can log onto the EC2 instance directly, make your modifications to /etc/httpd/sites/your-application (which is how site configurations are managed in the Apache installation for Amazon Linux). From there, you can create a new AMI from the running instance.

> Take note of the AMI ID, then you can reconfigure your running environment to use your new AMI ID instead of the default one. For the people who want to customize their Elastic Beanstalk environments outside of what we provide in the service, this is the approach that we recommend.

So...?

... where can I find the httpd.conf file?

[php - How to edit httpd.conf file in AMAZON EC2 - Stack Overflow](https://stackoverflow.com/questions/15112424/how-to-edit-httpd-conf-file-in-amazon-ec2)

`sudo nano /etc/httpd/conf/httpd.conf`

> Don't forget to "sudo /sbin/service httpd restart" it for the changes to take effect.

(MikeL Oct 10 at 21:13)

Except what do I do with this now that I've got it?

But then in that thing above buddy says:

`<IfModule log_config_module>` looks promising, but...

>make your modifications to /etc/httpd/sites/your-application

So maybe that's not where to do it?

1. [ ] just look at `/etc/httpd/sites/your-application` first, then come back to `/etc/httpd/conf/httpd.conf` if need be.

Ok, no `/etc/httpd/sites/`, but there is a `/etc/httpd/modules/` as a symlink to `/usr/lib64/httpd/modules/`.

Looking at `/etc/httpd/modules/mod_log_config.so`

Oops, a binary file. Maybe just `/etc/httpd/conf`.

I missed it apparently...

```
[ec2-user@ip-10-185-54-158 ~]$ ll /etc/httpd/
total 12
drwxr-xr-x 2 root root 4096 Dec 29 17:31 conf
drwxr-xr-x 2 root root 4096 Dec 29 17:31 conf.d
drwxr-xr-x 2 root root 4096 Dec 29 17:31 conf.modules.d
lrwxrwxrwx 1 root root   14 Dec 18 05:27 logs -> /var/log/httpd
lrwxrwxrwx 1 root root   24 Dec 18 05:27 modules -> /usr/lib64/httpd/modules
lrwxrwxrwx 1 root root   14 Dec 18 05:27 run -> /var/run/httpd
```

So, back to `sudo nano /etc/httpd/conf/httpd.conf`.

Remember:

> Don't forget to "sudo /sbin/service httpd restart" it for the changes to take effect.

(MikeL Oct 10 at 21:13)

Looking at this...

```
<IfModule log_config_module>
    #
    # The following directives define some format nicknames for use with
    # a CustomLog directive (see below).
    #
    LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"" combined
    LogFormat "%h %l %u %t \"%r\" %>s %b" common

    <IfModule logio_module>
      # You need to enable mod_logio.c to use %I and %O
      LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\" %I %O" combinedio
    </IfModule>

    #
    # The location and format of the access logfile (Common Logfile Format).
    # If you do not define any access logfiles within a <VirtualHost>
    # container, they will be logged here.  Contrariwise, if you *do*
    # define per-<VirtualHost> access logfiles, transactions will be
    # logged therein and *not* in this file.
    #
    #CustomLog "logs/access_log" common

    #
    # If you prefer a logfile with access, agent, and referer information
    # (Combined Logfile Format) you can use the following directive.
    #
    CustomLog "logs/access_log" combined
</IfModule>
```

... we appear to to be using the "combined" CustomLog format.

But then it looks like it should say so at the end...

```
LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"" combined
LogFormat "%h %l %u %t \"%r\" %>s %b" common

<IfModule logio_module>
  # You need to enable mod_logio.c to use %I and %O
  LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\" %I %O" combinedio
</IfModule>
```

So let's look and see...

`less /var/log/httpd/access_log`

```
127.0.0.1 (-) - - [29/Dec/2016:17:38:49 +0000] "POST /worker/schedule HTTP/1.1" 404 213 "-" "aws-sqsd/2.3"
127.0.0.1 (-) - - [29/Dec/2016:17:38:51 +0000] "POST /worker/schedule HTTP/1.1" 404 213 "-" "aws-sqsd/2.3"
127.0.0.1 (-) - - [29/Dec/2016:17:38:53 +0000] "POST /worker/schedule HTTP/1.1" 404 213 "-" "aws-sqsd/2.3"
127.0.0.1 (-) - - [29/Dec/2016:17:38:55 +0000] "POST /worker/schedule HTTP/1.1" 404 213 "-" "aws-sqsd/2.3"
127.0.0.1 (-) - - [29/Dec/2016:17:38:57 +0000] "POST /worker/schedule HTTP/1.1" 404 213 "-" "aws-sqsd/2.3"
127.0.0.1 (-) - - [29/Dec/2016:17:38:59 +0000] "POST /worker/schedule HTTP/1.1" 404 213 "-" "aws-sqsd/2.3"
127.0.0.1 (-) - - [29/Dec/2016:17:38:59 +0000] "POST /worker/schedule HTTP/1.1" 404 213 "-" "aws-sqsd/2.3"
```

for about a million lines.

Not there, so maybe it's just the defining it. As if the syntax has three components: (1) "LogFormat" keyboard, (2) specifications|arguments|details, (3) Name for that logformat.

So, assuming we're using the "common" format, let's break down a line...

`127.0.0.1 (-) - - [29/Dec/2016:17:38:59 +0000] "POST /worker/schedule HTTP/1.1" 404 213 "-" "aws-sqsd/2.3"`

1. 127.0.0.1
2. (-)
3. -
4. -
5. [29/Dec/2016:17:38:59 +0000]
6. "POST /worker/schedule HTTP/1.1"
7. 404
8. 213
9. "-"
10. "aws-sqsd/2.3"

^ that is this --> `"%h %l %u %t \"%r\" %>s %b"`?

1. "%h
2. %l
3. %u
4. %t
5. \"%r\"
6. %>s
7. %b"

Doesn't look like it fits at all does it?

1. `"%h` - "Remote hostname. Will log the IP address if HostnameLookups is set to Off, which is the default. If it logs the hostname for only a few hosts, you probably have access control directives mentioning them by name. See the Require host documentation."
2. `%l` - "Remote logname (from identd, if supplied). This will return a dash unless mod_ident is present and IdentityCheck is set On."
3. `%u` - "Remote user if the request was authenticated. May be bogus if return status (%s) is 401 (unauthorized)."
4. `%t` - "The time, in the form given by format, which should be in an extended strftime(3) format (potentially localized). If the format starts with begin: (default) the time is taken at the beginning of the request processing. If it starts with end: it is the time when the log entry gets written, close to the end of the request processing. In addition to the formats supported by strftime(3), the following format tokens are supported:" ([more details at source](https://httpd.apache.org/docs/2.4/mod/mod_log_config.html))
5. `\"%r\"` - "First line of request."
6. `%>s` - "Status. For requests that have been internally redirected, this is the status of the original request. Use %>s for the final status."
7. `%b"` - "Size of response in bytes, excluding HTTP headers. In CLF format, i.e. a '-' rather than a 0 when no bytes are sent."

So if that's not it, then were is the access_log log format specified?

Google: where is access_log format specified

Choice results:

1. [Log Files - Apache HTTP Server Version 2.4](https://httpd.apache.org/docs/2.4/logs.html) (this is noted above already — three times.)
2. [Apache Logging Basics -Ultimate Guide to Logging - Loggly](https://www.loggly.com/ultimate-guide/apache-logging-basics/)
3. [Understanding Apache Access Log - Stack Overflow](https://stackoverflow.com/questions/9234699/understanding-apache-access-log)
4. [What is the default apache2 log format and where is defined](https://askubuntu.com/questions/264042/what-is-the-default-apache2-log-format-and-where-is-defined-such-default)

Number 4 is has the answer, but I already found it before... so I guess getting to the same information two different ways is a good indication that it's easier.

Ok, that makes sense. I think it's...

`LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"" combined`

So common vs combined formats?

```
LogFormat "%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"" combined
LogFormat "%h %l %u %t \"%r\" %>s %b" common
```

The only difference is the `\"%{Referer}i\" \"%{User-Agent}i\"` at the end of "combined."

I was just thrown off by the missing "Referer" information. In our log messages its not present, so it's just `-`.

ez.

Now what?

Basically what matters is that is this:

```
127.0.0.1 (-) - - [29/Dec/2016:17:38:59 +0000] "POST /worker/schedule HTTP/1.1" 404 213 "-" "aws-sqsd/2.3"
```

the `404` is the...

> Status. For requests that have been internally redirected, this is the status of the original request. Use %>s for the final status.

And the `213` is irrelevant as it is the...

> Size of response in bytes, excluding HTTP headers. In CLF format, i.e. a '-' rather than a 0 when no bytes are sent.

So now that I know exactly what that log messages are saying I can look into why we're getting 404 messages. ***Maybe I can alter the log output to provide more information?***

### Looking into why it's failing

#### general trouble shooting

[ ] Look around for a bit and then if that doesn't yield anything promising ***alter the log output to provide more information***.

google: dusterio laravel-aws-worker 404

A result: https://deliciousbrains.com/scaling-laravel-aws-elastic-beanstalk-part-1-setting-up-laravel/

Maybe I should make sure that the connection between Laravel and SQS  is properly configured?

But what is SQS for?

> While we could manually implement an interface for the SQS daemon, I found that this laravel-aws-worker package from Denis Mysenko seems to work well. **The SQS daemon is designed to POST an incoming message from the SQS queue to our app** (rather than the listener fetching a message from the queue as Laravel’s built-in listener does)

(emphasis my own)

Maybe I can hack or extend that package to debug the incoming SQS messages?

Though I might need to read about SQS first? No. Just hack it and get **something** back.

Are the SQS_QUEUE and SQS_QUEUE_URL environment properties actually used anywhere? They should be set in the laravel config file(s).

[ ] Maybe try auto-generating a queue?

[AFTER LUNCH]

I created a new queue and will try setting the SQS_QUEUE_URL to include the queue name at the end — since the SQS dashboard displays queues' as such.

Also, mayber there's something about the using the S3 key and secret instead of an SQS one that's breaking things up?

Let's use another route.

But we'll have to move the 

```
<?php

include('scalecenter-content-management.php');

Route::group(
    [
        'middleware' => 'admin',
        'prefix' => 'scalecenter'
    ],
    function () {
```

[MANY LINES LATER IN THE SAME FILE...]

```
        Route::get('/cron-test-target',
            [
                'as' => 'scalecenter.cron-test-target.present',
                'uses' => 'Scalecenter\CronTestTargetController@present'
            ]
        );

        Route::post(
            '/cron-test-target',
            [
                'as' => 'scalecenter.cron-test-target.trigger',
                'uses' => 'Scalecenter\CronTestTargetController@trigger'
            ]
        );
    }
);
```

... to this...

```
        Route::get('/cron-test-target',
            [
                'as' => 'scalecenter.cron-test-target.present',
                'uses' => 'Scalecenter\CronTestTargetController@present'
            ]
        );
    }
);

Route::post(
    '/cron-test-target',
    [
        'as' => 'scalecenter.cron-test-target.trigger',
        'uses' => 'Scalecenter\CronTestTargetController@trigger'
    ]
);
```

Also, changed cron.yaml from

```
version: 1
cron:
 - name: "schedule"
   url: "/worker/schedule"
   schedule: "*/30 * * * *"

```

to

```
version: 1
cron:
 - name: "schedule"
   url: "/cron-test-target"
   schedule: "*/3 * * * *"

```

#### Maybe there's a permissions issue?

[Authentication and Access Control for Amazon SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-authentication-and-access-control.html) (AWS Documentation » Amazon Simple Queue Service » Developer Guide » Amazon SQS Security)

*config/queue.php* looks like this...

```
'sqs' => [
    'driver' => 'sqs',
    'key' => env('S3_KEY'),
    'secret' => env('S3_SECRET'),
    'prefix' => env('SQS_QUEUE_URL'),
    'queue' => env('SQS_QUEUE'),
    'region' => env('S3_REGION'),
],
```

Noteworthy is:

```
    'key' => env('S3_KEY'),
    'secret' => env('S3_SECRET'),
```

And looking at the permissions tab for the queue in the SQS dashboard...

> This queue has an empty SQS Queue Access Policy. This means that only the queue owner is allowed to use it. You can Add a Permission to grant another account access to this queue.

So maybe I'm actually making a mistake and there's no way this would have worked?

According to [this](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/AWSCredentials.html) I should just set it to a user.

Some users:

* test-sqs
* sqs-operator

What are the access and secret keys though? [Answer](http://www.bucketexplorer.com/documentation/amazon-s3--what-is-my-aws-access-and-secret-key.html).

"access key" is username...?
"secret key" is secret bit...?

No, when you create a new "Access Key" for a user (In IAM of course), you get an "Access key ID" and a "Secret access key". Pretty straight-forward actually.

Anyways, where was I?

Ok, so apparently I made a mistake...


---

And for some reason the wrong queue is getting messages in it. I should check that these are actually messages from what I'm working on here and not just some random message.

[check environment variables command line](https://www.cyberciti.biz/faq/unix-linux-print-environment-variable-comamnd/)

`$ printenv` to return all

`$ printenv | grep 'SQS'` to return **all starting with** "SQS")

**TODO**

* [x] see if changing the environment variables in production changes anything.
    * **Answer: IT 

Maybe try SQS_QUEUE_URL without the queue name at the end?

https://sqs.us-east-1.amazonaws.com/xxxxxxxxxxxx

instead of 

https://sqs.us-east-1.amazonaws.com/xxxxxxxxxxxx/pianote-cron-queue

**TODO**

* [x] what do they specify in the readme of that [the laravel-aws-worker package](https://packagist.org/packages/dusterio/laravel-aws-worker)?
    * answer: they specify no queue name, just the url ending with account id (and no backslash either eh).

**TODO**

* [x] Also confirm that changing environment variables via AWS SQS console (web GUI) actually changes it in the instance (without having to re-deploy).
    * **Answer: IT DOES *NOT***

But I remembered that I the "cron-test-target" route shouldn't even work because you can't just call a route with a periodic task. [And just for reference, this is why](https://forums.aws.amazon.com/message.jspa?messageID=698599).

**TODO**

* [x] Read this: ["Cronally vs Periodic Tasks" from blog.cronally.com](http://blog.cronally.com/cronally-vs-periodic-tasks/) (found while looking for the above)

So let's change cron.yaml from this:

```
version: 1
cron:
 - name: "schedule"
   url: "/cron-test-target"
   schedule: "*/3 * * * *"

```

back to this:

```
version: 1
cron:
 - name: "schedule"
   url: "/worker/schedule"
   schedule: "*/3 * * * *"

```

And I just want to re-iterate that changing the environment variables in the web-ui|console does ***NOT***  change them in a running instance. **You must redeploy**!

Of course there's always the possibility that I have to re-deploy the web environment whenever I re-deploy the worker environment... and that I might have to update it's environment variables as well. Currently they're very out of date in comparison to the worker environment.

**TODO**

* [x] If it doesn't work after this last deployment do these two things:
    1. [x] update web environment's enviroment variables to be congruent with what's set for the worker environment.
    2. [x] **then** re-deploy the web environment (remember that you must do redeploy after changing environment variables).

Yeah, that's gotta be it. *pianote-production-queue* is always getting|having the messages and *pianote-cron-queue* has none.

nope, didn't work. and now i'm out of time and have to go home. ffs.

Friday, December 30th — The Battle Continues
--------------------------------------------

Wow, am I actually that thick? The SQS queue for a EBS environment to use is defined in the the "configuration", but **not** as an environment variable — though we are also passing it in as the environment variable "SQS_QUEUE". Instead it's just the queue set in the "Worker Configuration" section of "Configuration". So, selected "pianote-cron-queue" from a drop down (which also contained options for "pianote-production-queue" and an auto-generated queue) — which resulted in it being set as "https://sqs.us-east-1.amazonaws.com/671790291617/pianote-cron-queue".

Finally its... going to the correct queue!

But still getting the same errors in the access_logs and in the ebs web console.

Search the web console error: Environment health has transitioned from Ok to Severe. 100.0 % of the requests are erroring with HTTP 4xx.

Getting all logs via web-console and there's bunch, but I don't see anything promising|interesting|potentially-relevant yet. fml.

Ok, this looks useful: `/var/log/aws-sqsd/default.log`

it's just cycling through this:

```
2016-12-30T17:15:18Z message: sent to http://localhost:80/worker/schedule
2016-12-30T17:15:18Z http-err: ebe0986e-b879-407f-be8b-04c078b10a0b (362) 404 - 0.002
```

Maybe there's something wrong with that port?

search: sqs get 404

Looks barely relevant, but idunno maybe I'm not creating the requests sent **to** SQS properly? 

No, that's not because the messages exist and are POSTing back to the worker environment. So...?

Check the security settings of the worker-env to make sure the ports (specifically 80) are open?

"EC2 security groups": awseb-e-w2jd3pji4j-stack-AWSEBSecurityGroup-J0IS5GNPXX6W

[Amazon EC2 Security Groups for Linux Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html)

To edit security groups, go to "EC2" --> "Security Groups" (under "Network & Security" in sidebar).

Ah, "awseb-e-w2jd3pji4j-stack-AWSEBSecurityGroup-J0IS5GNPXX6W" is the "Group Name". The "Name" is "pianote-worker-env".

Well no wonder it's broken, the only inbound rule is for port 22 (for ssh). fml. Adding another for port 80 now.

Type: http
Protocol: TCP
Port Range: 80
Source: "Custom", 0.0.0.0/0

no luck

The hell with it, let's open it up to all TCP (ports 0 - 65535 apparently).

**TODO**

* [ ] if that fails, search: sqs gets 404

--------------------------

search: elastic beanstalk worker localhost

result: https://stackoverflow.com/questions/35192287/elastic-beanstalk-workers-sqs-daemon-getting-504-gateway-timeout-after-1-minute

no.

Try with an autogenerated queue.

[AFTER LUNCH]

Ok, so with an autogenerated queue, something new is happening. Namely the failed messages|requests|whatever are going to the dead letter queue. This is not exciting because this wasn't happening before because we didn't have a dead letter queue and also because we're still getting the same 404 message.

So what the do we do? Try to get SOMETHING connecting. Break it down so that we can see if we can make any kind of suceesful request on the worker-environment instance. `$ curl localhost` for example.

(1:46pm)

search: sqs 404

https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/CommonErrors.html

Support case made: 2014976311

https://sqs.us-east-1.amazonaws.com/671790291617/awseb-e-ddmhktysde-stack-AWSEBWorkerQueue-1FA8SR1UNRSTR

https://sqs.us-east-1.amazonaws.com/671790291617

Wow a new one...

http://culttt.com/2016/02/08/setting-up-and-using-cron-jobs-with-laravel-and-aws-elastic-beanstalk/

----------------

ask support guy this:

How can we isolate the problem though? Can we curl *any* endpoint via localhost while ssh'd into the worker-env? Or is that an application-specific thing?

---------------


`curl -I http://localhost/<route defined in laravel>`

cron-test-target


`curl -I http://localhost/cron-test-target`

How to post with curl?

http://superuser.com/questions/149329/what-is-the-curl-command-line-syntax-to-do-a-post-request

`-X`

## some new search results

Search: laravel elasticbeanstalk cron

* http://culttt.com/2016/02/08/setting-up-and-using-cron-jobs-with-laravel-and-aws-elastic-beanstalk/
* https://deliciousbrains.com/scaling-laravel-aws-elastic-beanstalk-part-1-setting-up-laravel/

## results from AWS Support

### steps:

1) Create a file called "laravel.conf" in your "/etc/httpd/conf.d" directory and add the following to it

```
<VirtualHost *:80>
    ServerName  localhost
    DocumentRoot "/var/app/current/public"
    <Directory "/var/app/current/public">
        AllowOverride all
        Options +Indexes +FollowSymLinks +MultiViews

        Require all granted
    </Directory>
</VirtualHost>  
```

2) Restart Apache webserver

`service httpd restart`

3) Test it by using the following command

`curl -X POST http://localhost/worker/schedule`

    {"message":["No scheduled commands are ready to run."],"code":200}

### trying it out

New worker environemnt: "pianote-worker-env-louisa"

Before making any suggested changes:

`curl -X POST http://localhost/worker/schedule`

returns: 
```
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<html><head>
<title>404 Not Found</title>
</head><body>
<h1>Not Found</h1>
<p>The requested URL /worker/schedule was not found on this server.</p>
</body></html>
```

Make the suggested changes, and we get the same result.

Looking at /etc/httpd/conf/httpd.conf

try `curl -I http://localhost` to other endpoints (and GET instead of POsT).

But what other endpoints?

* run `php artisan route:list` (all are "web" group|filter only, and GET unless specified).
    - terms
    - reset-password
    - privacy
    - cron-test-target (POST)
    - getting-started-on-piano
* see /var/www/html

Look at .htaccess file.

`curl -I http://localhost/terms` returns 

```
HTTP/1.1 404 Not Found
Date: Tue, 03 Jan 2017 17:13:28 GMT
Server: Apache
Content-Type: text/html; charset=iso-8859-1
```

## FML This was the answer...

worker environment → Configuration → Software configuration → Document root

was blank, needs to be `/public`

Then comment-out lines from .htaccess (/var/www/html/public).

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

But what about the laravel.conf added? Is that needed?

Nope, apparently not.


