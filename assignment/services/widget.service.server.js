module.exports = function(app) {

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p class="first-text">Investing in undersea internet cables has been a <a href="http://gizmodo.com/why-more-technology-giants-are-paying-to-lay-their-own-1703904291">big part of data strategy </a>plans for tech giants in recent years. Now Microsoft and Facebook are teaming up for the mother of all cables: A 4,100-mile monster that can move 160 Tbps, which will make it the highest-capacity cable on Earth. The cable even has a name, MAREA, and it will break ground (break waves?) later this year. Hopefully it can handle all your selfies.</p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res){
        var pageId = req.params.pageId;
        var widget = req.body;
        var newWidget = {
            _id: (new Date()).getTime()+"",
            widgetType: widget.widgetType,
            pageId: pageId
        };
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function findAllWidgetsForPage(req, res){
        var pageId = req.params.pageId;
        var resultSet = [];
        for(var i in widgets) {
            if(widgets[i].pageId === pageId) {
                resultSet.push(widgets[i]);
            }
        }
        res.json(resultSet);
    }

    function findWidgetById(req, res){
        var widgetId = req.params.widgetId;
        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                res.json(widgets[i]);
                return;
            }
        }
        res.json({});
    }

    function updateWidget(req, res){
        var id = req.params.widgetId;
        var widget = req.body;

        for(var i in widgets) {
            if(widgets[i]._id === id) {
                widgets[i].widgetType = widget.widgetType;
                widgets[i].name = widget.name;
                widgets[i].text = widget.text;
                widgets[i].size = widget.size;
                widgets[i].url = widget.url;
                widgets[i].width = widget.width;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function deleteWidget(req, res){
        var id = req.params.widgetId;
        for(var i in widgets) {
            if (widgets[i]._id === id) {
                widgets.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function uploadImage(req, res) {

        var pageId = req.body.pageId;
        var websiteId = req.body.websiteId;
        var userId = req.body.userId;

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        
        if(myFile){
            var originalname  = myFile.originalname; // file name on user's computer
            var filename      = myFile.filename;     // new file name in upload folder
            var path          = myFile.path;         // full path of uploaded file
            var destination   = myFile.destination;  // folder where file is saved to
            var size          = myFile.size;
            var mimetype      = myFile.mimetype;

            for(var i in widgets) {
                if(widgets[i]._id === widgetId) {
                    widgets[i].url = "/uploads/"+filename;
                    widgets[i].width = width;
                }
            }

            res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        } else{
            res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
        }
    }
};