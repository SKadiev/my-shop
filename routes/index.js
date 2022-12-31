const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
   res.render('pages/index', { title: 'Index page' });
});

module.exports = router;