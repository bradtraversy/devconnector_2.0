# DevConnector 2.0

> Social network for developers

This is a MERN stack application from the "MERN Stack Front To Back" course on [Udemy](https://www.udemy.com/mern-stack-front-to-back/?couponCode=TRAVERSYMEDIA). It is a small social network app that includes authentication, profiles and forum posts.

## Quick Start

```
# change default.json file in config folder

# this file is located in config/default.json

# add uri of your mongodb connection for example

 "mongoURI": "mongodb://localhost/dev-social",
 
```

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install

# Run both Express & React from root
npm run dev

# Build for production
cd client
npm run build
```

## Run E2E tests with Cypress
- [More info on Cypress](https://www.cypress.io/how-it-works)
- [Video demo of Cypress running on DevConnector](https://drive.google.com/file/d/1z7UR7ApbHi5_DjuFkUUEUbBQE9RlsOJV/view)
- Run through different user stories and validation sets with automated Cypress testing! Running `npm i` already installed Cypress as a dev dependency, easy as that
- Run `npm run cypress` at root and Cypress web app will launch
- Run spec tests under `integration/devconnector` and never test by hand again!

## App Info

### Author

Brad Traversy
[Traversy Media](http://www.traversymedia.com)

### Version

2.0.0

### License

This project is licensed under the MIT License
