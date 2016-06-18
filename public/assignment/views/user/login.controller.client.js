(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            if(user)
                if(user.username && user.password)
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
    }
})();