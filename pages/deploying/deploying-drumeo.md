# How to Deploy Drumeo

*\*\* **Note**: This is for windows.*

## Deploying Drumeo Production/Staging Steps

1\. Clone the railkubernetes repository in to your development environment folder 
```text
https://github.com/railroadmedia/railkubernetes.git
in to
C:\web-development-environment\railkubernetes
```

2\. Copy the aws credentials.example file to credentials
```text
C:\web-development-environment\railkubernetes\railenvironment\.aws\credentials.example
to
C:\web-development-environment\railkubernetes\railenvironment\.aws\credentials
```

3\. Open the credentials file in an editor and replace the contents with the note from the lastpass shared note called: **Shared-Railroad Web Development/aws-access-cli-credentials-file**

4\. Open a command prompt and navigate to the railkubernetes project folder
```cmd
cd \web-development-environment\railkubernetes
```

5\. Build and start the container using the docker compose command
```cmd
docker-compose up -d --build
```

6\. Once the container is built and running, find its id by running:
```cmd
docker ps
```

7\. You should see the container under railkubernetes_railenvironment, note the first 3 letters of the CONTAINER ID. Ex:
```text
CONTAINER ID        IMAGE                            COMMAND
9ba6f81df437        railkubernetes_railenvironment   "/bin/sh -c 'exec ..." ...

```

8\. Connect to the container using this command, replacing the XXX with the first 3 letter of the container ID noted before
```cmd
docker exec -it XXX bash
```

9\. Once you are inside the container, you can deploy by just running the 'deploy' command alias
```cmd
deploy
```

10\. Follow the on screen instructions, it will ask if you want to deploy production or staging

11\. Once the deploy has started, do not close the container or the deploy will be interrupted

12\. **Done!**