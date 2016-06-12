module.exports = function(app, models) {

    var pageModel = models.pageModel;
    var websiteModel = models.websiteModel;

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res){
        var websiteId = req.params.websiteId;
        var page = req.body;
        var newPage = {
            name: page.name,
            title: page.title,
            description: page.description,
            _website: websiteId
        };

        pageModel
            .createPage(websiteId, newPage)
            .then(
                function(page) {
                    websiteModel
                        .findWebsiteById(websiteId)
                        .update({$pushAll: {pages: [page._id]}})
                        .then(
                            function(stat) {
                                console.log("PageService: {websiteUpdateStatus:"+JSON.stringify(stat)+"}");
                            },
                            function(error) {
                                console.log("PageService: {websiteUpdateStatus:"+JSON.stringify(error)+"}");
                            }
                        );
                    res.json(page);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllPagesForWebsite(req, res){
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function(pages) {
                    res.json(pages);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findPageById(req, res){
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(
                function(page) {
                    res.json(page);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updatePage(req, res){
        var id = req.params.pageId;
        var page = req.body;

        pageModel
            .updatePage(id, page)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deletePage(req, res){
        var id = req.params.pageId;

        pageModel
            .deletePage(id)
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