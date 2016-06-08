export default class ModalService {
    constructor($ionicModal, $rootScope, $q, $controller) {
        'ngInject';
        this.show = show;

        function show(templateUrl, controller, parameters) {
            // Grab the injector and create a new scope
            let deferred = $q.defer(),
                ctrlInstance,
                modalScope = $rootScope.$new(),
                thisScopeId = modalScope.$id;

            modalScope.param = parameters;

            modalScope.modal = $ionicModal.fromTemplate(templateUrl, {
                scope: modalScope,
                animation: 'slide-in-up'
            })

            modalScope.openModal = function () {
                modalScope.modal.show();
            };
            modalScope.closeModal = function (result) {
                deferred.resolve(result);
                modalScope.modal.hide();
            };
            modalScope.$on('modal.hidden', function (thisModal) {
                if (thisModal.currentScope) {
                    var modalScopeId = thisModal.currentScope.$id;
                    if (thisScopeId === modalScopeId) {
                        deferred.resolve(null);
                        _cleanup(thisModal.currentScope);
                    }
                }
            });
            // Invoke the controller
            let locals = { '$scope': modalScope, 'parameters': parameters };
            let ctrlEval = _evalController(controller);
            ctrlInstance = $controller(controller, locals);

            if (ctrlEval.isControllerAs) {
                ctrlInstance.param = parameters;
                ctrlInstance.openModal = modalScope.openModal;
                ctrlInstance.closeModal = modalScope.closeModal;
            }
            modalScope.modal.show();
            return deferred.promise;
        }

        function _cleanup(scope) {
            scope.$destroy();
            if (scope.modal) {
                scope.modal.remove();
            }
        }

        function _evalController(ctrlName) {
            let result = {
                isControllerAs: false,
                controllerName: '',
                propName: ''
            };
            let fragments = (ctrlName || '').trim().split(/\s+/);
            result.isControllerAs = fragments.length === 3 && (fragments[1] || '').toLowerCase() === 'as';
            if (result.isControllerAs) {
                result.controllerName = fragments[0];
                result.propName = fragments[2];
            } else {
                result.controllerName = ctrlName;
            }
            return result;
        }

    }
}