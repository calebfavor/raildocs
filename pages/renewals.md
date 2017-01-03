# Renewals

<!-- MarkdownTOC -->

<!-- /MarkdownTOC -->

The "Renewals" Command (`App\Console\Commands\Renewals` at `app/Console/Commands/Renewals.php`) is triggered as described in [page about AWS EBS Cron jobs](https://calebfavor.github.io/raildocs/?current-md=aws-ebs-cron-jobs.md) — There's a package that enables us to run the `App\Console\Kernel@schedule`event every minute. Running this event will essentially pass cron job functionally to Laravel's Task Scheduling functionality.

It currently runs [every eight hours](https://crontab.guru/#0_*/8_*_*_*) (defined in `App\Console\Kernel@schedule`).