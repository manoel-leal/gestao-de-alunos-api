export function novoAluno(){
        const randonTimeStamp = Date.now()
        const username = `a${randonTimeStamp} test`
        const emailUser = `${randonTimeStamp}@test.com.br`

    return {
        nome: username,
        email: emailUser,
        matricula: `${randonTimeStamp}`,
        senha: '123456'
    }
}