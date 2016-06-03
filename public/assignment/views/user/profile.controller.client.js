(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.closeAlert = closeAlert;

        var id = $routeParams.id;

        function init() {
            UserService
                .findUserById(id)
                .then(function(response){
                    vm.user = response.data;
                });
        }
        init();

        // function updateUser(newUser) {
        //     userUpdated = UserService.updateUser(id, newUser);
        //
        //     if(userUpdated){
        //         vm.alertType = "Success";
        //         vm.alert = "Your profile was saved.";
        //     }
        //     else{
        //         vm.alertType = "Failure";
        //         vm.alert = "Profile was not updated.";
        //     }
        // }

        function updateUser(newUser) {
            UserService
                .updateUser(id, newUser)
                .then(
                    function(response) {
                        vm.success = "Updated successfully";
                    },
                    function(error) {
                        vm.error = "Unable to update user"
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