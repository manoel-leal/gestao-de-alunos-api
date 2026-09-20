import { post } from './api.js'
import 'dotenv/config'

export async function postAluno(token, requestBody){
    return await post('/api/admin/alunos', token, requestBody)    
}

export async function postDisciplina(token, requestBody){
    return await post('/api/admin/disciplinas', token, requestBody)    
}

export async function postMatricula(idDisciplina, token, requestBody){
    return await post(`/api/admin/disciplinas/${idDisciplina}/matriculas`, token, requestBody)    
}

export async function postTrabalho(idAluno, token, requestBody){
    return await post(`/api/alunos/${idAluno}/trabalhos`, token, requestBody)
}