export default class ContactSearchController {

    constructor ($scope, $log, $stateParams, itemsService) {
        'ngInject';
        var vm = this;
        $scope.greeting = "Hello World";
        $log.info(vm.greeting);
    }
}
