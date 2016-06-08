import 'ionic-sdk/release/js/ionic.bundle';
import 'expose?_!lodash';
import 'ngstorage';
import 'angular-messages';
//import "../../node_modules/ionic-letter-avatar-selector/src/ionic-letter-avatar-selector/ionicLetterAvatarSelector.module.js";

//Import static images
require.context("./img/", true, /^\.\/.*\.jpg/);
// Our modules
import modConfigIonic from './config/ionic.config';
import modConfigRouter from './config/router.config';
import modMenu from './menu/menu.module';
import modLanguage from './language/language.module';
import modContact from './contact/contacts.module';
import modCommon from './common/module';
import contactErrorTemplate from './contact/error-messages.html';


// Style entry point
import './scss/bootstrap';

// Create our prototype module
let mod = angular.module('prototype', [
    'ionic',
    'ui.router',
    modMenu,
    modLanguage,
    modContact,
    modCommon
]);
// ROUTER CONFIG
mod.config(modConfigRouter);
// IONIC CONFIG
mod.config(modConfigIonic);
// Run
mod.run(function($templateCache) {
  $templateCache.put('error-messagesId.html', contactErrorTemplate);
});

export default mod = mod.name;
