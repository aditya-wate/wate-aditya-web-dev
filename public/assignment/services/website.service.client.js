(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService($http) {
        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;


        function createWebsite(developerId, name, desc) {
            var url = "/api/user/" + developerId +"/website";

            var newWebsite = {
                name: name,
                description: desc,
                developerId: developerId
            };

            return $http.post(url, newWebsite);
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/" + userId +"/website";
            return $http.get(url);
        }

        function findWebsiteById(websiteId){
            var url = "/api/website/"+websiteId;
            return $http.get(url);
        }

        function updateWebsite(websiteId, website){
            var url = "/api/website/"+websiteId;
            return $http.put(url, website);
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.delete(url);
        }
    }
})();