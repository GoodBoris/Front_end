import contactEditTemplate from "../contact-edit/contact-edit.html";
import ContactBaseController from '../contact-base.controller';
export default class ContactIndexController extends ContactBaseController {

    constructor($scope, $q, $log, $rootScope, $ionicListDelegate, $templateCache, contactsService, modalService) {
        'ngInject';
        super($scope, $log, $rootScope, contactsService);
        let vm = this;
        let isLoadingMore = false;
        vm.$q = $q;

        vm.loadMore = ionic.throttle(doLoadMore, 1000);
        vm.refresh = refresh;
        vm.remove = remove;
        vm.search = search;
        vm.clearSearch = clearSearch;
        vm.edit = edit;

        $scope.$on('$ionicView.loaded', init);

        function edit(contactId) {
            $ionicListDelegate.closeOptionButtons();
            modalService.show(contactEditTemplate, 'ContactEditController as contactEditCtrl', contactId)
                //Updating from memory. Doesn't call service
                .then((result) => {
                    if (result) {
                        let oldContact = _(vm.contacts).find(function (contact) {
                            return parseInt(contact.id) === parseInt(result.id);
                        });
                        _.assign(oldContact, result);
                    }
                });
        }

        function init() {
            vm.page = 1;
            vm.isPaginationOver = false;
        }

        function remove(contactId) {
            contactsService.remove(contactId).then((list) => {
                vm.contacts = list;
            });
        }

        //refresh imitation
        function refresh() {
            init();
            contactsService.findAll().then((list) => {
                vm.contacts = list;
            });
            //Uncomment the string below to apply refresh and scrolling 
            //and change doLoadMore function for getting real response.

            //vm.loadMore().finally(() => $scope.$broadcast('scroll.refreshComplete'));
            $scope.$broadcast('scroll.refreshComplete');
        }

        function search(item) {
            if (!$scope.searchKey ||
                (item.firstName.toLowerCase().concat(" " + item.lastName.toLowerCase()).indexOf($scope.searchKey.toLowerCase()) != -1) ||
                (item.cellPhone.replace(/-/g, '').indexOf($scope.searchKey) != -1)) {
                return true;
            }
            return false;
        }

        function clearSearch() {
            $scope.searchKey = "";
        }

        function doLoadMore() {
            // prevent multiple call when the server takes some time to answer
            if (isLoadingMore || vm.isPaginationOver) {
                $q.when(null);
            }
            isLoadingMore = true;
            contactsService.findAll(vm.page).then((response) => {
                vm.page++;
                vm.contacts = (vm.contacts) ? vm.contacts.concat(response.data) : response.data;
                vm.isPaginationOver = response.isPaginationOver;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }).finally(() => isLoadingMore = false);
        }
    }
}