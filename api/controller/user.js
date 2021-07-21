const db = require('../db');
const bcrypt = require('bcrypt');

module.exports = {
    // 회원가입
    async join(req, res) {
        // post -> req.body 로 받음
        // get -> req.query 또는 req.params로 받음

        const { email, password, nickname } = req.body.joinInfo

        //bcryt 작업
        let cryptedPassword = await bcrypt.hash(password, 12);

        let sql = `
            INSERT INTO users (email, password, nick_name) VALUES (?, ?, ?)
        `;

        let params = [email, cryptedPassword, nickname]

        let result = await db.query({ sql, params })
        if (result) {
            res.send({ result: "OK" })
        } else {
            res.send({ result: "FAIL" })
        }
    }
}