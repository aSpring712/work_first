const express = require('express');
const multer = require('multer');
const path = require('path'); // mode에서 기본으로 제공
const router = express.Router();
const boardController = require('../controller/board');

const upload = multer({
    storage: multer.diskStorage({ // 이미지를 어떻게 저장할 건지
        destination(req, file, done) {
            done(null, 'static/uploads');
        },
        filename(req, file, done) {
            console.log(file)
            const ext = path.extname(file.originalname); // 확장자
            const basename = path.basename(file.originalname, ext); // aa.png -> basename = aa, ext = .png
            done(null, basename + Date.now() + ext); // 같은 이름으로 이미지 업로드 시 덮어씌워지므로 업로드한 시간을 db에 저장
        },
    }),
    limit: { fileSize: 20 * 1024 * 1024 }, // 20MB로 제한
});

router.post('/insert', upload.array('files'), boardController.insert); // 게시글 작성
router.get('/', boardController.list); // 전체 조회
router.delete('/:id', boardController.delete); // 게시글 삭제
router.get('/:id', boardController.detail); // 게시글 상세보기
router.put('/', boardController.update); // 게시글 수정
router.post('/uploadImages', upload.array('files'), boardController.uploadImages); // 이미지 업로드

module.exports = router;