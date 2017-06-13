# PHPStorm PHP Debugging & Unit Testing

## Web Debugging Setup Drumeo

### Setup Windows Port Proxy Maps 
1. In elevated windows CMD, run:
```cmd
\web-development-environment\railenvironment\windows\hosts-port-mapping-windows.bat
```

### Go to Settings -> Languages and Frameworks -> PHP -> Servers

1. Create a new server called 'laravel'
1. For host put 10.0.75.1 port 80 Xdebug
1. Check 'Use path mappings (...)'
1. Map (File/Directory -> Absolute path on server) C:\web-development-environment\drumeo -> /var/www
1. Save
1. You can now turn on 'listen for debuggin connections' inside php storm, visit any local url and it should stop at break points

## PHP Unit Testing Drumeo

### Go to Settings -> Build, Execution, Deployment -> Deployment

1. Add new
1. Name: laravel, type: SFTP
1. SFTP host: 10.0.75.2, Port: 2222, Root path: /var/www 
1. Username: root, Auth type: Key pair (OpenSSH or Putty)
1. Private key file: C:\web-development-environment\drumeo\laradock-drumeo-2017\workspace\insecure_id_rsa (ppk files not longer supported!)
1. Keyphrase: *leave empty*

### Go to Settings -> Languages and Frameworks -> PHP

1. Where it says CLI Interpreter and have the dropdown, click the 3 dots
1. Click add -> Remote
1. Choose the laravel deployment configuration
1. PHP executable: /usr/bin/php, (click the refresh button beside this once to make sure its connected)
1. Debugger extentions: /usr/lib/php/20160303/xdebug.so
1. Apply
1. Set the CLI Interpreter to the one you just made
1. Set path mapping to: C:/web-development-environment/drumeo -> /var/www

### Go to Settings -> Languages and Frameworks -> PHP -> PHP Unit

1. Add new: By Remote Interpreter
1. Choose the laravel interpreter we made
1. Add Path mapping: C:/web-development-environment/drumeo -> /var/www
1. PHPUnit library: User Composer autoloader: Path to script: /var/www/laravel/vendor/autoload.php
1. Check: Default configuration file, set to: /var/www/laravel/phpunit.xml

## Web Debugging Setup Pianote

### Go to Settings -> Languages and Frameworks -> PHP -> Servers

1. Create a new server called 'laravel'
1. For host put 10.0.75.1 port 80 Xdebug
1. Check 'Use path mappings (...)'
1. Map (File/Directory -> Absolute path on server) C:\web-development-environment\pianote -> /var/www/laravel
1. Save
1. You can now turn on 'listen for debuggin connections' inside php storm, visit any local url and it should stop at break points

## PHP Unit Testing Pianote

### Go to Settings -> Build, Execution, Deployment -> Deployment

1. Add new
1. Name: laravel, type: SFTP
1. SFTP host: 10.0.75.2, Port: 2222 (or other specified ssh port based on project), Root path: /var/www/laravel 
1. Username: root, Auth type: Key pair (OpenSSH or Putty)
1. Private key file: C:\web-development-environment\pianote\laradock-pianote\workspace\insecure_id_rsa
1. Keyphrase: *leave empty*

### Go to Settings -> Languages and Frameworks -> PHP

1. Where it says CLI Interpreter and have the dropdown, click the 3 dots
1. Click add -> Remote
1. Choose the laravel deployment configuration
1. PHP executable: /usr/bin/php, (click the refresh button beside this once to make sure its connected)
1. Debugger extentions: /usr/lib/php/20160303/xdebug.so
1. Apply
1. Set the CLI Interpreter to the one you just made
1. Set path mapping to: C:/web-development-environment/pianote -> /var/www/html

### Go to Settings -> Languages and Frameworks -> PHP -> PHP Unit

1. Add new: By Remote Interpreter
1. Choose the laravel interpreter we made
1. Add Path mapping: C:/web-development-environment/pianote -> /var/www/html
1. PHPUnit library: User Composer autoloader: Path to script: /var/www/laravel/vendor/autoload.php
1. Check: Default configuration file, set to: /var/www/laravel/phpunit.xml
