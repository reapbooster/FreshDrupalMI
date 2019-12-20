# Milken Institute #

This is a repo for the new MI site. To initialize local development, run the following commands:

1. ```cp .env.dist .env```
2. ```cp docker/settings.local.php web/sites/default```
3. ```docker-compose up -d```
4. ```docker exec -it freshdrupalmi_php_1 bash```

Then from inside the container

5. ```composer install && gulp```
6. ```drupal site:milken:install```

then open a browser and navigate to http://localhost:8080/

