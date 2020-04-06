# DevConnector 2.0

> Social network for developers

This is a MERN stack application from the "MERN Stack Front To Back" course on [Udemy](https://www.udemy.com/mern-stack-front-to-back/?couponCode=TRAVERSYMEDIA). It is a small social network app that includes authentication, profiles and forum posts.

# Updates since course published

Such is the nature of software; things change frequently, newer more robust paradigms emerge and packages are continuously evolving.
Hopefully the below will help you adjust your course code to manage the most notable changes.

## Changes to GitHub API authentication

Since the course was published, GitHub has [depreciated authentication via URL query parameters](https://developer.github.com/changes/2019-11-05-deprecated-passwords-and-authorizations-api/#authenticating-using-query-parameters)
You can get an access token by following [these instructions](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)
For this app we don't need to add any permissions so don't select any in the _scopes_.
**DO NOT SHARE ANY TOKENS THAT HAVE PERMISSIONS**
This would leave your account or repositories vulnerable, depending on permissions set.

It would also be worth adding your `default.json` config file to `.gitignore`
If git has been previously tracking your `default.json` file then...

```bash
git rm --cached config/default.json
```

Then add your token to the config file and confirm that the file is untracked with `git status` before pushing to GitHub.
GitHub does have your back here though. If you accidentally push code to a repository that contains a valid access token, GitHub will revoke that token. Thanks GitHub 🙏

You'll also need to change the options object in `routes/api/profile.js` where we make the request to the GitHub API to...

```js
const options = {
  uri: encodeURI(
    `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
  ),
  method: 'GET',
  headers: {
    'user-agent': 'node.js',
    Authorization: `token ${config.get('githubToken')}`
  }
};
```

### npm package request depreciated

As of 11th February 2020 [request](https://www.npmjs.com/package/request) has been depreciated and is no longer maintained.
We already use [axios](https://www.npmjs.com/package/axios) in the client so we can easily change the above fetching of a users GitHub repositories to use axios.

Install axios in the root of the project

```bash
npm i axios
```

We can then remove the client installation of axios.

```bash
cd client
npm uninstall axios
```

Client use of the axios module will be resolved in the root, so we can still use it in client.

Change the above GitHub API request to..

```js
const uri = encodeURI(
  `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
);
const headers = {
  'user-agent': 'node.js',
  Authorization: `token ${config.get('githubToken')}`
};

const gitHubResponse = await axios.get(uri, { headers });
```

You can see the full change in [routes/api/profile.js](https://github.com/bradtraversy/devconnector_2.0/blob/4be414c6a54994c18397dba9c927ad67b878508b/routes/api/profile.js#L324)

## uuid no longer has a default export

The npm package [uuid](https://www.npmjs.com/package/uuid) no longer has a default export, so in our [client/src/actions/alert.js](https://github.com/bradtraversy/devconnector_2.0/blob/master/client/src/actions/alert.js) we need to change the import and use of this package.

change

```js
import uuid from 'uuid';
```

to

```js
import { v4 as uuidv4 } from 'uuid';
```

And where we use it from

```js
const id = uuid();
```

to

```js
const id = uuidv4();
```

## Addition of normalize-url package

Depending on what a user enters as their website or social links, we may not get a valid clickable url.
For example a user may enter _**traversymedia.com**_ or _**www.traversymedia.com**_ which won't be a clickable valid url in the UI on the users profile page.
To solve this we brought in [normalize-url](https://www.npmjs.com/package/normalize-url) to well.. normalize the url.

Regardless of what the user enters it will ammend the url accordingly to make it valid (assuming the site exists).
You can see the use here in [routes/api/profile.js](https://github.com/bradtraversy/devconnector_2.0/blob/31e5318592b886add58923c751dba73274c711de/routes/api/profile.js#L71)

## Fix broken links in gravatar

There is an unresolved [issue](https://github.com/emerleite/node-gravatar/issues/47) with the [node-gravatar](https://github.com/emerleite/node-gravatar#readme) package, whereby the url is not valid. Fortunately we added normalize-url so we can use that to easily fix the issue. If you're not seeing Gravatar avatars showing in your app then most likely you need to implement this change.
You can see the code use here in [routes/api/users.js](https://github.com/bradtraversy/devconnector_2.0/blob/master/routes/api/users.js#L44)

## Redux subscription to manage local storage

The rules of redux say that our [reducers should be pure](https://redux.js.org/basics/reducers#handling-actions) and do just one thing.

If you're not familiar with the concept of pure functions, they must do the following..

1. Return the same output given the same input.
2. Have no side effects.

So our reducers are not the best place to manage local storage of our auth token.
Ideally our action creators should also just dispatch actions, nothing else. So using these for additional side effects like setting authentication headers is not the best solution here.

Redux provides us with a [`store.subscribe`](https://redux.js.org/api/store#subscribelistener) listener that runs every time a state change occurs.

We can use this listener to **_watch_** our store and set our auth token in local storage and axios headers accordingly.

- if there is a token - store it in local storage and set the headers.
- if there is no token - token is null - remove it from storage and delete the headers.

The subscription can be seen in [client/src/store.js](https://github.com/bradtraversy/devconnector_2.0/blob/master/client/src/store.js)

We also need to change our [client/src/utils/setAuthToken.js](https://github.com/bradtraversy/devconnector_2.0/blob/master/client/src/utils/setAuthToken.js) so it now handles both the setting of the token in local storage and in axios headers.

With those two changes in place we can remove all setting of local storage from [client/src/reducers/auth.js](https://github.com/bradtraversy/devconnector_2.0/blob/master/client/src/reducers/auth.js). And remove setting of the token in axios headers from [client/src/actions/auth.js](https://github.com/bradtraversy/devconnector_2.0/blob/master/client/src/actions/auth.js). This helps keep our code predictable, manageable and ultimately bug free.

# Quick Start 🚀

### Add a default.json file in config folder with the following

```
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret",
  "githubToken": "<yoursecrectaccesstoken>"
}
```

### Install server dependencies

```bash
npm install
```

### Install client dependencies

```bash
cd client
npm install
```

### Run both Express & React from root

```bash
npm run dev
```

### Build for production

```bash
cd client
npm run build
```

### Test production before deploy

```bash
NODE_ENV=production node server.js
```

Check in browser on [http://localhost:5000/](http://localhost:5000/)

## App Info

### Author

Brad Traversy
[Traversy Media](http://www.traversymedia.com)

### Version

2.0.0

### License

This project is licensed under the MIT License
