# Using Our ELK Stack

## Access Details

We use a hosted elk stack on logit.io. You can login at https://logit.io/a/f60c21b4-781c-4c1a-ac70-1c906af3ad55.

Click the Kibana button beside the railroad-media-production stack to open the Kibana dashboard.

## Viewing the Logs

To view the main drumeo logs:

1. Click 'Open' in the top right menu
1. Click the 'All Errors' saved search
1. Choose your time period using top right button
1. You should now see logs in chosen time period

## S3 Archiving Helpers

**NOTE: You must replace API_KEY, AWS_ACCESS_KEY, and AWS_SECRET_KEY as needed from the lastpass note: aws-elk-stalk-access-details

**Creating a new backup repository:**

```cmd
curl -XPUT 'https://993f2ebf-75ae-490c-9bd4-c0ebd7141b8f-es.logit.io/_snapshot/s3_backup?apikey=API_KEY&pretty=true' -d '{
     "type": "s3",
     "settings": {
         "access_key": "AWS_ACCESS_KEY",
         "secret_key": "AWS_SECRET_KEY",
         "bucket": "elastisearch-s3-backups",
         "region": "us-east-1",
         "base_path": "drumeo-production-logs",
         "max_retries": 3
     }
 }'
```

**Create a new snapshop:**
```cmd
curl -XPUT "https://993f2ebf-75ae-490c-9bd4-c0ebd7141b8f-es.logit.io/_snapshot/s3_backup/snapshop-$(date +%s)?apikey=API_KEY&wait_for_completion=false"
```

**List all snapshots:**
```cmd
curl -XGET 'https://993f2ebf-75ae-490c-9bd4-c0ebd7141b8f-es.logit.io/_snapshot/s3_backup/_all?apikey=API_KEY' | python -m json.tool
```