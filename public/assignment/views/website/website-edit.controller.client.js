(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (response) {
                    vm.website = response.data;
                });
        }
        init();

        function updateWebsite(websiteId, website) {
            if(website.name)
                WebsiteService
                    .updateWebsite(websiteId, website)
                    .then(function (response) {
                            $location.url("/user/"+vm.userId+"/website");
                        },
                        function (error) {
                            vm.error = "Unable to update website";
                        });
            else
                vm.error = "Website name is required";
        }

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .then(function (response) {
                        $location.url("/user/"+vm.userId+"/website");

                    },
                    function (error) {
                        vm.error = "Unable to delete website";
                    });
        }
    }
})();