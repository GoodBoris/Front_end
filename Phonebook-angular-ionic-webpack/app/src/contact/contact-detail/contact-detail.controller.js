export default class ContactDetailController {

    constructor ($scope, $stateParams, contactsService) {
        'ngInject';
        contactsService.getContactById($stateParams.id).then((contact) => {
            $scope.contact = contact;
        });
    }
}
