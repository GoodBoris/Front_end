import ContactBaseController from '../contact-base.controller';
export default class ContactNewController extends ContactBaseController {

    constructor($scope, $log, $stateParams, $rootScope, $state, $ionicPopup, contactsService) {
        'ngInject';
        super($scope, $log, $rootScope, contactsService);
        
        let vm = this;
        vm.save = save;
        init();

        function init() {
            vm.newContact = {
                "id": null,
                "firstName": "",
                "lastName": "",
                "managerId": 0,
                "managerName": "",
                "reports": 0,
                "title": "VP of Sales",
                "department": "Sales",
                "cellPhone": "",
                "officePhone": "781-000-0005",
                "email": "",
                "city": "Boston, MA",
                "pic": "Avatar.jpg",
                "twitterId": "@fakermoore",
                "blog": "http://coenraets.org"
            }
        }

        function save(inputForm) {
            vm.newContact.id = vm.contacts.slice(-1).pop().id + 1;
            vm.contacts.some(function (contact) {
                if (parseInt(contact.id) === parseInt(vm.newContact.managerId)) {
                    vm.newContact.managerName = contact.firstName + " " + contact.lastName;
                    return true;
                }
            });

            contactsService.add(vm.newContact).then((contacts) => {
                vm.contacts = contacts;
                $ionicPopup.alert({
                    title: 'PhoneBook',
                    template: 'The contact was added successfully.'});
            }).catch(function(response) {
                $log.error(response);
                $ionicPopup.alert({
                    title: 'PhoneBook',
                    template: 'Can not add the contact!.'});
            });

            let newId = vm.newContact.id;
            init();
            inputForm.$setPristine();
            inputForm.$setUntouched();
            $state.go('root.contact-detail', { id: newId });
        }
    }
}
