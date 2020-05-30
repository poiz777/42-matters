# 42 MATTERS: FRONTEND SOLUTION.
This is Poiz's Solution to the Frontend tier of «42 Matters» FullStack Developer Assignment 
using `AngularJS 1.6` on the Frontend alongside `ES 6`, `Pug`, `Stylus`, `Webpack`, `NPM`, 
`Custom Express-Server`, `Bootstrap` & `Font-Awesome`... with PHP 7 at the Backend.


## Installation
  This Solution uses `NPM` for managing  Dependencies, thus making the Installation process 
  pretty much straight-forward. On the terminal, just run the usual: 
```sh
  npm install 
  # or alternatively: 
  npm i
```
This Command should be executed at the very top-level of the `frontend` Directory resulting from 
the unzipped package. Executing this Command will pull-in the required dependencies. 
After this step; you would then be ready to actually run the application and see the result in a Web-Browser.  

## Running the Application
  
### Prerequisite
  To be able to get Data from the Backend, you should first ensure that the Backend Server 
  is up and running. Please see the `README.md` File within the Backend Package for further Instructions
  on how to start and test the Backend Server. Also, make sure that `port 8080` is Free on your System. 
  You can also change the Port from within the Express Server if you wish but otherwise `port 8080` will be used by default.
### Enter Express Server and the Browser
 It is assumed, you have fulfilled the Prerequisite above. If so, then it's time to preview the App in the Browser.
 Now, run:
 ```sh 
    npm run dev
    # or alternatively:
    npm run start 
```
Running any one of the Commands above will spin up a new Express Server. Hopefully, you had no Problems
after running the Command. If so, well then: *it's about time to see something in the Browser!* 
Now, you can just navigate to the address
reported on the Command-Line. By default, this should be: `http://localhost:8080` 
From there on, you can interact with the Application to see if all the requirements defined 
in the Assignment were met.

-- Poiz Campbell


## Tips
* I mentioned earlier that it is possible to change the Port within the Express file. To do that, 
just open up the File located at `$app-root/src/server/express.js`. The File is lean and the content
looks like the Code below. Notice the only Comment in that File? There is where you can 
adjust the Port-Number.

```javascript
import 'core-js/stable';
import express from 'express';

const server            = express();
const staticMiddleWare  = express.static('dist');
const webpack           = require('webpack');
const config            = require('../../config/webpack.dev');
const compiler          = webpack(config);

const wpkDevMiddleWare  = require('webpack-dev-middleware')(
  compiler,
  config.devServer
);

const wpkHotMiddleWare  = require('webpack-hot-middleware')(compiler);

server.use(wpkDevMiddleWare);
server.use(wpkHotMiddleWare);
server.use(staticMiddleWare);

const port              = 8080; // <= CHANGE THIS VALUE TO CHANGE THE PORT.
server.listen(port, () => {
  console.log(`\n\nServer is listening.\nVisit http://localhost:${port}\n\n`);
});

```

## Screenshots

![alt](http://poiz.me/screenshots/front-end-cli-screen-shot-01.jpg)

![alt](http://poiz.me/screenshots/front-end-screen-shot-01.jpg)

![alt](http://poiz.me/screenshots/front-end-screen-shot-02.jpg)

![alt](http://poiz.me/screenshots/front-end-screen-shot-03.jpg)

![alt](http://poiz.me/screenshots/front-end-screen-shot-04.jpg)

![alt](http://poiz.me/screenshots/front-end-screen-shot-mobile-01.jpg)

