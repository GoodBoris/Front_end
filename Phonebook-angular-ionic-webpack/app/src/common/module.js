import ModalService from './services/modal.window';

export default angular.module('prototype.contacts')
    .service('modalService', ['$ionicModal', '$rootScope', '$q', '$controller', ModalService])
    .name;