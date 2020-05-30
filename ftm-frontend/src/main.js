/* eslint-disable */

// REQUIRES - NODE STYLE
require("@babel/runtime/regenerator");
require("@babel/register");
require ("webpack-hot-middleware/client?reload=true");
require ("./index.html");

// IMPORTS: ES 6 STYLE
// ANGULAR LIBRARIES
import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngSanitize from 'angular-sanitize';
import ngAnimate from 'angular-animate';

// STYLES
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/stylus/main.styl';

// CUSTOM
import fourTwoMattersModule from './four-two-matters';

angular.module('app', [
  uirouter,
  ngSanitize,
  ngAnimate,
  fourTwoMattersModule,
]).config(($locationProvider) => {
  'ngInject';
  
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  }).hashPrefix('!');
});
angular.bootstrap(document, ['app']);
