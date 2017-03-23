# Setting Up A New AWS VPC For Production Kubernetes (or staging)

## Creating the VPC

1. In your chosen aws region, go to the VPC Dashboard
1. Click create VPC
1. Enter a meaningful name
1. CIDR block should basically always be: 10.0.0.0/16

```text
A CIDR block is basically of list of allowed ip addresses for your private network.
10.0.0.0/16 means we have access to:

10.0.1-255.1-255

So when we create subnets for different services we can use 24 block notation:
Example: 
my-ec2-instances-subnet: 10.0.1.0/24
which translates to ip addresses in this range: 10.0.1.1-255

my-database-instances-subnet: 10.0.2.0/24
which translates to ip addresses in this range: 10.0.2.1-255

my-other-subnet: 10.0.3.0/24
my-more-subnet: 10.0.4.0/24
etc...
```

1. Leave No IPv6 CIDR Block checked, we don't need IPv6 right now
1. Leave tenancy at default
1. Create
1. Once its created, select your VPC and click actions -> Edit DNS Hostnames
1. Select Yes and hit save, this allows aws to create hostnames for our database instances

## Creating the subnets

```text
For a more bare bones ec2 server setup, or for ebs, you would want a subnet for ec2 instances, 
and two for databases, and one for cache servers. However since we are using kuberneters, 
we only need for one databases instances and elasticache instances, 
since kuberneters will create its own ec2 subnets in our VPC.
```

1. We are going to create our 2 database subnets first (rds requires 2 subnets, each in a different region, for automatic failover)
1. Go to Subnets in the left VPC dashboard panel
1. Click create subnet
1. Enter a name, like: my-database-subnet
1. Select the VPC we created in the first section
1. Select an availability zone like us-east-2a (note this zone, we want to make sure kubernets and our cache subnets are in the same zone)
1. Enter a IPv4 CIDR block within our main 10.0.0.0/24. Usually 10.0.2.0/24 is good.
1. Click Create.
1. Repeat steps for creating subnet, but call it something like: my-failover-database-subnet
1. Choose any other availibity zone than the first one, like us-east-2b
1. Choose another CIDR block like: 10.0.3.0/24
1. Click create
1. Finally, if you need to, create a subnet for your caching servers
1. Use details like: my-cache-subnet, 10.0.4.0/24, us-east-2a (MAKE SURE you use the same availability zone as your first main rds subnet)

## Creating An Internet Gateway

1. We need an internet gateway to allow access to stuff in our network from the outside world
1. Select Internet Gateways from the VPC Dashboard left menu
1. Click Create Internet Gateway
1. Enter a name like: my-cool-gateway
1. Click Create
1. Select the gateway you just made
1. Click Attach to VPC
1. Select the VPC we made in the first section
1. Click attach

## Configuring The Route Table

1. Select Route Tables from the VPC Dashboard left menu
1. Select the route table that was automatically create for our new VPC
1. In the bottom panel, go to the routes tab and click Edit
1. Click Add another route
1. For destination enter the anywhere CIDR block: 0.0.0.0/0
1. Click in the target text input and select the internet gateway we just made (igw-XXXXXX)
1. Click save

## Your Done! See additional steps below if you want.

## Creating The RDS Database Subnet Group

1. To go the RDS Dashboard
1. Click Subnet Groups in the left menu panel
1. Click Create DB Subnet Group
1. Enter a name and description
1. Select the VPC we created earlier
1. Choose your first availability zone (us-east-2a)
1. Choose your database subnet (10.0.2.0/24) and click Add
1. Choose your other availability zone (us-east-2b)
1. Choose your other database subnet (10.0.3.0/24) and click Add
1. Click create

## Creating The RDS Instance

1. Click Instances in the left menu panel
1. Click Launch DB Instance
1. Choose MySql database (Production), or Aurora if you want, click Next Step
1. Choose your instance details, we'll be using, mysql 5.7.16, m4.xlarge, multi-az yes, general purpose ssd, 250GB
1. Enter your DB settings for access
1. Click next step
1. Choose the VPC we created
1. Choose the subnet group we created
1. Set Publicly Accessible to Yes (unless you don't want it)
1. Leave the security group as Create new Security Group
1. Fill in other details as you wish
1. Click Launch DB Instance

## Creating The Cache Subnet Group

1. To go the Elasticache Dashboard
1. Click Subnet Groups in the left menu panel
1. Click Create Subnet Group
1. Enter a name and description
1. Select the VPC we created earlier
1. Choose your first availability zone (us-east-2a)
1. Choose your cache subnet (10.0.4.0/24) and click Add
1. Click create

## Creating The Cache Instance (redis in our case)

1. Click Redis in the left menu panel
1. Click Create
1. Enter your details
1. Click Advanced Redis settings and make sure the subnet group we just created is selected
1. Enter your other advanced details
1. Click Create