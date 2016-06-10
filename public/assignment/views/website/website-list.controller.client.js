(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(
                    function(response){
                        vm.websites = response.data;
                    },
                    function (error) {
                        vm.error = "Unable to find website for user";
                    });
        }
        init();
    }
})();