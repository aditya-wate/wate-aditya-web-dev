(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(newUser) {
            UserService
                .findUserByUsername(newUser.username)
                .then(function (response) {
                    var user = response.data;
                    if (user.username){
                        vm.error = "User already exists by this Username";
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

        }
    }

})();