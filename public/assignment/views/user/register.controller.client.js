(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {
        var vm = this;
        vm.createUser = createUser;
        vm.register = register;

        function register(newUser){
            if(newUser)
                if(newUser.username && newUser.password && newUser.repassword)
                UserService
                    .findUserByUsername(newUser.username)
                    .then(function (response) {
                        var user = response.data;
                        if (user) {
                            vm.error = "User already exists";
                        } else if (newUser.password != newUser.repassword) {
                            vm.error = "Password Mismatch";
                        }
                        else {
                            UserService
                                .register(newUser)
                                .then(
                                    function (response) {
                                        var user = response.data;
                                        $rootScope.currentUser = user;
                                        $location.url("/user/" + user._id);
                                    },
                                    function (error) {
                                        vm.error = "Unable to create user";
                                    });
                        }
                    });
        }

        function createUser(newUser) {
            if(newUser)
                if(newUser.username && newUser.password && newUser.repassword)
                    UserService
                        .findUserByUsername(newUser.username)
                        .then(function (response) {
                            var user = response.data;
                            if (user){
                                vm.error = "User already exists";
                            } else if(newUser.password != newUser.repassword) {
                                vm.error = "Password Mismatch";
                            }
                            else
                            {
                                UserService
                                    .createUser(newUser)
                                    .then(
                                        function (response) {
                                            var user = response.data;
                                            if (user) {
                                                $location.url("/user/" + user._id);
                                            }
                                        },
                                        function (error) {
                                            vm.error = "Unable to create user";
                                        });
                            }
                        });
                else {
                    if (!newUser.username)
                        vm.error = "Please enter username";
                    if (!newUser.password)
                        vm.error = "Please enter password";
                    if (!newUser.repassword)
                        vm.error = "Please verify password";
                }
            else
                vm.error = "All fields are mandatory";

        }
    }

})();