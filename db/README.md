# MongoDB in Docker - Export/Import
## Exporting Mongodb Collections
Make sure you are on the origin project's db root folder in the host, not in the container
1. Enter into the MongoDB container
```bash
docker ps
docker exec -it <containerid> /bin/bash
```
2. Execute the command below from within docker container. The password is sitkstrapi
```bash
mongo "mongodb://sitkstrapi@localhost:27017/?authSource=admin"
> use strapi
```

3. List all collections from **strapi** database
```javascript
> db.runCommand( { listCollections: 1.0, authorizedCollections: true, nameOnly: true } )
> exit
```
4. Create a directory to export data whitin the MongoDB container
```bash
mkdir export
```
5. Run the `mongoexport`command for the collections you want to export

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
6. Exit from MongoDB's container
```bash
exit
```
7. Copy the `export` directory from whitin MongoDB container to the project's db root folder in the host. Replace `containerid` by MongoDB's container id using `docker ps` command.
```bash
docker cp containerid:/export/ .
```
## Importing Mongodb Collections
Make sure you are on the target project's db root folder in the host, not in the container
1. Copy the export directory from the origin project's db root folder and rename it to import
```bash
cp -r /path/to/originproject/db/export .
mv export import
```
2. Copy the `import` directory from the host to MongoDB container. Replace `containerid` by MongoDB's container id using `docker ps` command.
```bash
docker cp ./import containerid:/
```
3. Enter into the MongoDB container
```bash
docker exec -it containerid /bin/bash
```
4. Execute the command below from within docker container. The password is sitkstrapi
```bash
mongo "mongodb://sitkstrapi@localhost:27017/?authSource=admin"
> use strapi
```
5. List all collections from **strapi** database and make sure you find all those empty collections you want to import
```javascript
> db.jobs.count()
> db.font_awesomes.count()
> db.components_description_stack_items.count()
> db.components_description_job_descriptions.count()
> db.abouts.count()
> db.services.count()
> db.projects.count()
> db.socialmedias.count()
> exit
```
6. Import the collections
```bash
mongoimport --db strapi --username=sitkstrapi --password=sitkstrapi --authenticationDatabase=admin -c jobs --file ./import/jobs.json
mongoimport --db strapi --username=sitkstrapi --password=sitkstrapi --authenticationDatabase=admin -c font_awesomes --file ./import/font_awesomes.json
mongoimport --db strapi --username=sitkstrapi --password=sitkstrapi --authenticationDatabase=admin -c components_description_stack_items --file ./import/components_description_stack_items.json
mongoimport --db strapi --username=sitkstrapi --password=sitkstrapi --authenticationDatabase=admin -c components_description_job_descriptions --file ./import/components_description_job_descriptions.json
mongoimport --db strapi --username=sitkstrapi --password=sitkstrapi --authenticationDatabase=admin -c about --file ./import/abouts.json
mongoimport --db strapi --username=sitkstrapi --password=sitkstrapi --authenticationDatabase=admin -c services --file ./import/services.json
mongoimport --db strapi --username=sitkstrapi --password=sitkstrapi --authenticationDatabase=admin -c projects --file ./import/projects.json
mongoimport --db strapi --username=sitkstrapi --password=sitkstrapi --authenticationDatabase=admin -c socialmedias --file ./import/socialmedias.json
```