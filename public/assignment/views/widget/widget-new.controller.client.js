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
            var newWidget = WidgetService.createWidget(vm.pageId, widgetType);
            if(newWidget) {
                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget._id);
            } else {
                vm.error = "Unable to create widget";
            }
        }
    }
})();