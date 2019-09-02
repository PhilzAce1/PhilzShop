const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('shop/index');
})

module.exports = router;