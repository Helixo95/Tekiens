
# Tekiens
**Tekiens** est une application dédié à la vie étudiante à CY Tech. L'objectif de cette application est de centraliser les informations sur les associations et les événements à l'école. Elle se base sur le site internet de tekiens.net créée par [Atilla](https://atilla.org). L'application est codée en utilisant [Ionic](https://ionicframework.com/) qui est un framework open-source permettant de développer des applications mobiles multiplateformes. Nous utilisons aussi le framework front-end **React** avec **Ionic**.

## Sommaire
-  [Prérequis](#prérequis)
-  [Utilisation](#utilisation)

## Prérequis
### Debian / Ubuntu
Avant de pouvoir commencer, il est nécessaire d'installer [Node.js](https://nodejs.org/en).
```sh
$ sudo apt install nodejs
```
Il est aussi vivement recommandé d'installer **npm**, le package manager pour Node.
```sh
$ sudo apt install npm
```
Vous pouvez maintenant installer **Ionic**. Si vous avez des difficultés, n'hésiter pas à consulter la [documentation](https://ionicframework.com/docs/) de **Ionic**.
```sh
$ npm install -g @ionic/cli
```
Si vous avez une ancienne version de **Ionic**, il est nécessaire de la désinstaller à cause de changement des noms des packages.
```sh
$ npm uninstall -g ionic
$ npm install -g @ionic/cli
```
Nous utilisons aussi **Capacitor** qui est un outil créé par l'équipe **Ionic**. Il permet aux développeurs de convertir leurs applications web pour qu'elles fonctionnent sur des appareils mobiles comme s'il s'agissait d'applications natives. Nous l'utilisons surtout pour build notre projet pour android.
```sh
$ npm install capacitor
```
Pour la traduction de l'application, nous utilisons [i18Next](https://www.i18next.com/) qui est un framework d'internationalisation écrit en JavaScript et conçu spécifiquement pour ce langage.
```sh
$ npm install i18next
```
Nous utilisons aussi certains package précis de **React**.
```sh
$ npm install react-router-dom
$ npm install swiper
```
Pour le hashage des mot de passes nous utilisons [bcryptjs](https://www.npmjs.com/package/bcryptjs).
```sh
$ npm install bcryptjs
```
Pour parser / unparser la description des associations et des évènements nous utilisons [DOMPurify](https://github.com/cure53/DOMPurify), [marked](https://github.com/markedjs/marked), [marked-mangle](https://github.com/markedjs/marked-mangle) et [turndown](https://github.com/mixmark-io/turndown).

```sh
$ npm install domPurify
$ npm install marked
$ npm install marked-mangle
$ npm install turndown
```
Pour modifier la description des événement et des associations nous utilisons [quill](https://github.com/slab/quill).
```sh
$ npm install quill@2.0.2
```
Pour vérifier la connexion à internet nous utilisons l'API [network de capacitor](https://capacitorjs.com/docs/apis/network).
```sh
$ npm install @capacitor/network
```
Pour la gestion des notifications nous utilisons l'API [local notification de capacitor](https://capacitorjs.com/docs/apis/local-notifications).
```sh
$ npm install @capacitor/network
```
## Utilisation
Notre application est divisée en 5 pages principales :
- [Accueil](#accueil)
- [Associations](#associations)
- [Évènements](#évènements)
- [Favoris](#favoris)
- [Paramètres](#paramètres)

### Accueil
Lorsque que vous lancez l'application vous tomberez sur la page d'accueil. Sur cette page vous pourrez découvrir une association aléatoire et slider pour en avoir une nouvelle. Vous pourrez aussi  voir les évènements à venir.
### Associations
Sur la page associations vous aurez accès à toutes les associations qu'elles soient actives ou anciennes. Lorsque vous cliquez sur une association vous serez redirigé vers sa page avec toutes ses informations. Vous pouvez aussi accédez à ses évènements.
### Évènements
### Favoris
### Paramètres
