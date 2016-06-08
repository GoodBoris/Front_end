import modController from './search.controller';

export default angular.module('prototype.contact.directive', [])
    .directive('helloWorld', modConfig)
    .controller('ContactSearchController', modController)
    .name;
