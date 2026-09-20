import { postAluno, postDisciplina, postMatricula, postTrabalho } from './helpers/requests.js'
import { expect } from 'chai'
import { comTokenDeAdmin, getToken} from './helpers/auth.js'
import { novoAluno } from './factories/alunosFactory.js'
import { novaDisciplina } from './factories/disciplinasFactory.js'
import { novaMatricula } from './factories/matriculasFactory.js'
import { novoTrabalho } from './factories/trabalhosFactory.js'

describe('Entregar trabalho como aluno', () => {
    it.only('Deve realizar a entrega de trabalho com sucesso', async () => {

        const token = await comTokenDeAdmin()

        // Arrange
        const aluno = novoAluno()
        const respostaCadastrarAluno = await postAluno(token, aluno)
        expect(respostaCadastrarAluno.status).to.equal(201)

        const disciplina = novaDisciplina()
        const respostaCadastrarDisciplina = await postDisciplina(token, disciplina)
        expect(respostaCadastrarDisciplina.status).to.equal(201)

        const matricula = novaMatricula(respostaCadastrarAluno.body.id)
        const respostaRealizarMatricula = await postMatricula(respostaCadastrarDisciplina.body.id, token, matricula)
        expect(respostaRealizarMatricula.status).to.equal(201)

        const tokenAluno = await getToken(respostaCadastrarAluno.body.email, aluno.senha)

        // Act
        const trabalho = novoTrabalho(respostaCadastrarDisciplina.body.id)
        const respostaEntregarTrabalho = await postTrabalho(respostaCadastrarAluno.body.id, tokenAluno, trabalho)

        // Assert
        expect(respostaEntregarTrabalho.status).to.equal(201)
        expect(respostaEntregarTrabalho.body.alunoId).to.equal(respostaCadastrarAluno.body.id)
        expect(respostaEntregarTrabalho.body.disciplinaId).to.equal(respostaCadastrarDisciplina.body.id)
        expect(respostaEntregarTrabalho.body.status).to.equal('entregue')

    })
})