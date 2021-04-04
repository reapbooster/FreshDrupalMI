

PANTHEON_SITE_NAME?=$(shell basename $(shell pwd))
BACKUP_FILE_NAME=${PANTHEON_SITE_NAME}.sql.gz
LIVE_SITE=${PANTHEON_SITE_NAME}.live

help:
	@echo "TBD: WRITE HELP TEXT"

env:
	@[ ! -f ./.env ] && make firstrun || true

build: env
	make build-php-composer
	### TODO; if local cluster isn't running, run it.'
	make build-node-webpack
	make build-mysql-from-backup

build-php-composer:
	$(shell composer install-vendor-dir)

build-node-webpack:
	$(shell gulp run build)

run-mysql-from-backup:

	echo@ "** If terminus is set up incorrectly on this machine, the database download will fail. **"

	MYSQL_ROOT_PASSWORD=$(grep MYSQL_ROOT_PASSWORD .env | cut -d '=' -f 2-)
	DB_HOST=$(shell grep DB_HOST .env | cut -d '=' -f 2- )
	DB_PORT=$(shell grep DB_PORT .env | cut -d '=' -f 2- )
	DB_NAME=$(shell grep DB_NAME .env | cut -d '=' -f 2- )


	terminus backup:create ${LIVE_SITE} --element=database --yes



	@[ -f "db/${BACKUP_FILE_NAME}" ]& && rm "db/${BACKUP_FILE_NAME}"
	terminus backup:get ${LIVE_SITE} --element=database --yes --to=db/${BACKUP_FILE_NAME}

	kubectl exec -it redis-cli flushall

	$(shell pv db/${BACKUP_FILE_NAME} | gunzip | mysql -u root --password=${MYSQL_ROOT_PASSWORD} -h ${DB_HOST} --port ${DB_PORT} ${DB_NAME})


authterminus:
	## This command assumes terminus is correctly set up
	## RE: https://github.com/pantheon-systems/terminus
	terminus auth:login --email=$(shell git config --global user.email)

firstrun:
	cp .env.dist .env

_install_mac:
	# TODO for windows
	brew install direnv kubernetes-cli jq yq docker make git pv gunzip

.DEFAULT_GOAL := help
