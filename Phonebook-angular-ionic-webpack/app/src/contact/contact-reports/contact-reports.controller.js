export default class ContactReportsController {
    constructor($scope, $log, $stateParams, contactsService) {
        'ngInject';
        contactsService.getContactsByManager($stateParams.id)
            .then((contacts) => {
                this.contacts = contacts;
            })
            .catch(function (data, status) {
                $log.error('Gists error', response.status, response.data);
            });
    }
}
