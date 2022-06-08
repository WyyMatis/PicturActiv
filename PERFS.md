# Optimisation de performances avec Symfony

## Quel est le symptôme ?

...Si vous êtes là, c'est que vous connaissez déjà le symptôme ;-)  
Les pages sous symfony rrrraamment sévèrement, sur les postes de travail utilisant MacOS ou Windows.  
(Linux n'a pas le problème, parce que linux, c'est cool.)

Sur mon mac, on est à 3500ms, c'est vite pénible.  
Sur certains PC (sans disque SSD), on est à 15, 20, 30 secondes, ça n'est pas utilisable.

## D'où vient le problème ?

Le problème vient _globalement_ du fait que Docker (sous mac ou sous windows) utilise une technologie de virtualisation, qui nécessite des entrées sorties entre l'hôte (l'OS Windows ou MacOS) et le container qui s'occupe du PHP.  
Les fichiers utilisés pour générer les pages PHP sont sur l'hôte (parce que nous n'avons pas encore fait d'optimisations), et sont lus en masse lors de _chaque_ interprétation d'un script PHP par le container iut-php, et tout ça représente BEAUCOUP de fichiers de petite taille, qui doivent tous passer par le "truc" qui gère les IO entre les containers et l'hôte, qui constitue un goulet d'étranglement.  

Les fichiers concernés sont principalement dans deux répertoires de notre projet symfony : `var` et `vendor` 
(le code que nous générons, dans `src` représente une toute petite partie du code chargé, et n'a donc quasiment pas d'influence sur les performances)

## Comment on améliore ça ?

Une solution facile et extrèmement efficace : utiliser linux nativement sur la machine.  
Bon, ok 🚪

Si on souhaite garder nos habitudes, on va devoir minimiser les I/O entre l'hôte et le container.

_Remarque : nous ne pouvions pas intégrer ces optimisations à la stack fournie, parce qu'elles doivent être réalisées *après* avoir fait l'installation de Symfony_

### Première étape, facile : `/var`

Le répertoire `/var` de notre projet symfony contient les fichiers de cache utilisés par le framework.  
Nous n'avons pas besoin d'avoir accès à ces fichiers. Donc nous pouvons les laisser dans le container.

Pour ce faire, nous allons modifier notre `/docker-compose.yml` pour lui dire que nous souhaitons utiliser un _volume_ (au sens de Docker) pour le répertoire `var` du projet symfony,  et que ce volume va rester dans le container.

On ajoute une section "volumes" globale :

```
version: '3'

volumes:
  symfonyvar:
...
```
et on utilise ce volume nommé "symfonyvar" dans la section "volumes" du service php :
```
...
  php:
    build:
      context: .
      dockerfile: docker/php/Dockerfile
    container_name: iut-php
    volumes:
      - "./:/var/www/html/"
      - symfonyvar:/var/www/html/projet/var
...
```
Et bim ! Sur mon mac, je passe de 3500ms à 600ms.  
Pas mal, mais on peut faire mieux.
