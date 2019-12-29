<?php

/**
 * Load services definition file.
 */
$settings['container_yamls'][] = __DIR__ . '/services.yml';

/**
 * Include the Pantheon-specific settings file.
 *
 * n.b. The settings.pantheon.php file makes some changes
 *      that affect all environments that this site
 *      exists in.  Always include this file, even in
 *      a local development environment, to ensure that
 *      the site settings remain consistent.
 */
include __DIR__ . "/settings.pantheon.php";

/**
 * If there is a local settings file, then include it
 */
$local_settings = __DIR__ . "/settings.local.php";
if (file_exists($local_settings)) {
  include $local_settings;
}

/**
 * Always install the 'standard' profile to stop the installer from
 * modifying settings.php.
 */
$settings['install_profile'] = 'minimal';


/**
 * Configuration for Redis Cache
 *
 * Make sure that the module is already installed and enabled prior to adding this config
 * The site will die with a WSOD Drupal Error if the module is not enabled
 */

if (defined('PANTHEON_ENVIRONMENT')) {
  $env = getenv('PANTHEON_ENV');
  if (PHP_SAPI == 'cli') {
    ini_set('max_execution_time', 999);
  } else {
    $settings['container_yamls'][] = 'modules/contrib/redis/example.services.yml';
    //phpredis is built into the Pantheon application container.
    $settings['redis.connection']['interface'] = 'PhpRedis';
    // These are dynamic variables handled by Pantheon.
    $settings['redis.connection']['host']      = $_ENV['CACHE_HOST'];
    $settings['redis.connection']['port']      = $_ENV['CACHE_PORT'];
    $settings['redis.connection']['password']  = $_ENV['CACHE_PASSWORD'];

    $settings['cache']['default'] = 'cache.backend.redis'; // Use Redis as the default cache.
    $settings['cache_prefix']['default'] = 'pantheon-redis';

    // Set Redis to not get the cache_form (no performance difference).
    $settings['cache']['bins']['form']      = 'cache.backend.database';
  }
}

/**
 * Place the config directory outside of the Drupal root.
 */

$settings["config_sync_directory"] =  dirname(DRUPAL_ROOT) . "/config/live";

if (isset($env) && $env !== 'live') {
  $config['config_split.config_split.config_' . $env]['status'] = TRUE;
}

