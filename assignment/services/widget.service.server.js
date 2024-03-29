module.exports = function(app, models) {

    var widgetModel = models.widgetModel;
    var pageModel = models.pageModel;

    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/page/:pageId/widget", updateWidgetOrder);

    function createWidget(req, res){
        var pageId = req.params.pageId;
        var widget = req.body;

        widgetModel
            .createWidget(pageId, widget)
            .then(
                function(widget) {
                    pageModel
                        .findPageById(pageId)
                        .update({$pushAll: {widgets: [widget._id]}})
                        .then(
                            function(stat) {
                                console.log("WidgetService: {pageUpdateStatus:"+JSON.stringify(stat)+"}");
                            },
                            function(error) {
                                console.log("WidgetService: {pageUpdateStatus:"+JSON.stringify(error)+"}");
                            }
                        );
                    res.json(widget);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllWidgetsForPage(req, res){
        var pageId = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets) {
                    res.json(widgets);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findWidgetById(req, res){
        var widgetId = req.params.widgetId;

        widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget) {
                    res.json(widget);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateWidget(req, res){
        var id = req.params.widgetId;
        var widget = req.body;

        widgetModel
            .updateWidget(id, widget)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deleteWidget(req, res){
        var id = req.params.widgetId;

        widgetModel
            .deleteWidget(id)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function uploadImage(req, res) {

        var pageId = req.body.pageId;
        var websiteId = req.body.websiteId;
        var userId = req.body.userId;

        var widgetId      = req.body.widgetId;
        // var width         = req.body.width;
        var myFile        = req.file;



        if(myFile){
            var originalname  = myFile.originalname; // file name on user's computer
            var filename      = myFile.filename;     // new file name in upload folder
            var path          = myFile.path;         // full path of uploaded file
            var destination   = myFile.destination;  // folder where file is saved to
            var size          = myFile.size;
            var mimetype      = myFile.mimetype;

            var widget = {
                width: req.body.width,
                url : "/uploads/"+filename
            };

            widgetModel
                .updateWidget(widgetId, widget)
                .then(
                    function(stats) {
                        res.send(200);
                    },
                    function(error) {
                        res.statusCode(404).send(error);
                    }
                );

            res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        } else{
            res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        }
    }
    
    function updateWidgetOrder(req,res) {
        var pageId = req.params.pageId;
        var start = parseInt(req.query.start);
        var end = parseInt(req.query.end);
        if (start!=null && end!=null) {
            widgetModel
                .reorderWidget(pageId, start, end)
                .then(
                    function (stat) {
                        return res.json(200);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        }
        res.send(200);
    }
};