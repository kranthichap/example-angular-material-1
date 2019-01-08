var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var mysql = require('mysql');

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'neo@1234',
    database: 'angular_app'
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// var url = require('url');
// var querystring = require('querystring');

app.get('/', function (req, res) {
    connection.query("select * from user", function (err, rows) {
        if (err) {
            return res.json({ "status": 400, "message": "Error executing MySQL query." });
        } else {
            //console.log(rows);
            return res.json({ "status": 200, "data": rows });
        }
    });

});

app.get('/checkemail', function (req, res) {
    console.log(req.query.email);
    connection.query('SELECT * FROM user WHERE email = ?', req.query.email, function (err, result) {
        if (err) {
            console.log(err);
            return res.json({ "status": 400, "message": "Error executing MySQL query." });
        } else {
            if (result.length == 0) {
                return res.json({ "status": 200, "message": false });
            } else {
                return res.json({ "status": 200, "message": true });
            }
        }
    });
});

app.post('/adduser', function (req, res) {
    console.log(req.body);

    var post = { first_name: req.body.firstName, last_name: req.body.lastName, email: req.body.email, password: req.body.password, gender: req.body.gender, dob: req.body.dob, isMarried: req.body.isMarried, isTAccepted: req.body.isTCAccepted };

    connection.query('INSERT INTO user SET ?', post, function (err) {
        // if (err) throw err;
        if (err) {
            console.log("record not inserted");
            return res.json({ "status": 400, "message": "Error executing MySQL query." });
        } else {
            console.log("record inserted");
            return res.json({ "status": 200, "message": "user has been created." });
        }

    });
});

app.post('/login', function (req, res) {
    console.log(req.body);
    // set login status
    connection.query('UPDATE user SET isLoggedIn = ? WHERE email = ?', [req.body.isLoggedIn, req.body.email], function (err) {
        // if (err) throw err;
        if (err) {
            //console.log("Logged in status updated");
            return res.json({ "status": 404, "message": false, "data": "user not available" });
        } else {
            console.log("Logged in status not updated");
            //return res.json({ "status": 200, "message": true, "data":"user login status updated" });
        }

    });

    connection.query('SELECT * FROM user WHERE email = ? AND password = ?', [req.body.email, req.body.password], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            if (result.length == 0) {
                return res.json({ "status": 404, "message": false, "data": result });
            } else {
                return res.json({ "status": 200, "message": true, "data": result });
            }
        }
    })
});

app.get('/logout', function (req, res) {
    console.log("logout");
    console.log(req.query.id);

    connection.query('UPDATE user SET isLoggedIn = ? WHERE id = ?',
        [false, req.query.id], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                return res.json({ "status": 200, "message": true, "data": "Your account has been logged out successfully." });
            }
        })
});

app.listen(3000, console.log.call(console, 'Server listening at port 3000.'));