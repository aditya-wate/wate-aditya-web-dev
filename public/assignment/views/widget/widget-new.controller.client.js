(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.createWidget = createWidget;

        function createWidget(widgetType) {
            WidgetService
                .createWidget(vm.pageId, widgetType)
                .then(
                    function(response){
                        var newWidget = response.data;
                        if (newWidget._id) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
                        }
                    },
                    function (error) {
                        vm.error = "Unable to create widget";
                    });

        }
    }
})();