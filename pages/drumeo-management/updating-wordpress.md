# Updating Drumeo Wordpress

## /members Steps

1. On your local, run the built in wordpress update
1. When/if it asks to run the database update, run it
1. Open wp-login.php and remove the reset link outer quotes (its hidden in gmail otherwise), change the line:
```php
// CHANGE THIS
$message .= '<' . network_site_url("wp-login.php?action=rp&key=$key&login=" . rawurlencode($user_login), 'login') . ">\r\n";

// TO THIS
$message .= '' . network_site_url("wp-login.php?action=rp&key=$key&login=" . rawurlencode($user_login), 'login') . "\r\n";
```
1. Test everything works on your local
1. Commit and deploy changes to production
1. Once deployed login to  production /members admin area, and run the database update if it asks
1. Done!

## /blog Steps

1. On your local, run the built in wordpress update
1. When/if it asks to run the database update, run it
1. Test everything works on your local
1. Commit and deploy changes to production
1. Once deployed login to  production /blog admin area, and run the database update if it asks
1. Done!