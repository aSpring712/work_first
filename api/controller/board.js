const db = require('../db');

module.exports = {
    // 게시글 작성
    async insert(req, res) {
        const content = JSON.parse(req.body.content)
        const file = req.files

        // 작성자 임시 지정
        let writer = 'aSpring';
        // let date = new Date();

        let sql = `
            INSERT INTO boards (writer, content, regdate) VALUES (?, ?, ?)
            `;

        let params = [writer, content, new Date()]

        let result = await db.query({ sql, params })

        if (result) {
            res.send({ result: "OK" })
        } else {
            res.send({ result: "FAIL" })
        }

        // 게시글 번호
        let id = result.rows.insertId

        // 이미지 존재 시 이미지는 따로 테이블에 저장
        if (file.length > 0) {
            console.log('이미지 존재');
            for (var i = 0; i < file.length; i++) {
                let file_name = file[i].filename // 파일 이름
                console.log(file_name + '저장 : ' + i);
                let sql = 'INSERT INTO files (b_id, file_name) VALUES (?, ?)'
                let params = [id, file_name]
                await db.query({ sql, params })
            }
        }
    },

    // 게시글 목록
    async list(req, res) {
        let sql = `
            SELECT b.id, b.content, b.regdate, b.writer, group_concat(f.file_name) AS file_name FROM boards AS b 
                LEFT JOIN files AS f 
                ON b.id = f.b_id 
                group by b.id
                ORDER BY b.id DESC`;
        let result = await db.query({ sql })

        console.log("-----result-----------")
        console.log(result)
        console.log("------result.row----------")
        console.log(result.rows)
        console.log("------result.rows[0]----------")
        console.log(result.rows[0])

        // if (result.rows > 0) {
        //     let imgs = result.rows.imgs;
        //     let imgArr = imgs.split(',')
        //     console.log(imgArr)
        // }

        res.send({ boards: result.rows })
    },

    // 게시글 상세 -> 게시글 1개만 보기
    async detail(req, res) {
        // console.log(req.params.id);
        let sql = `
            SELECT 
                b.writer, b.id, b.content, b.regdate, GROUP_CONCAT(f.file_name) AS file_name
            FROM 
                boards AS b 
            LEFT JOIN 
                files AS f ON b.id = f.b_id
            WHERE 
                b.id = ?
            GROUP BY 
                b.id;
            `;
        let params = [req.params.id]
        let result = await db.query({ sql, params })
        for (let i = 0; i < result.rows.length; i++) {
            console.log("파일이름 : " + result.rows[i].file_name)
        }

        res.send({ board: result.rows })

    },

    // 게시글 삭제
    async delete(req, res) {
        let id = req.params.id
        let sql = `DELETE FROM boards WHERE id = ?`;
        let params = [id]
        let result = await db.query({ sql, params })
        if (result) {
            res.send({ result: "OK" })
        } else {
            res.send({ result: "FAIL" })
        }
    },

    // 게시글 수정
    async update(req, res) {
        let sql = 'UPDATE boards SET content = ? where id = ?';
        let params = [req.body.content, req.body.id]
        let result = await db.query({ sql, params })
        if (result) {
            res.send({ result: "OK" })
        } else {
            res.send({ result: "FAIL" })
        }
    },

    // 이미지 업로드 -> uploads
    async uploadImages(req, res) {
        console.log(req.files)
        const image_url = '';

        if (req.files.length != 0) {
            image_url = "uploads/" + req.files[0].key;
        }

        if (result) {
            res.json(req.files.map(v => v.filename));
        } else {
            res.send({ result: "FAIL" });
        }
    },
}