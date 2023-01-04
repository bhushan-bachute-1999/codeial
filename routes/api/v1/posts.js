const express = require('express');
const router = express.Router();
const passport = require('passport');
const postApi = require('../../../controllers/api/v1/post_api');

router.get('/', postApi.index);
router.delete('/', passport.authenticate('jwt', {session: false}), postApi.deletePost);

module.exports = router;