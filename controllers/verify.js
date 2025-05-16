var express = require ('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require ('./models/db_controller');

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());


module.exports = router;

router.get('/',function(req,res){
    res.render('verify.ejs');
});

router.post('/', function(req, res) {
    var id = req.body.id.trim();
    var token = req.body.token.trim();

    db.matchtoken(id, token, function(err, result) {
        if (err) {
            console.error("DB error:", err);
            return res.status(500).send("Internal server error");
        }

        if (result.length > 0) {
            var email = result[0].email;
            var email_status = "verified";

            db.updateverify(email, email_status, function(err, result1) {
                if (err) {
                    console.error("Update error:", err);
                    return res.status(500).send("Could not update verification");
                }
                return res.redirect('/login');
            });

        } else {
            res.send('Token did not match');
        }
    });
});
