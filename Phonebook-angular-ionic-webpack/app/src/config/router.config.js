export default function ($stateProvider, $urlRouterProvider) {
    'ngInject';
    return $stateProvider
        .decorator('views', (state, parent) => {
            let views = parent(state);
            if (state.name === 'root') {
                views['menu@root'] = {
                    template: require("../menu/menu.html")
                };
            }
            return views;
        })
        .state('root', {
            abstract: true,
            views: {
                '@': {
                    template: `<ion-side-menus enable-menu-with-back-views="true">
                    <ion-side-menu-content>
                        <ion-nav-bar class="bar-positive">
                            <ion-nav-back-button></ion-nav-back-button>
                            <ion-nav-buttons side="left">
                                <button menu-toggle="left" class="button button-clear">
                                    <i class="icon ion-navicon-round"></i>
                                </button>
                            </ion-nav-buttons>
                        </ion-nav-bar>
                        <ion-nav-view name="content"></ion-nav-view>
                    </ion-side-menu-content>
                    <ion-side-menu side="left" ui-view="menu"></ion-side-menu>
                </ion-side-menus>`
                }
            }
        })
        .state('root.contact-index', {
            url: "/contacts",
            views: {
                'content@root': {
                    template: require("../contact/contact-index/contact-index.html"),
                    controller: "ContactIndexController as contactIndexCtrl"
                }
            }
        })
        .state('root.contact-new', {
            url: "/contact/add",
            views: {
                'content@root': {
                    template: require("../contact/contact-new/contact-new.html"),
                    controller: "ContactNewController as contactNewCtrl"
                }
            }
        })
        .state('root.contact-detail', {
            url: "/contact/:id",
            views: {
                'content@root': {
                    template: require("../contact/contact-detail/contact-detail.html"),
                    controller: "ContactDetailController as contactDetailCtrl"
                }
            }
        })
        .state('root.contact-edit', {
            url: "/contact/edit/:id",
            views: {
                'content@root': {
                    template: require("../contact/contact-edit/contact-edit.html"),
                    controller: "ContactEditController as contactEditCtrl"
                }
            }
        })
        .state('root.contact-reports', {
            url: "/contact/:id/reports",
            views: {
                'content@root': {
                    template: require("../contact/contact-reports/contact-reports.html"),
                    controller: "ContactReportsController as contactReportsCtrl"
                }
            }
        }),
        $urlRouterProvider.otherwise("/contacts");
}
