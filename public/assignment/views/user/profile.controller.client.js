(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.closeAlert = closeAlert;

        var id = $routeParams.id;

        function init() {
            UserService
                .findUserById(id)
                .then(
                    function(response){
                        vm.user = response.data;
                    },
                    function (error) {
                        vm.error = "Error getting user for userId:"+id;
                    });
        }
        init();


        function updateUser(newUser) {
            UserService
                .updateUser(id, newUser)
                .then(
                    function(response) {
                        vm.success = "Updated successfully";
                    },
                    function(error) {
                        vm.error = "Unable to update user:" + id;
                    }
                );
        }

        function unregister() {
            UserService
                .deleteUser(id)
                .then(
                    function(){
                        $location.url("/login");
                    },
                    function() {
                        vm.error = "Unable to remove user"
                    }
                );
        }

        function closeAlert() {
            vm.error = null;
            vm.success = null;
        }
    }

})();