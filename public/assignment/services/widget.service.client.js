(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function createWidget(pageId, widgetType) {
            var url = "/api/page/"+pageId+"/widget";
            var newWidget = {
                widgetType: widgetType,
                pageId: pageId
            };
            return $http.post(url, newWidget);
        }

        function findWidgetsByPageId(pageId) {
            var resultSet = [];
            for(var i in widgets) {
                if(widgets[i].pageId === pageId) {
                    resultSet.push(widgets[i]);
                }
            }
            return resultSet;
        }

        function findWidgetById(widgetId) {
            var widget;
            for(var i in widgets) {
                if(widgets[i]._id === widgetId) {
                    widget = widgets[i];
                }
            }
            return widget;
        }

        function updateWidget(widgetId, widget) {
            for(var i in widgets) {
                if(widgets[i]._id === widgetId) {
                    widgets[i].widgetType = widget.widgetType;
                    widgets[i].text = widget.text;
                    widgets[i].size = widget.size;
                    widgets[i].url = widget.url;
                    widgets[i].width = widget.width;
                    return true;
                }
            }
            return false;
        }

        function deleteWidget(widgetId) {
            for(var i in widgets) {
                if(widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();