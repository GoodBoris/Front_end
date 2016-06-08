import ContactsService from './contacts.service';
import baseController from './contact-base.controller';
import indexController from './contact-index/contact-index.controller';
import detailController from './contact-detail/contact-detail.controller';
import reportsController from './contact-reports/contact-reports.controller';
import newController from './contact-new/contact-new.controller';
import editController from './contact-edit/contact-edit.controller';

export default angular.module('prototype.contacts', ['ngMessages'])
    .service('contactsService', ['$q', '$log', '$window', ContactsService])
    .controller('ContactDetailController', detailController)
    .controller('ContactIndexController', indexController)
    .controller('ContactReportsController', reportsController)
    .controller('ContactNewController', newController)
    .controller('ContactEditController', editController)
    .name;