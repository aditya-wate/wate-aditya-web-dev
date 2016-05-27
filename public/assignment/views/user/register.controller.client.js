(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(newUser) {
            var newUser = UserService.createUser(newUser);
            if(newUser) {
                $location.url("/login");
            } else {
                vm.error = "Unable to create user";
            }
        }
    }

})();