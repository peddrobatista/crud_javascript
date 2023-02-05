const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

// Abrir modal
function openModal(edit = false, index = 0) {
    modal.classList.add('active')
    
    // cada clique fora   
    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
        }
    }
    // se for edição
    if (edit) {
        sNome.value = itens[index].nome
        sFuncao.value = itens[index].funcao
        sSalario.value = itens[index].salario
        id = index
    } else { // caso contrário
        sNome.value = ''
        sFuncao.value = ''
        sSalario.value = ''
    }
  
}

// Editar item
function editItem(index) {

  openModal(true, index)
}

// deletar item
function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}
// Inserir item
function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
    if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
        return
    }

    e.preventDefault();

    if (id !== undefined) { // Permanacer com os mesmos itens
        itens[id].nome = sNome.value
        itens[id].funcao = sFuncao.value
        itens[id].salario = sSalario.value
    } else { // Atualizar com novos itens
        itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value})
    }

    setItensBD()

    modal.classList.remove('active')
    loadItens()
    id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()