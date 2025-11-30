'use strict'

import { lerContatos } from "./app.js"
import { criarContato } from "./app.js"
import { deletarContato } from "./app.js"
import { atualizarContato } from "./app.js"

let mudarEfeitoSalvar = true
let idContato = ""
console.log(lerContatos())

document.getElementById('deletar').disabled = true;
document.getElementById('editar').disabled = true;
const container = document.getElementById('container')
container.classList.add('container')

const CriarContatos = (contato) => {
    const card = document.createElement('div')
    card.classList.add('card-contato')
    console.log(contato.foto)
    const img = document.createElement('img')
    if (contato.foto == "" || contato.foto == null || contato.foto == undefined || typeof contato.foto !== "string") {
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
    card.onclick = async () => {
        pID.textContent
        const contatos = await lerContatos()
        contatos.forEach(contato => {
            if (contato.id == pID.textContent) {

                document.getElementById('salvar').disabled = true;
                document.getElementById('deletar').disabled = false;
                document.getElementById('editar').disabled = false;

                idContato = contato.id
                main.classList.remove('card-show')
                main.classList.add('form-show')

                const nome = document.getElementById('nome')
                nome.readOnly = true
                const celular = document.getElementById('celular')
                celular.readOnly = true
                const foto = document.getElementById('foto')
                foto.readOnly = true
                const email = document.getElementById('email')
                email.readOnly = true
                const endereco = document.getElementById('endereco')
                endereco.readOnly = true
                const cidade = document.getElementById('cidade')
                cidade.readOnly = true
                const imgContato = document.getElementById('preview-image')
                imgContato.readOnly = true

                imgContato.src = contato.foto
                nome.value = contato.nome
                celular.value = contato.celular
                foto.value
                email.value = contato.email
                endereco.value = contato.endereco
                cidade.value = contato.cidade

                document.getElementById('editar').addEventListener('click', async () => {

                    nome.readOnly = false

                    celular.readOnly = false

                    foto.readOnly = false

                    email.readOnly = false

                    endereco.readOnly = false

                    cidade.readOnly = false

                    imgContato.readOnly = false

                    document.getElementById('salvar').disabled = false;
                    mudarEfeitoSalvar = false


                })


            }



        })

    }
    container.appendChild(card)

}




const carregar = async () => {
    const contatos = await lerContatos()
    contatos.forEach(CriarContatos)

}

document.getElementById('salvar').addEventListener('click', async () => {
    if (mudarEfeitoSalvar) {
        await contatoSalvar(true)
    }
    else {
        await contatoSalvar(false, idContato)
    }


})
const contatoSalvar = async (botao, contato) => {

    const contatoCadastro = {
        "nome": `${document.getElementById('nome').value}`,
        "celular": `${document.getElementById('celular').value}`,
        "foto": document.getElementById('foto').files[0],
        "email": `${document.getElementById('email').value}`,
        "endereco": `${document.getElementById('endereco').value}`,
        "cidade": `${document.getElementById('cidade').value}`

    }

    if (botao) {

        if (document.getElementById('nome').value == null || document.getElementById('nome').value == undefined
            || document.getElementById('nome').value == "" || document.getElementById('email').value == null
            || document.getElementById('email').value == undefined || document.getElementById('email').value == "") {

            return false

        } else {

            const cadastro = await criarContato(contatoCadastro)
            console.log(cadastro)
            if (cadastro) {
                alert('Contato cadastrado com sucesso')
                main.classList.remove('form-show')
                main.classList.add('card-show')
                container.innerHTML = ""
                carregar()
            }
            else {
                alert('Não foi possível realizar o cadastro do contato')
            }
        }


    } else {
        const atualizar = await atualizarContato(contato, contatoCadastro)
        if (atualizar) {
            alert('Contato atualizado com sucesso')
        }
        else {
            alert('Não foi possível atualizar o contato')
        }

    }




}

document.getElementById('deletar').onclick = async () => {
    const deletar = await deletarContato(idContato)
    if (deletar) {
        alert('Deletado com sucesso!!!')
        main.classList.remove('form-show')
        main.classList.add('card-show')
        container.innerHTML = ""
        carregar()
    } else {
        alert('Não foi possível deletar o contato!!!')
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
document.getElementById('img-logo').onclick = () => {
    main.classList.remove('form-show')
    main.classList.add('card-show')

}

const preview = ({ target }) => {

    document.getElementById('preview-image').src = URL.createObjectURL(target.files[0])
}

document.getElementById('foto').addEventListener('change', preview)



carregar()
