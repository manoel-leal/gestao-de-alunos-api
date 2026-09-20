export function novaDisciplina(){
        const randonTimeStamp = Date.now()

    return {
        nome: "Matemática",
        codigo: `MAT${randonTimeStamp}`,
        cargaHoraria: 60
    }
}