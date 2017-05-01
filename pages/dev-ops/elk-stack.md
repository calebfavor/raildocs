# Setting Up A New AWS VPC For Production Kubernetes (or staging)

**NOTE: There is an internal networking dns issue with launching kubernetes stacks in to existing VPCs.
This guide is DEPRECATED. Let KOPs make your VPC.** 

## Creating the VPC


curl -XPUT 'https://993f2ebf-75ae-490c-9bd4-c0ebd7141b8f-es.logit.io/_snapshot/s3_backup?apikey=31a6af66-4e7d-45a9-9db7-9da0344f6e5a&pretty=true:9200' -d '{
    "type": "s3",
    "settings": {
        "access_key": "AKIAJA4KLCO2MW5OHGAQ",
        "secret_key": "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",
        "bucket": "elk-stack-user",
        "region": "us-east-2",
        "base_path": "elasticsearch",
        "max_retries": 3
    }
}'