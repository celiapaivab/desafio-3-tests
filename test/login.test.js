const request = require('supertest')
const { expect, assert } = require('chai')
const { obterToken } = require('../helper/autenticacao')
const postLogin = require('../fixtures/postLogin.json')
require('dotenv').config()

describe('Login', () => {
    let token
    beforeEach(async () => {
        token = await obterToken("Ana", "Luiza", ["Araujo"])
    })
    describe('POST/login', () => {
        it('Deve retornar 200 com uso de credenciais válidas', async () => {
            const bodyLogin = { ...postLogin }

            const resposta = await request(process.env.BASE_URL)
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyLogin)

            expect(resposta.status).to.be.equal(200)
        })

        it('Deve retornar: user, token na resposta', async () => {
            const bodyLogin = { ...postLogin }

            const resposta = await request(process.env.BASE_URL)
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyLogin)

            expect(resposta.body).to.have.property('user')
            expect(resposta.body).to.have.property('token')
        })

        it('Deve retornar um objeto no user com propriedades: username, favorecido, saldo', async () => {
            const bodyLogin = { ...postLogin }

            const resposta = await request(process.env.BASE_URL)
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyLogin)

            expect(resposta.body.user).to.have.property('username')
            expect(resposta.body.user).to.have.property('favorecidos')
            expect(resposta.body.user).to.have.property('saldo')
        })

        it('Deve retornar na resposta, o tipo correto de cada elemento', async () => {
            const bodyLogin = { ...postLogin }

            const resposta = await request(process.env.BASE_URL)
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyLogin)

            assert.typeOf(resposta.body.user.saldo, 'number')
            expect(resposta.body.user.username).to.be.a('string')
            expect(resposta.body.token).to.be.a('string')
            expect(resposta.body.user).to.be.a('object')
            resposta.body.user.favorecidos.forEach(fav => {
                expect(fav).to.be.a('string')
            })
        })
    }
    )
})
