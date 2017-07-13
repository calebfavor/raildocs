# Infusionsoft API Down or Offline (infusionsoft's problem)

# Steps to Protect Our Server

Our server can basically function as normal without infusionsoft working with 1 small change.

- SSH in to production server
- Nano in to Infusionsoft.php external api helper
```cmd
sudo nano /srv/www/drumeo/current/laravel/app/classes/external-api-helpers/Infusionsoft.php
```
- Comment out the line (22 as of writing this)
```php
$this->iSDK->cfgCon($this->apiAppName, $this->apiKey, $this->apiDbOn);
```
Becomes:
```php
// $this->iSDK->cfgCon($this->apiAppName, $this->apiKey, $this->apiDbOn);
```

Once Infusionsoft gets their shit together you can un-comment the line.

**Make sure to go back and double check all physical orders were placed for fulfillment inside infusionsoft.**