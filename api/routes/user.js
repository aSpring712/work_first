var express = require('express');
var router = express.Router();
const userController = require('../controller/user');

router.post('/join', userController.join)
router.get("/login", userController.login)
router.get("/logout", userController.logout);
module.exports = router;

/**
 * HTTMP method
 * GET 가져오기
 * POST 생성
 * PUT 전체 수정
 * PATCH 부분 수정
 * ELETE 삭제
 * OPTIONS 찔러보기?
 */