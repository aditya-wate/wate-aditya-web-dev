(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(newUser) {
            var user = UserService.findUserByUsername(newUser.username);
            
            if(user){
                vm.error = "User already exists by this Username";
            } else if(newUser.password != newUser.repassword) {
                vm.error = "Password Mismatch";
            }else
            {
                var newUser = UserService.createUser(newUser);
                if (newUser) {
                    $location.url("/login");
                } else {
                    vm.error = "Unable to create user";
                }
            }
        }
    }

})();