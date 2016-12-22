# aws-ebs-cron-jobs.md (working notes)

1. [Looking for Leads](#looking-for-leads)
    1. [Reading through stuff](#reading-through-stuff)
    1. [back to ...?](#back-to)

<h2 id="looking-for-leads">Looking for Leads</h2>

google search for: aws ebs cron

good results:

* https://stackoverflow.com/questions/14077095/aws-elastic-beanstalk-running-a-cronjob
* [Customize Elastic Beanstalk Using Configuration Files](https://aws.amazon.com/blogs/aws/customize-elastic-beanstalk-using-configuration-files/)

But reading all this, it's all greek to me. I think I might need to actually play with something... or something. Fuck it though, maybe at least read through the above two results.

<h3 id="reading-through-stuff">Reading through stuff</h3>

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

