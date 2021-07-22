const db = require('../db');

module.exports = {
    // 게시글 작성
    async insert(req, res) {
        const content = req.body.content

        // 작성자 임시 지정
        let writer = 'aSpring';

        let sql = `
            INSERT INTO boards (writer, content) VALUES (?, ?)
            `;

        let params = [writer, content]

        let result = await db.query({ sql, params })

        if (result) {
            res.send({ result: "OK" })
        } else {
            res.send({ result: "FAIL" })
        }
    },

    // 게시글 목록
    async list(req, res) {
        let sql = 'SELECT * FROM boards ORDER BY id DESC';
        let result = await db.query({ sql })
            // console.log(result)
        res.send({ boards: result.rows })
    },

    // 게시글 상세 -> 게시글 1개만 보기
    async detail(req, res) {
        // console.log(req.params.id);
        let sql = `SELECT * FROM boards where id = ?`;
        let params = [req.params.id]
        let result = await db.query({ sql, params })
        console.log(result)
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
    }
}