(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.closeAlert = closeAlert;

        var id = $routeParams.id;

        function init() {
            vm.user = UserService.findUserById(id);
        }
        init();

        function updateUser(newUser) {
            userUpdated = UserService.updateUser(id, newUser);

            if(userUpdated){
                vm.alertType = "Success";
                vm.alert = "Your profile was saved.";
            }
            else{
                vm.alertType = "Failure";
                vm.alert = "Profile was not updated.";
            }
        }

        function closeAlert() {
            vm.alertType = null;
        }
    }

})();