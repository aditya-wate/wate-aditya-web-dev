(function(){
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/home.html"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:id", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:userId/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }

            })
            .when("/user/:userId/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:userId/website/:websiteId", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:userId/website/:websiteId/page", {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:userId/website/:websiteId/page/new", {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:userId/website/:websiteId/page/:pageId", {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/new", {
                templateUrl: "views/widget/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/flickr", {
                templateUrl: "views/widget/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .otherwise({
                redirectTo: "/login"
            });

        function checkLoggedin($q, $timeout, $http, $location, $rootScope) {
            var deferred = $q.defer();
            $http.get('/api/loggedin').success(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url('/login');
                }
            });
            return deferred.promise;
        };
    }
})();