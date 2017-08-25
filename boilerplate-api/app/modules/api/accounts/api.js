var router = require('express').Router();

var db = require('../../../lib/database')();

// fetch list of users
router.get('/', (req, res) => {
    db.query('SELECT * FROM accounts', (err, results, fields) => {
        if (err) return res.status(400).send({ error: err });
        res.status(200).send(results);
    });
});

// register
router.post('/', (req, res) => {
    db.query('INSERT INTO accounts (`username`, `password`) VALUES (?, ?)', [req.body.username, req.body.password], (err, results, fields) => {
        if (err) return res.status(400).send({ error: err.toString() });
        res.status(200).send({ message: 'Successfully created new account!' });
    });
});

module.exports = router;