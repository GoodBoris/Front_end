export default function() {
    return {
        restrict: 'E',
        scope: {},
        template: require("./search.html"),
        controller: "ContactSearchController as contactSearchCtrl"
    }
}