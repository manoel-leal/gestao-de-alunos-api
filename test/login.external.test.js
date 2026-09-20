import request from 'supertest'
import { expect } from 'chai'

describe('Login externo', () => {
    it('Deve retornar 200 quando o usuário e senha forem corretos', async () => {
        const loginResposta = await request('http://localhost:3000')
            .post('/api/auth/login')
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@escola.com',
                senha: 'admin123'
            })
        
        expect(loginResposta.status).to.equal(200)
    })

    
})