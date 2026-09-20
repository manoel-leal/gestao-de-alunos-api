import { api } from './helpers/api.js'
import { expect } from 'chai'
import { comTokenDeAdmin} from './helpers/auth.js'
import { novoAluno } from './factories/alunosFactory.js'

describe('Alunos External', () => {

    it('Deve cadastrar um aluno quando ele informa dados válidos', async () => {

        const aluno = novoAluno()

        const cadastrarRespostaAluno = await api()
                .post('/api/admin/alunos')
                .set('Content-Type', 'application/json')
                .set('Authorization', await comTokenDeAdmin())
                .send(aluno)

        expect(cadastrarRespostaAluno.status).to.equal(201)
        expect(cadastrarRespostaAluno.body.nome).to.equal(aluno.nome)
        expect(cadastrarRespostaAluno.body.email).to.equal(aluno.email)
        expect(cadastrarRespostaAluno.body.matricula).to.equal(aluno.matricula)    
    })

    it('Deve negar o cadastro de um aluno quando ele já existe', async () => {

        const cadastrarRespostaAluno = await api()
                .post('/api/admin/alunos')
                .set('Content-Type', 'application/json')
                .set('Authorization', await comTokenDeAdmin())
                .send({
                    nome: 'Ana Souza', 
                    email: 'ana.souza@example.com', 
                    matricula: '2024001', 
                    senha: '123456'
                })

        expect(cadastrarRespostaAluno.status).to.equal(409)
        expect(cadastrarRespostaAluno.body.error).to.equal('Já existe um aluno cadastrado com essa matrícula ou e-mail.')
    })

    it('Deve recuperar um aluno cadastrado com sucesso', async () => {

        const recuperarAlunoCadastradoResposta = await api()
                .get('/api/admin/alunos/aluno-ana-souza')
                .set('Content-Type', 'application/json')
                .set('Authorization', await comTokenDeAdmin())

        expect(recuperarAlunoCadastradoResposta.status).to.equal(200)          
    })

    it('Deve alterar aluno com sucesso', async () => {

        const cadastrarRespostaAluno = await api()
                .post('/api/admin/alunos')
                .set('Content-Type', 'application/json')
                .set('Authorization', await comTokenDeAdmin())
                .send(novoAluno())

        expect(cadastrarRespostaAluno.status).to.equal(201)

        const aluno = novoAluno()
        const alterarAlunoResposta = await api()
                .put(`/api/admin/alunos/${cadastrarRespostaAluno.body.id}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', await comTokenDeAdmin())
                .send(aluno)

        expect(alterarAlunoResposta.status).to.equal(200)
        expect(alterarAlunoResposta.body.nome).to.equal(aluno.nome)
        expect(alterarAlunoResposta.body.email).to.equal(aluno.email)
        expect(alterarAlunoResposta.body.matricula).to.equal(aluno.matricula)  
    })
})