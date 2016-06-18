(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService
                .login(user)
                .then(
                    function(response) {
                        var user = response.data;
                        $rootScope.currentUser = user;
                        $location.url("/user/"+user._id);
                    },
                    function(error){
                        vm.error = "User not found";
                    })
        }

            /*
                    function login(username, password) {
                        // if(username && password)
                        if (username && password) {
                            UserService
                                .findUserByCredentials(username, password)
                                .then(function(response){
                                    var user = response.data;
                                    if(user) {
                                        $location.url("/user/" + user._id);
                                    } else {
                                        vm.error = "User not found";
                                    }
                                });
                            vm.invalidUsername = false;
                            vm.invalidPassword = false;
                        }

                        else{
                            if(!username && password){
                                vm.error = "Please enter username";
                                vm.invalidUsername = true;
                                vm.invalidPassword = false;
                            }
                            else if(!password && username) {
                                vm.error = "Please enter password";
                                vm.invalidPassword = true;
                                vm.invalidUsername = false;
                            }
                            else {
                                vm.error = "Please enter username and password";
                                vm.invalidUsername = true;
                                vm.invalidPassword = true;
                            }
                        }

                    }
                    */
    }
})();