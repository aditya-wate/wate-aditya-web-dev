(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, $location, FlickrService, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(
                    function(response){
                        data = response.data.replace("jsonFlickrApi(","");
                        data = data.substring(0,data.length - 1);
                        data = JSON.parse(data);
                        vm.photos = data.photos;
                    },
                    function (error) {
                        vm.error = error;
                    });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (response) {
                    var widget = response.data;
                    widget.url = url;
                    WidgetService
                        .updateWidget(vm.widgetId, widget)
                        .then(
                            function (response) {
                                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
                            },
                            function (error) {
                                vm.error = "Unable to update widget";
                            }
                        );
                });

        }
    }
})();