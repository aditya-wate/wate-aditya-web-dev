
module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("User", UserSchema);

    var api = {
        findUserByFacebookId: findUserByFacebookId,
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id': facebookId});
    }
    
    function updateUser(userId, user) {
        delete user._id;
        return User
            .update(
                {
                    _id: userId
                },
                {
                    $set: user
                }
            );
    }

    function deleteUser(userId) {
        return User
            .remove(
                {
                    _id: userId
                }
            );
    }

    function findUserByCredentials(username, password) {
        return User.findOne(
            {
                username: username,
                password: password
            }
        );
    }

    function findUserByUsername(username) {
        return User.findOne(
            {
                username: username
            }
        );
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function createUser(user) {
        return User.create(user);
    }
};