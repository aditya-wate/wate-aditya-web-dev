
module.exports = function() {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function updateWebsite(websiteId, website) {
        delete website._id;
        return Website
            .update(
                {
                    _id: websiteId
                },
                {
                    $set: website
                }
            );
    }

    function deleteWebsite(websiteId) {
        return Website
            .remove(
                {
                    _id: websiteId
                }
            );
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({"_user": userId});
    }

    function findWebsiteById(websiteId) {
        return Website.findById(websiteId);
    }

    function createWebsiteForUser(userId, website) {
        return Website.create(website);
    }
};