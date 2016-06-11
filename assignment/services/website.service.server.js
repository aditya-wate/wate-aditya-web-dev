module.exports = function(app, models) {

    var websiteModel = models.websiteModel;

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res){
        var userId = req.params.userId;
        var website = req.body;
        var newWebsite = {
            name: website.name,
            description: website.description,
            _user: userId
        };

        websiteModel
            .createWebsiteForUser(userId, newWebsite)
            .then(
                function(website) {
                    res.json(website);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllWebsitesForUser(req, res){
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function(websites) {
                    res.json(websites);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findWebsiteById(req, res){
        var websiteId = req.params.websiteId;

        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                    res.json(website);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateWebsite(req, res){
        var id = req.params.websiteId;
        var website = req.body;

        websiteModel
            .updateWebsite(id, website)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );

    }

    function deleteWebsite(req, res){
        var id = req.params.websiteId;

        websiteModel
            .deleteWebsite(id)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
        
    }
};