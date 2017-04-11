# Creating A Kubernetes Cluster

## Using The CLI Tools

1. Make sure AWS cli is connected to the aws account containing the cluster
```cmd
aws configure
```
1. Run kops get clusters
1. Note the name of the cluster you want to connect to with kubectl
1. Run kops export kubecfg --name CLUSTER_NAME