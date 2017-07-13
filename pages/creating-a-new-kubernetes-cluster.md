# Creating A Kubernetes Cluster

# Using The CLI Tools

Kubernetes has 2 main cli tools, kubectl and kops.
kops is for creating and managing the actual cluster master server.
kutectl is for managing your actual applications and nodes.
Neither of these tools run natively in windows, so we have a docker container setup for running them.

**Requires Docker for windows**

1. Clone https://github.com/railroadmedia/railkubernetes in to C:\web-development-environment\railkubernetes
1. In windows CMD to go the project root of railkubernetes
1. Run docker-compose up -d
1. Exec in to the new container (railkubernetes_railenvironment): docker exec -it ID bash
1. The container automatically mounts all of C:\web-development-environment to \railenvironment
1. To make sure kops is working, run:
```cmd
kops version
```
1. If you see the version your good to go
1. To make sure kubectl is working, run:
```cmd
kubectl version
```
1. It should say Connection refused, which means you are ready to go!

# Setting up AWS for Kubernetes

Using this for reference (starting on step 4/5): <https://kubernetes.io/docs/getting-started-guides/kops/>

1. Setup the AWS cli so kops and access our aws account, run:
```cmd
awsw configure
```
1. Fill in relevant details
1. Create a new ssh keypair for accessing the cluster, run (all prompt values can be empty, just press enter):
```cmd
ssh-keygen -t rsa
```
1. We'll use useast2.drumeo.railkuber.com for our cluster name, s3 bucket is already setup, see link above
1. Run

```cmd
export KOPS_STATE_STORE=s3://clusters.railkuber.com
```

1. Then to create a new cluster run (using our existing VPC is)(change as needed):
```cmd
kops create cluster --zones=us-east-2a useast2.drumeo.railkuber.com --master-size=m4.large --node-size=m4.large --vpc=vpc-1c209f75
```
1. Then to actually start the instances and cluster, run:
```cmd
kops update cluster useast2.drumeo.railkuber.com --yes
```