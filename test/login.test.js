import request from 'supertest'
import app from '../src/app.js'
import { expect } from 'chai'
import * as sinon from 'sinon'
import authService from '../src/services/auth.service.js'

describe('Login', () => {
    it('deve retornar 200 quando o usuário e senha forem corretos', async () => {
        const loginResposta = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({ 'email': 'admin@escola.com', 'senha': 'admin123' })
        
        expect(loginResposta.status).to.equal(200)
    });

    it('não deve logar com senha inválida', async () => {
        const loginResposta = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({ 'email': 'admin@escola.com', 'senha': 'admin1233' })
        
        expect(loginResposta.status).to.equal(401);
        expect(loginResposta.body.error).to.equal("E-mail ou senha inválidos.")
    });

    it('não deve logar sem e-mail preenchido', async () => {
        const loginResposta = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({ 'email': '', 'senha': 'admin1233' })
        
        expect(loginResposta.status).to.equal(400);
        expect(loginResposta.body.error).to.equal("Os campos \"email\" e \"senha\" são obrigatórios.")
    });

    it('deve retornar 500 quando a conexão com o banco de dados é perdida', async () => {

        const authServiceMock = sinon.stub(authService, 'login')
        authServiceMock.throws(new Error('Erro no banco de dados!'))

        const loginResposta = await request(app)
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({ 'email': 'admin@escola.com', 'senha': 'admin123' })
            
        expect(loginResposta.status).to.equal(500)

        sinon.restore()
    });
});
