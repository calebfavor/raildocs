# Production Server Down/Offline

## Drumeo

### Initial Seps

Our production server runs on kubernetes in the aws US East Ohio region. We have 1 master node, 3 application nodes. We have 3 main application pods and 1 cron/job pod.

1\. First make sure you have the latest railkubernetes git, do a pull
2\. Once its pulled make sure you rebuild the docker image: docker-compose up -d --build (you may need to manually delete the old docker image if you get build errors)
3\. Now exec in to the railkubernetes container, this is where all server management happens
4\. See (https://railroadmedia.github.io/raildocs/?current-md=deploying%2Fdeploying-drumeo.md) for setting up the railkubernetes container if needed
5\. First make sure your kubectl is set to the production cluster (we have a production and staging cluster)
```cmd
kops export kubecfg --name useast2-production.drumeo.railkuber.com
```
6\. Then run
```cmd
kubectl get pods
```
7\. If everything is running properly you should see something like:

![kubectl-get-pods](/images/production-emergency-procedure/kubectl-get-pods-dump.png)

### Finding the Problem

1\. If you see anything other than 'Running' under status for a pod, that means its down or having problems

### What to do first
1\. Try re-deploying
2\. If that doesn't work, try deleting all the pods so they automatically rebuild (this will cause downtime)
 ```cmd
 kubectl delete pods --all
 ```
 3\. Wait for the pods to rebuild and see if its fixed