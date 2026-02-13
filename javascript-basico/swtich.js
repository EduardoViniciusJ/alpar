// So testa igualdade
let pais = "usa"

switch(pais){
    case "Brasil":
        console.log("brasileiro");
        break
    case "Japão":
        console.log("japonês")
        break
    case "Estados Unidos":
    case "eua":
    case "usa":
    case "estados da america":
        console.log("Americano")
        break
    default:
        console.log("Não sei a nacionalidade")
}