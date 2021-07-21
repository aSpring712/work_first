var express = require('express');
var router = express.Router();
const boardController = require('../controller/board');

router.post('/insert', boardController.insert); // 게시글 작성
router.get('/', boardController.list); // 전체 조회
// router.delete('/:id', boardController.delete); // 게시글 삭제
// router.get('/:id', boardController.detail); // 해당 게시글만 보기
module.exports = router;