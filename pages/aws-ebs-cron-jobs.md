# aws-ebs-cron-jobs.md (working notes)

<!-- MarkdownTOC -->

1. Looking for Leads
    1. Reading through stuff
1. Thu, Dec 22nd
    1. options for experimentation
    1. RE *#5 - From Scratch*
        1. What would this look like though?
        1. An issue with this approach\
    1. RE *#1 - Do It Live*
    1. RE #5, again

<!-- /MarkdownTOC -->

Looking for Leads
------------------------------

google search for: aws ebs cron

good results:

* https://stackoverflow.com/questions/14077095/aws-elastic-beanstalk-running-a-cronjob
* [Customize Elastic Beanstalk Using Configuration Files](https://aws.amazon.com/blogs/aws/customize-elastic-beanstalk-using-configuration-files/)

But reading all this, it's all greek to me. I think I might need to actually play with something... or something. Fuck it though, maybe at least read through the above two results.

### Reading through stuff

Starting

https://stackoverflow.com/questions/14077095/aws-elastic-beanstalk-running-a-cronjob

at ~~1:14pm~~ 1:22pm.

Finished at 1:30.

(worked on raildocs from ~1:30 to 3:20).

Found another link to check out:

[AWS Elastic Beanstalk --> Managing Environments --> Worker Environments --> Periodic Tasks](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features-managing-env-tiers.html#worker-periodictasks).

Starting at 3:22

Finished at 3:34, but so many questions.

Reading it some more (3:34).

Fuck it, let's watch a video.

Until 3:45.

Summary: So it seems that a worker tier enables the processing of tasks seperate from the web-app serving instance, so that the latter can focus on it's job of serving the application.

We create cron jobs by a simple EBS-specific .yaml file. I was initially unsure why|if we would worker instances in this case, but actually it does make sense. We'll have our worker instance churning away processing the renewals one-by-one, because remember it grabs a list, then trys to make a payment by calling an external (stripe|paypal) api, so every renewal has that massive delay in it. Add it all together and it's a seriously be time-suck. So, offload t worker instance. Ok, sold.

But now what about SQS? This AWS queuing service is mentioned alot, but I'm unclear about how it fits in everything, and whatnot.

[ ] **read the SQS introductory docs**

Rereading everything to try to understand more about SQS involvement + watching video.

(working on raildocs again (3:56 to ______)

____, start.

Also, fuck reading of "Customize Elastic Beanstalk Using Configuration Files" mentioned above.

finish ____

------------------------------------------

Thu, Dec 22nd
------------------------------------

Creating a new EBS application called "cron-sandbox-alice"

### options for experimentation

1. **Do It Live** - Create a worker instance in the production application (pianote-production-primary). This is the "just go it" approach. I would create a new command that would do something very simple (like send an email) to be called by the cron job.
2. **Clone Pianote** - clone pianote-production-primary. The issue here is that it still uses the production database.
3. **Create Pianote Staging App** - Try to create a whole new version of the pianote application. A kind of staging or testing application. The problem with this that I have not idea how close I'll be able get to being able to getting it working. That's a stupid sentence.
4. **Sample Application** - Do something with the sample application provided by AWS. The problem here is the time spent figuring out how change that application.
5. **From Scratch** - Create a whole new application while learning how to use EBS from scratch. The benefit here is that I'll then know a lot more about EBS. The downside is the slow pace.

My thoughts are leaning towards both "*1 - Do It Live*" and "*5 - From Scratch*".

### RE *#5 - From Scratch*

[Deploying a Laravel Application to Elastic Beanstalk](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/php-laravel-tutorial.html) <span style="font-size:0.7em">(AWS Documentation » AWS Elastic Beanstalk » AWS Elastic Beanstalk Developer Guide » Creating and Deploying PHP Applications on AWS Elastic Beanstalk)</span>     

#### What would this look like though?

1. Create some kind of local application based on a sample Laravel application.
2. Create a command that ~~sends mail~~ writes to the log. (Sending mail is an unneccesary complication)
3. Create an EBS application from this.
4. Create an worker tier for that EBS application.

#### An issue with this approach\

Setting up the local environment. Creating the docker environment and all that. More complication, more having to learn pitfalls on my way to learning more pitfalls.

Instead let's look at option 1 ("*Do It Live*") first.

### RE *#1 - Do It Live*

[ ] Create a worker environment
[ ] Create & push a command to send me an email when triggered.
[ ] Create & push cron yaml file.
[ ] Deploy (**Make sure you're on latest production commit, run gulp, then eb deploy**).
[ ] Check email inbox

### RE #5, again

But if I did figure out how to create a new development environment while documenting, then it would be a great learning experience, and we'd have some documenation.

