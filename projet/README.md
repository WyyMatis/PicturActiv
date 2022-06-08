# PicturActiv'

PicturActiv' est un site de galerie d'images interactives  

## Environnement de développement

### Pré-requis

* Docker
* Docker-compose
* IDE (VSCode ou PhpStorm)

## Lancer l'environnement de développement

### Terminal :
```bash
docker-compose up --build -d
docker exec -it iut-php bash
```
### iut-php bash (bash-5.1#) :
```bash
cd projet
```

#### Installer les dépendances (dont vendor) :

```bash
composer install
```

#### Execution des migrations :

```bash
php bin/console d:m:m
```

#### Lancement de la fixture :

```bash
php bin/console d:f:l
```

#### Lancer des tests

```bash
php bin/phpunit --testdox
```
