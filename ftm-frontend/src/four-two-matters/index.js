import angular from 'angular';
import FourTwoMattersController from './ctrl.ftm';
import routes from './routes.ftm';

export default angular.module('app.fourTwoMatters', [])
  .config(routes)
  .controller('fourTwoMattersController', FourTwoMattersController)
  .name;
