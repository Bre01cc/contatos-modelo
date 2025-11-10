
export const lerContatos = async () => {

    const url = "https://bakcend-fecaf-render.onrender.com/contatos"
    const response = await fetch(url)
    const data = await response.json()
    return data
}

 export const criarContato = async (contato) => {
    const url = "https://bakcend-fecaf-render.onrender.com/contatos"
    const options = {

        method: "POST",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify(contato)
    }
    const response = await fetch(url,options)

    console.log(response.ok)

    return response.ok
}

const novoContato = {
    "nome": "Breno",
    "celular": "11 9 1112-3333",
    "foto": "https://img.freepik.com/psd-gratuitas/ilustracao-3d-de-avatar-ou-perfil-humano_23-2150671122.jpg",
    "email": "fernando@gmail.com",
    "endereco": "Rua dos anjos, 555",
    "cidade": "itapevi"
}

const deletarContato = async(id)=>{
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`
    const options = {
        method: "DELETE"
    }
    const response = await fetch(url,options)

    return response.ok
}

const atualizarContato = async(id,contato)=>{
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`
    const options = {

        method: "PUT",
        headers:{
            "content-type":"application/json"
        },
        body: JSON.stringify(contato)
    }
    const response = await fetch(url,options)

    console.log(response.ok)

    return response.ok
}

