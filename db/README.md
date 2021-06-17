# Exporting Mongodb Collections
Make sure you are on project's db root folder in the host, not in the container
1. Enter in the MongoDB container and execute the command below from within docker container
```bash
docker ps
docker exec -it <containerid> /bin/bash
mongo "mongodb://sitkstrapi@localhost:27017/?authSource=admin"
> use strapi
```
2. List all collections from **strapi** database
```javascript
> db.runCommand( { listCollections: 1.0, authorizedCollections: true, nameOnly: true } )
> exit
```
3. Create a directory to export data
```bash
mkdir export
```
4. Run the `mongoexport`command for all collections

```bash
mongoexport --db strapi --username=sitkstrapi --password=sitkstrapi --authenticationDatabase=admin -c jobs --out export/jobs.json
mongoexport --db strapi --username=sitkstrapi --password=sitkstrapi --authenticationDatabase=admin -c font_awesomes --out export/font_awesomes.json
mongoexport --db strapi --username=sitkstrapi --password=sitkstrapi --authenticationDatabase=admin -c components_description_stack_items --out export/components_description_stack_items.json
mongoexport --db strapi --username=sitkstrapi --password=sitkstrapi --authenticationDatabase=admin -c components_description_job_descriptions --out export/components_description_job_descriptions.json
mongoexport --db strapi --username=sitkstrapi --password=sitkstrapi --authenticationDatabase=admin -c abouts --out export/abouts.json
mongoexport --db strapi --username=sitkstrapi --password=sitkstrapi --authenticationDatabase=admin -c services --out export/services.json
mongoexport --db strapi --username=sitkstrapi --password=sitkstrapi --authenticationDatabase=admin -c projects --out export/projects.json
mongoexport --db strapi --username=sitkstrapi --password=sitkstrapi --authenticationDatabase=admin -c socialmedias --out export/socialmedias.json
```
5. Exit from within MongoDB's container
```bash
exit
```
6. If you are using MongoDB in Docker use the command below from the linux host
- Replace `containerid` by MongoDB's container id using `docker ps` command.
```bash
docker cp containerid:/export/ .
```