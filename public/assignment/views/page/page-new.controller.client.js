(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.createPage = createPage;

        function createPage(page) {
            vm.newPageForm.$submitted=true;
            if(page.name)
                PageService
                    .createPage(vm.websiteId, page)
                    .then(function (response) {
                            var newPage = response.data;
                            if (newPage._id) {
                                $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                            }
                        },
                        function (error) {
                            vm.error = "Unable to create page";
                        });
        }
    }
})();