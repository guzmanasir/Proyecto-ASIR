/**
 * Created by guzman on 4/02/17.
 */

/**
 * Core librería
 */
angular.module("proyecto", [
    'ui.router',
    'ngMaterial',
    'satellizer',
    'youtube-embed',
    'ngLodash',
    'ngYoutubeEmbed',
    'ui.bootstrap',
    'tangcloud'
]).config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('grey')
        .accentPalette('blue');
});