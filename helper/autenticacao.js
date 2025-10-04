const request = require('supertest')

const obterToken = async (username, password, favorecidos) => {
    const respostaLogin = await request('http://localhost:3000')
        .post('/users/register')
        .set('Content-Type', 'application/json')
        .send({
            "username": username,
            "password": password,
            "favorecidos": favorecidos
        })
    return respostaLogin.body.token 
}

module.exports = {
    obterToken
}