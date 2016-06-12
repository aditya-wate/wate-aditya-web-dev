(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.createWebsite = createWebsite;

        function createWebsite(name, description) {
            if(name)
                WebsiteService
                    .createWebsite(vm.userId, name, description)
                    .then(
                        function (response) {
                            var newWebsite = response.data;
                            if (newWebsite._id) {
                                $location.url("/user/" +vm.userId+"/website");
                            }
                        },
                        function (error) {
                            vm.error = "Unable to create website";
                        });
            else
                vm.error = "Website name is required";
        }
    }
})();