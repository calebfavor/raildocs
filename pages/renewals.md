# Renewals

<!-- MarkdownTOC -->

<!-- /MarkdownTOC -->

See [page about AWS EBS Cron jobs](https://calebfavor.github.io/raildocs/?current-md=aws-ebs-cron-jobs.md).

There's a package that enables us to every minute run the App\Console\Kernel@schedule event. Running this event will basically pass cron job functionally from cron jobs to Laravel's Event Scheduling functionality. Again, see the page about EBS Cron jobs.

The only thing unique to this is the "Renewals" Command (`App\Console\Commands\Renewals` at `app/Console/Commands/Renewals.php`).
