# Milken Institute Website Rebuild 2.0 #


## Installation ##

This is a repo for the new MI site. To initialize a local development environment, run the following commands from the project root on the container host:

1. ```cp .env.dist .env```

2. ```cp docker/settings.local.php web/sites/default```

3. ```docker-compose up -d```

If the ```docker-compose``` command complete successfully, you can now launch a shell on the PHP container:

1. ```docker exec -it freshdrupalmi_php_1 bash```

Then from inside the docker container do the following to install the drupal site:

1. ```composer install && gulp```

2. ```drupal site:milken:install```

3. ```drupal site:milken:migrations```

After installation completes, open a browser and navigate to http://localhost:8080/


## Wipe and Re-create the docker environment ##

If you happen to break something in the environment, it is often better to remove the image cache and rebuild the docker instances from scratch. To do so, simply run the following commands from the project root on the container host.

1. ```docker-compose down --rmi all``` To shutdown and remove all docker images.

2. ```docker/bin/cleanDocker``` To prune the docker environment.

3. After wiping the environment, follow the Installation steps starting with step 1.


## Merge a tag into an existing branch ##

Sometimes a branch might fall behind and you might need to bring it up to date to a certain stable tag.

1. ```git checkout tag_name``` Will checkout the tag "tag_name" locally. 

2. ```git checkout -b new_branch_for_tag_name``` Will make a new branch (must not currently exist) with the code from "tag_name".

3. ```git merge -s ours existing_branch``` Will merge existing_branch into new_branch_for_tag_name and favor changes in new_branch_for_tag_name.

4. ```git commit -am "Merged existing_branch into new_branch_for_tag_name"``` Commit the merge if it didn't already.

5. ```git checkout existing_branch``` Switch from the new_branch_for_tag_name to the original existing_branch.

6. ```git merge new_branch_for_tag_name``` Merge the result of all the above work into the original "existing_branch".


## Basic Development Practices ##

Here are a few tips to avoid ( or solve ) problems while developing.

1. Never check anything into the pantheon repo. Always check into github and allow CircleCI to do a build

2. Make sure you have a pantheon environment with the same name as your development branch of the Github Repo

3. Never check in files/packages/etc that composer downloads.

4. ```drupal site:milken:destroy && drupal site:milken:install``` from inside the container will completely rebuild the Drupal site.

5. Config file directory is /config/live with config-split overrides in the various environment folder. IF YOU DO NOT UNDERSTAND HOW CONFIG-SPLIT WORKS, PLEASE DO NOT CHANGE THE CONFIG SPLIT SETTINGS. You will break the build if you do.

6. Once the build has run, your development environment should have a copy of the fully-deployed code on Pantheon. You can wipe your environment and use the Terminus command line library to verify your new code will install and config:import correctly.

7. You may choose to install the Drupal Console plugin for Pantheon Terminus on your local machine, to do so, run:

   a. ```mkdir -p ~/.terminus/plugins```

   b. ```composer create-project --no-dev -d ~/.terminus/plugins pantheon-systems/terminus-drupal-console-plugin:~1```


## Exporting Content Types ##

To export a content type to the config folder:

1. create the content type in your docker container's drupal instance

2. There are three parts to content type export YML files:

    a. ```node.type.{CONTENT_TYPE_MACHINE_NAME}.yml``` - the basic type definition

    b. ```field.storage.node.{FIELD_MACHINE_NAME}.yml``` - one for every new field

    c. ```field.field.node.{CONTENT_TYPE_MACHINE_NAME}.{FIELD_MACHINE_NAME}.yml``` - Field instance for every field attached to the node type. If there are fields that are used from other content types, they will not have a new storage file.

3. From the command line inside the container, do a ```config:export``` and the three types of files should be in place for each of the newly-created content types.

4. Most of the time ```language.entity.en.yml``` will have a UUID added to the top of the file. Discard the changes to this file. The uuid on the default language will only cause problems with importing the config.


## Exporting Content ( Nodes, Taxonomy terms etc... ) ##

To export content in order to have it import automatically on site build, follow the next steps.

1. ```drush dcer taxonomy_term --folder=some/folder/within/web/root``` To export all taxonomy_term content into the given path

2. Then place the exported files into web/modules/custom/milken_migrate/content/taxonomy_term

3. When the module Milken_Migrate is enabled, it will load the content into the site automatically. 

4. The content will also be loaded automatically on every site build. 
