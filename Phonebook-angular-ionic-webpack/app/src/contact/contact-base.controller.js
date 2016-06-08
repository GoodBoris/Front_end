
export default class ContactBaseController {

    constructor($scope, $log, $rootScope, contactsService) {
        'ngInject';
        let vm = this;
        vm.contactsService = contactsService;
        vm.$log = $log;
        vm.contactsService.findAll().then((contacts) => {
            vm.contacts = contacts;
        });
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) { 
            if ('root.contact-index' === toState.name) {
                vm.contactsService.findAll().then((contacts) => {
                    vm.contacts = contacts;
                });
            }
        });
    }
    
}
