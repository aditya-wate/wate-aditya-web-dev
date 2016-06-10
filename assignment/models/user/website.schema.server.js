module.exports = function() {
    var mongoose = require("mongoose");

    var Website = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref: "User"},
        name: String,
        description: String,
        pages: {type: Array, "default": []},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.website"});

    return Website;
};