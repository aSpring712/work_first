const db = require('../db');
const bcrypt = require('bcrypt');
const { LayoutPlugin } = require('bootstrap-vue');

module.exports = {
    // 회원가입
    async join(req, res) {
        // post -> req.body 로 받음
        // get -> req.query 또는 req.params로 받음

        const { email, password, nickname } = req.body.joinInfo

        //bcryt 작업
        let cryptedPassword = await bcrypt.hash(password, 12); // salt -> 높일 수록 좋지만 복잡해지기 때문에 느려짐

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
    },

    // 로그인
    async login(req, res) {

        // const email = req.body.email;
        // const password = req.body.password;

        // let sql = `
        //     SELECT * FROM users where email = ? and password = ?
        // `;

        // let params = [email, password]

        // let result = await db.query({ sql, params })
        // if (result) {
        //     res.send({result:"OK"})
        // } else {
        //     res.send({result: "FAIL"})
        // }
    },

    // 로그아웃
    async logout(req, res) {

    },
}