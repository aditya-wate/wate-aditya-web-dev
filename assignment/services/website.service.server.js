module.exports = function(app, models) {

    var websiteModel = models.websiteModel;
    // var websites = [
    //     { "_id": "123", "name": "Facebook",    "developerId": "456" },
    //     { "_id": "234", "name": "Tweeter",     "developerId": "456" },
    //     { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
    //     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
    //     { "_id": "678", "name": "Checkers",    "developerId": "123" },
    //     { "_id": "789", "name": "Chess",       "developerId": "234" }
    // ];

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
        // websites.push(newWebsite);
        // res.json(newWebsite);
    }

    function findAllWebsitesForUser(req, res){
        var userId = req.params.userId;
        // var result = [];
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
        // for(var w in websites) {
        //     if(websites[w].developerId === userId) {
        //         result.push(websites[w]);
        //     }
        // }
        // res.json(result);
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
        // for(var i in websites) {
        //     if(websites[i]._id === websiteId) {
        //         res.json(websites[i]);
        //         return;
        //     }
        // }
        // res.json({});
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

        // for(var i in websites) {
        //     if(websites[i]._id === id) {
        //         websites[i].name = website.name;
        //         websites[i].description = website.description;
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
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

        // for(var i in websites) {
        //     if (websites[i]._id === id) {
        //         websites.splice(i, 1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }
};