# Package Development Workflow

## Theory and Description

This is primarily based on this article https://www.sitepoint.com/alternative-laravel-package-development-workflow/

Packages should be totally independent of your main application. They should be individually tested and fully functional without any reliance on your app. Each package will have it own full laravel installation. However this guide shows you how to develop the package and test it inside your main application while still keeping the package separate. Using local composer repositories you can make changes to your package and have it instantly updated in your application instead of pushing to packagist and having to composer update in your application for every change. 

## Setting Up the Folders & Files

### Folder Structure
1. If not already created, create a packages folder outside the laravel folder
1. Inside the packages folder create your package folder
1. The tree looks like this

```text
--- laravel
--- packages
------ my-package-1
--------- composer.json
--------- other package files...
------ my-package-2
--------- composer.json
--------- other package files...
------ etc...
```

### Using the Packages in Your Application
1. In your main laravel applications composer.json add your repositories like so:
```json
{
    "repositories": [
        {
            "type": "path",
            "url": "../packages/my-package-1"
        },
        {
            "type": "path",
            "url": "../packages/my-package-2"
        }
    ],
    "require": {
        "my/package-1": "*",
        "my/package-2": "*"
    }
}
```

## Cloning the Template
1. Copy/download the laravel-package-template repository in to your folder: https://github.com/railroadmedia/laravel-package-template 
1. Change composer.json to fit your needs
1. Setup your service provider
1. Run: composer install inside your package folder
1. Start developing!