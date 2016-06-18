var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, models) {

    var userModel = models.userModel;

    app.post  ('/api/login', passport.authenticate('wam'), login);
    app.post('/api/logout', logout);
    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use('wam',new LocalStrategy(localStrategy));

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user.username === username && user.password === password) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }
    
    function deleteUser(req, res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;

        userModel
            .updateUser(id, newUser)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );

    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.statusCode(400).send(error);
                }
            );

    }

    function findUserById(req, res) {
        var id = req.params.userId;

        userModel
            .findUserById(id)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function getUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        //depending on the query params choose functions
        if(username && password) {
            findUserByCredentials(username, password, res);
        } else if(username) {
            findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function(err) {
                    res.statusCode(404).send(err);
                }
            );
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function(err) {
                    res.statusCode(404).send(err);
                }
            );
    }
};
