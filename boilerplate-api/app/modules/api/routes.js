var router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).send({
        name: 'express-boilerplate-api',
        version: 1.0
    });
});

router.use('/users', require('../admin/users/api'));
router.use('/todos', require('./todos/api'));
router.use('/accounts', require('./accounts/api'));

exports.api = router;