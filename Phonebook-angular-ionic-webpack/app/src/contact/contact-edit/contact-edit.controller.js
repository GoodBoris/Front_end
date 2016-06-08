import ContactBaseController from '../contact-base.controller';
export default class ContactEditController extends ContactBaseController {

    constructor($scope, $log, $rootScope, contactsService, parameters) {
        'ngInject';
        super($scope, $log, $rootScope, contactsService);
        let vm = this;
        contactsService.getContactById(parameters).then((result) => {
            vm.contact = result;
        });
        vm.save = save;
        function save() {
            vm.contacts.some(function (contact) {
                if (parseInt(contact.id) === parseInt(vm.contact.managerId)) {
                    vm.contact.managerName = contact.firstName + " " + contact.lastName;
                    return true;
                }
            });
            contactsService.update(vm.contact);
            this.closeModal(vm.contact);
        }
    }
}
