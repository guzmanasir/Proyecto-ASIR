/**
 * Created by guzman on 4/02/17.
 */

/**
 * Core librería
 */
angular.module("proyecto", [
    'ui.router',
    'ngMaterial',
    'satellizer'
]).config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('grey')
        .accentPalette('blue');
});