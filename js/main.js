'use strict'

import { lerContatos } from "./app.js"
import { criarContato } from "./app.js"


const CriarContatos = (contato) => {

    const container = document.getElementById('container')
    container.classList.add('container')
    const card = document.createElement('div')
    card.classList.add('card-contato')
    const img = document.createElement('img')
    if (contato.foto == "" || contato.foto == null || contato.foto == undefined || contato.foto.includes('semFoto')) {
        img.src = './img/user.jpg'
    } else {
        img.src = contato.foto
    }

    const h2 = document.createElement('h2')
    if (contato.nome == "" || contato.nome == null || contato.nome == undefined) {
        h2.textContent = 'Default'
    } else {
        h2.textContent = contato.nome
    }


    const p = document.createElement('p')
    if (contato.celular == null || contato.celular == undefined || contato.celular == "") {
        p.textContent = 'none'
    } else {
        p.textContent = contato.celular

    }
    const pID = document.createElement('p')
    pID.classList.add('id')
    pID.textContent = contato.id

    card.append(img, h2, p, pID)
    card.addEventListener('click', async () => {
        pID.textContent
        const contatos = await lerContatos()
        contatos.forEach(contato => {
            if (contato.id == pID.textContent) {
                main.classList.remove('card-show')
                main.classList.add('form-show')

               const nome    = document.getElementById('nome')
               nome.readOnly = true
               const celular = document.getElementById('celular')
               celular.readOnly = true
               const foto    =  document.getElementById('foto')
               foto.readOnly = true
               const email   = document.getElementById('email')
               email.readOnly = true
               const endereco =  document.getElementById('endereco')
               endereco.readOnly = true
               const cidade = document.getElementById('cidade')
               cidade.readOnly = true 

              
                 nome.value =  contato.nome
                 celular.value = contato.celular 
                 foto.value  
                 email.value = contato.email 
                 endereco.value = contato.endereco 
                 cidade.value = contato.cidade 
               

            }
        })

    })
    container.appendChild(card)

}


const editarPerfil = ()=>{
    
}

const carregar = async () => {
    const contatos = await lerContatos()
    contatos.forEach(CriarContatos)

}

const cadastrar = async () => {
    if (document.getElementById('nome').value == null || document.getElementById('nome').value == undefined
        || document.getElementById('nome').value == "" || document.getElementById('email').value == null
        || document.getElementById('email').value == undefined || document.getElementById('email').value == "") {

        return false

    } else {
        let contato = {
            "nome": `${document.getElementById('nome').value}`,
            "celular": `${document.getElementById('celular').value}`,
            "foto": `${document.getElementById('foto').value}`,
            "email": `${document.getElementById('email').value}`,
            "endereco": `${document.getElementById('endereco').value}`,
            "cidade": `${document.getElementById('cidade').value}`

        }
        await criarContato(contato)
        return true
    }


}

const main = document.querySelector('main')

document.getElementById('novo-contato').addEventListener('click', () => {
    main.classList.remove('card-show')
    main.classList.add('form-show')
})

document.getElementById('cancelar').addEventListener('click', () => {
    main.classList.remove('form-show')
    main.classList.add('card-show')

})


document.getElementById('salvar').addEventListener('click', () => {
    const cadastro = cadastrar()
    if (cadastro) {
        alert('Contado cadastrado com sucesso')
    }
    else {
        alert('Não foi possível realizar o cadastro do contato')
    }
})



carregar()
