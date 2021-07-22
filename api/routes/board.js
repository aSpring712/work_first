var express = require('express');
var router = express.Router();
const boardController = require('../controller/board');

const multer = require('multer');

var multerUpload = multer({ dest: 'static/imgs/' })

router.post('/insert', boardController.insert); // 게시글 작성
router.get('/', boardController.list); // 전체 조회
router.delete('/:id', boardController.delete); // 게시글 삭제
router.get('/:id', boardController.detail); // 해당 게시글만 보기
router.put('/', boardController.update); // 게시글 수정

module.exports = router;