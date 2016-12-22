Pianote Development Environment
================================================

Get it running
-------------------------------------------------

1. pull repo "Pianote"
2. from project root, run ```docker-init.bat```. If successful, this will finish with you with an ssh connection into the workspace container.
3. In said container
	1. run ```gulp``` command
	1. run ```gulp watch``` command

SSH into workspace container
--------------------------------------------------

The docker-init.bat script will ssh you in, but if you use that terminal session for running gulp watch.

You could run gulp watch in the background probably, but then you'd have to remember to stop it. Bad things can happen if you change branches without stopping gulp (still true?).

1. (from your computer), run ```docker ps``` to see all docker containers.
2. Look at the "CONTAINER ID" of the workspace container ("pianotelaradock_workspace"). Let's say it's "c3b441b697a0".
3. run ```docker exec -it c3b4 bash```. You only need enough of the id to differentiate it from the other containers. In this example, if no other containers have ids starting with "c", then you could just run ```docker exec -it c bash```.
4. You're in.

Stop pianote
------------------------------------------

1. (from your computer) go to "/pianote-laradock" directory.
2. run ```docker-compose stop```.