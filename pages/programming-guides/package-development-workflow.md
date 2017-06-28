# Package Development Workflow

## Theory and Description

This is primarily based on this article https://www.sitepoint.com/alternative-laravel-package-development-workflow/

Packages should be totally independent of your main application. They should be individually tested and fully functional without any reliance on your app. Each package will have it own full laravel installation. However this guide shows you how to develop the package and test it inside your main application while still keeping the package separate. Using local composer repositories you can make changes to your package and have it instantly updated in your application instead of pushing to packagist and having to composer update in your application for every change. 

**NOTE: This is ONLY for development, in production your package should have a release and be on packagist. It should be pulled in in your main applications composer.json like a normal package.**

## Setting Up the Folders & Files

### Folder Structure

1. If not already created, create a packages folder in your application folder
1. For Drumeo its (C:\web-development-environment\drumeo\packages\
1. Inside the packages folder create your 
    1. namespace directory if it does not yet exist (ex: "my-namespace/")
    1. package folder in that namespace directory (ex: "my-namespace/package-foo")

The tree looks like this:

```text
C:\
---web-wordspace
------ my-app
------ packages
--------- my-namespace
------------ my-package-1
--------------- composer.json
--------------- other package files...
------------ my-package-2
--------------- composer.json
--------------- other package files...
--------- my-other-namespace
------------ my-package-3
--------------- composer.json
--------------- other package files...
--------- etc...
```

You cannot create the packages folder directly in the web-applications folder unless you have LAMP installed on your machine. You will need to run composer in that directory, and the best way to do that is via the docker workspace container.


### Using the Packages in Your Application

1. In your main laravel applications composer.json add your repositories like so:
```json
{
    "repositories": [
        {
            "type": "path",
            "url": "../packages/my-namespace/my-package-1"
        },
        {
            "type": "path",
            "url": "../packages/my-namespace/my-package-2"
        },
        {
            "type": "path",
            "url": "../packages/my-other-namespace/my-package-3"
        }
    ],
    "require": {
        "my-namespace/package-1": "*",
        "my-namespace/package-2": "*",
        "my-namespace/package-3": "*"
    }
}
```

#### Notes

##### Note 1

repositories is an array

##### Note 2

you may need to specify the version not as the wild-card used above (`*`), but rather as "dev" followed by a dash and then your package name in lowercase, like this: 

```
"require": {
    "my-namespace/package-1": "dev-my-package-1",
}
```

##### Note 3

The url path is relative to the laravel/composer.json file. Thus the above example assumes your `packages` dir is a *sibling* of your `laravel` dir and a *child* of your application dir:

```
C:\
---web-wordspace
------ my-app
--------- packages
------------ my-namespace
--------------- my-package-1
```


However, if your `packages` dir is a **sibling** of your application dir...
 
```
C:\
---web-wordspace
------ my-app
------ packages
--------- my-namespace
------------ my-package-1
``` 
 
... the path would instead be defined as `"../../packages/my-namespace/my-package-1"`


## Cloning the Template

1. Copy/download the laravel-package-template repository in to your folder: https://github.com/railroadmedia/laravel-package-template 
1. Change composer.json to fit your needs
1. Setup your service provider
1. Run *composer install* inside your package folder (if nothing happens you may need to run *composer update*)
    * You should see a message that mentions symlinking your local package development directory (the one that you just made) like this: `  - Installing my-namespace/my-package-1 (dev-my-package-1): Symlinking from ../packages/my-namespace/my-package`
`

### Add your package to your main applications' config/app.php file 

(For Drumeo as of June 2017, this is: *C:\web-development-environment\drumeo\laravel\config\app.php*)

1. add service provider

```php
'providers' => [
    MyNamespace/MyPackageName/Providers/MyProvider::class,
};
```

2. Add your package to the psr-4 section of "autoload" (namespace and the dir with the actual business logic of your package - likely the "src" directory)

```php
"autoload": {
    "psr-4": {
        "MyNamespace\\MyPackageName\\": "src"
    },
}
```

## A "*gotcha*" to watch out for when writing tests

Set PHPStorm's PHPUnit settings to run the tests in your package, **not** the tests in your laravel application.

You likely have these settings for your regular development:

1. "PHPUnit Library" → "path to script": `/var/www/laravel/vendor/autoload.php`
2. "Test Runner" → "Default configuration file": `/var/www/laravel/phpunit.xml`

![phpstorm phpunit interpreter settings](/raildocs/images/package-development-workflow/phpstorm-phpunit-interpreter-settings.gif) 

Change them accordingly.

### Example

For the "railroad\intercomeo" package, for example:

1. "PHPUnit Library" → "path to script": `/var/www/packages/railroad/intercomeo/vendor/autoload.php`
2. "Test Runner" → "Default configuration file": `/var/www/packages/railroad/intercomeo/phpunit.xml`

![phpstorm phpunit interpreter settings for package](/raildocs/images/package-development-workflow/phpstorm-phpunit-interpreter-settings-for-package.gif)

---------------------------------------------------------------

**Start developing!**