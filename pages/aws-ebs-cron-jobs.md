# aws-ebs-cron-jobs.md (working notes)

<!-- MarkdownTOC -->

1. How does this work?
1. set-up instructions
    1. Gotchas
        1. one
        1. two

<!-- /MarkdownTOC -->

## How does this work?

[TODO: EXPLAINATION HERE]
[TODO: EXPLAINATION HERE]
[TODO: EXPLAINATION HERE]
[TODO: EXPLAINATION HERE]
[TODO: EXPLAINATION HERE]


## set-up instructions

(all in worker environment unless noted otherwise)

[TODO: SET-UP INSTRUCTIONS HERE]
[TODO: SET-UP INSTRUCTIONS HERE]
[TODO: SET-UP INSTRUCTIONS HERE]
[TODO: SET-UP INSTRUCTIONS HERE]
[TODO: SET-UP INSTRUCTIONS HERE]


### Gotchas

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