# Pulling Production Database

## Drumeo

### TLDR

1. ssh into drumeo ***mysql*** container
1. Run: `/var/www/laradock-drumeo-2017/development-helpers/pull-databases.sh`
1. When prompted enter password from Lastpass secure note.

### Detailed version of instructions

*NOTE: This will take around 20 minutes. There is a lot of data.*

1. Open command prompt, navigate too project root (C:\web-development-environment\drumeo).
2. Assuming your containers are already running, run:
```cmd
docker ps
```
3. Note the first 4 characters of the CONTAINER ID of the laradockdrumeo_mysql container.
4. To enter the container, type:
```cmd
docker exec -it FIRST_4_CHARACTERS bash
```
5. Once in the container navigate to (/var/www/laradock-drumeo-2017/development-helpers)
```cmd
cd /var/www/laradock-drumeo-2017/development-helpers
```
6. Then run the script command:
```cmd
./pull-databases.sh
```
7. Enter drumeo production database master password when prompted from last pass secure notes.
8. Wait for it to finish, and your done!

## Pianote

1. ssh into pianote ***mysql*** container
1. Run: `/var/www/laravel/laradock-pianote/development-helpers/pull-databases.sh`
1. When prompted enter password from Lastpass secure note.