(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.reorderWidget = reorderWidget;
        vm.getSafeHtml = getSafeHtml;
        vm.getSafeUrl = getSafeUrl;

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(
                    function (response) {
                        vm.widgets = response.data;
                    },
                    function (error) {
                        vm.error = "Unable to find widgets for page:"+ vm.pageId;
                    });
            // $(".container")
            //     .sortable({axis: "y"});
        }
        init();

        function reorderWidget(start,end){
            WidgetService
                .reorderWidget(vm.pageId, start, end)
                .then(init);
        }

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);

        }


    }
})();