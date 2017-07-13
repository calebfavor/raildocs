# Pianote Environment Setup

# Steps

1. Open an elevated administrator command prompt
1. Navigate to C:\web-development-environment\railenvironment\windows
1. Run setup-new-pianote-environments.bat
1. Enter beanstalk details when prompted
1. Enter drumeo pianote production database password when prompted (get from last pass secure note)
1. Create file '.env' inside C:\web-development-environment\pianote
1. Copy secure note 'Pianote Local .env File' contents in to .env file, save 
1. Done!

## If you want to send emails
 
In that `.env` file you just pasted a bunch of stuff into...

1. create a variable called `MY_EMAIL` and put your email address there. Like this: `MY_EMAIL=jonathan+from-pianote-dot-env@drumeo.com`.
1. Change the `MAIL_DRIVER` variable from `log` to `mailgun`.

What does this do? Have a look at `config\mail.php`...

```PHP
'to' => env(APP_ENV) == 'local' ? [
    'address' =>
        !empty(env(MY_EMAIL)) ? env(MY_EMAIL) : 'support+aDeveloperAccidentallyTriggeredThisEmail@drumeo.com',
    'name' => 'configDotMail in Pianote'
] : [],
```

***Explaination***: If local environment, use Laravel's "to" option to send all email to one address specified here. If the developer didn't supply one by way of an environmental variable, then just send it to support. 