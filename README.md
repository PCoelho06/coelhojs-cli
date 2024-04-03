# CoelhoJS CLI

La CLI (Interface en Ligne de Commande) pour le framework CoelhoJS.

## Installation

Pour installer la CLI de CoelhoJS, exécutez la commande suivante :

```bash
npm install -g coelhojs
```

## Utilisation

La CLI de CoelhoJS vous permet d'interagir avec le framework et de générer différents éléments pour votre application. Voici comment utiliser la CLI :

```bash
coelhojs [options] [command]
```

### Options

- `-v`, `-V`, `--version`: Affiche la version de la CLI.
- `-h`, `--help`: Affiche l'aide pour la commande.

### Commandes

#### `new-app <name>`

Crée une nouvelle application CoelhoJS avec le nom spécifié.

Exemple :

```bash
coelhojs new-app myApp
```

#### `new-controller [options] <name>`

Crée un nouveau contrôleur avec le nom spécifié.

Options :

- `-c` ou `--crud`: Crée toutes les méthodes CRUD ainsi que les points d'entrées pour la réalisation d'une API.

Exemple :

```bash
coelhojs new-controller MyController
```

#### `new-model [options] <name>`

Crée un nouveau modèle avec le nom spécifié.

Options :

- - `-c` ou `--crud`: Crée un controller CRUD associé au modèle nouvellement créé.

Exemple :

```bash
coelhojs new-model MyModel
```

#### `help [command]`

Affiche l'aide pour une commande spécifique.

Exemple :

```bash
coelhojs help new-app
```

## Besoin d'Aide?

Pour plus d'informations sur l'utilisation de la CLI CoelhoJS, veuillez consulter la documentation ou exécuter `coelhojs --help` ou `coelhojs -`.

## Contributions

- GitHub : [https://github.com/PCoelho06/coelhojs](https://github.com/PCoelho06/coelhojs)
- Mail : p.coelho@lapinou.tech

Pour toute contribution au projet CoelhoJS, n'hésitez pas à soumettre vos suggestions sur GitHub ou à contacter l'équipe de développement par e-mail. Ces voies de communication restent valables pour faire remonter tout problème rencontré avec CoelhoJS.
