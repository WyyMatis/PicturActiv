Stack de développement PHP
==========================

Prérequis
---------

Sur votre machine Mac, Windows ou Linux :

- Docker 20.10 au moins
- (Docker) Compose 1.29 au moins  
  (Installer Docker Desktop 3.5 satisfait ces deux pré-requis)
- Un éditeur de texte ou un IDE
- L'accès à un terminal

De manière optionnelle, mais fortement recommandée :

- Une [clé SSH](https://forge.iut-larochelle.fr/help/ssh/index#generate-an-ssh-key-pair) active sur votre machine
  (perso) et [ajoutée dans votre compte gitlab](https://forge.iut-larochelle.fr/help/ssh/index#add-an-ssh-key-to-your-gitlab-account) :  
  elle vous permettra de ne pas taper votre mot de passe en permanence.
- PHPStorm  
  _Votre email étudiant vous permet de bénéficier d'une licence complète de 12 mois pour tous les produits JetBrains_  
  ...Mais vous pouvez bien sûr utiliser l'IDE de votre choix

Démarrage rapide
----------------

On récupère une archive zip du contenu de la branche main, à l'adresse  
https://forge.iut-larochelle.fr/2021-cpo3-pws3/stack/-/archive/main/stack-main.zip  
et on se positionne dans le dossier en question.

Dans un terminal :  
`docker compose up --build -d`

Une fois les containers démarrés, vous pouvez vérifier que php fonctionne :  
`docker exec -it iut-php php -v`

Pour exécuter un script php contenu dans un fichier (par exemple index.php) :  
`docker exec -it iut-php php index.php`

Un shell interactif php est disponible en faisant :  
`docker exec -it iut-php php -a`  
(plus d'infos ici : https://www.php.net/manual/fr/features.commandline.interactive.php)

Utiliser la base de données
-----------------------------

**Pour utiliser la base de données depuis le container php :**  
_Adresse du serveur_ : `db` (c'est le nom du service dans le fichier `docker-compose.yml`)  
_Port_ : 3306 (le port MySQL par défaut)

**Pour utiliser la bdd avec un client MySQL _hors docker_** (par exemple celui de PHPStorm) :  
_Adresse du serveur_ : `localhost`  
_Port_ : 3307 (plutôt que 3306 pour éviter un conflit si MySQL tourne déjà sur la machine hôte)  

Mot de passe root : `iut`.  
Par ailleurs, un utilisateur "standard" nommé `iut` a les droits d'accès sur une base de données nommée `iut`
avec le mot de passe `iut`

Le serveur web
--------------

Les fichiers du répertoire `/sandbox` sont servis sur le port 8887  
Initialement, dans le répertoire `/sandbox` sont présents deux fichiers, qui vous permettent de valider que tout fonctionne bien :  
http://localhost:8887 (sert `/sandbox/index.php`), affiche le présent README  
http://localhost:8887/phpinfo.php  (sert `sandbox/phpinfo.php`), affiche les détails de la configuration PHP et XDebug

Démarrer un projet Symfony
--------------------------

Le serveur web est en plus configuré pour qu'un projet symfony soit hébergé dans le répertoire `/projet`  
La ligne de commande symfony (plus d'infos : https://symfony.com/download) est incluse dans le container `iut-php`

Initialiser le projet revient donc à faire un :  
`docker exec -it iut-php symfony new --full --no-git projet`  
On utilise `--full` pour avoir une appli web complète, et `--no-git` parce que nous allons nous occuper par ailleurs 
de la problématique de versionning.

Composition de la stack
-----------------------

La stack comporte 3 containers :
- PHP (8.0.10, avec XDebug)
- Apache (2.4.48)
- MariaDB (10.6.4)

Utiliser XDebug
---------------
XDebug est un debugger qui permet de disposer d'informations complètes lors de l'exécution d'un script PHP
et aussi de faire de l'execution pas à pas en utilisant des breakpoints.

Pour utiliser XDebug, il faut l'activer, puis disposer d'un client, typiquement un IDE

**En ligne de commande**  
- On active [XDebug](https://xdebug.org/) en exposant une variable d'environnement :
`docker exec -e XDEBUG_SESSION=1 -it iut-php php index.php`

**En mode web**
Le plus simple est d'utiliser une extension du navigateur qui active un cookie : 
cherchez "XDebug Helper" pour Firefox ou Chrome

Une fois activé, paramétrez votre IDE pour qu'il écoute XDebug, et lancez votre script CLI ou chargez la page dans 
un navigateur.

