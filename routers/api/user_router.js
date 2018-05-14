const router = require('koa-router')();
const user_controller = require('../../controllers/user_ctrl');

router.get('/getUser', user_controller.getUser);
router.post('/registerUser', user_controller.registerUser);

module.exports = router;