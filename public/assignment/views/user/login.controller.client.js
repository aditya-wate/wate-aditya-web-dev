(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;


        function login(username, password) {
            if(username && password)
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
            else{
                if(!username && password)
                    vm.error = "Please enter username";
                else
                if(!password && username)
                    vm.error = "Please enter password";
                else
                    vm.error = "Please enter username and password";
            }

        }
    }
})();