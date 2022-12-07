# Carambola

## Overview

## How to Run Locally
This section contains instructions on how to run the code locally. If you are savvy enough, you can simply unzip the `build.zip` folder and serve the contents from a local server of your own. If you need more concrete instructions, keep reading on.

### Prerequisites
You will need to install [Node](https://nodejs.org/download/release/v14.21.1/) and the [Angular CLI](https://angular.io/guide/setup-local).

* Node version ~14
* NPM Version ~6
* Angular CLI (any version would do)

### Running Development Code
In a terminal of your choice, navigate to the root of the game project and run the following:

```bash
ng serve --open
```

#### Configuring Development Code
You can edit global configs for the code through `environments/environments.ts`. 


### Running a Build Locally
In a terminal of your choice, navigate to the root of the game project and run the following: 

```bash
ng serve --open --prod
```

## Building the Game
In a terminal of your choice, navigate to the root of the game project and run the following: 

```bash
ng build --bashHref=''
```

This will pack up the code by uglifying it and smashing it altogether into small packets. The result will be dumped into a folder called `build`.

If you'd like to configure the build process, please refer to the documentation on the Angular CLI below.

## Application Info

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.0.

### Development server

Run `ng serve` for a dev server. Navigate to [http://localhost:4200/](http://localhost:4200/) in your browser. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
