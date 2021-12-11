// IDs dos elementos
const ID_LISTA_TAREFAS = 'lista-tarefas';
const ID_TEXTO_TAREFA = 'texto-tarefa';
const ID_CRIAR_TAREFA = 'criar-tarefa';
const ID_APAGAR_TUDO = 'apaga-tudo';
const ID_REMOVER_FINALIZADOS = 'remover-finalizados';
const ID_SALVAR_TAREFAS = 'salvar-tarefas';
const ID_MOVER_CIMA = 'mover-cima';
const ID_MOVER_BAIXO = 'mover-baixo';

// Classe do elemento
const CLASSE_SELECIONADA = 'selecionada';

// Declarando elementos
let inputTextoTarefa;
let botaoCriarTarefa;
let listaTarefas;
let botaoApagarTudo;
let botaoApagaFinalizadas;
let botaoSalvarLista;
let botaoMoverCima;
let botaoMoverBaixo;

// Pega os elementos da página após ser carregada
function pegarElementos() {
  inputTextoTarefa = document.getElementById(ID_TEXTO_TAREFA);
  botaoCriarTarefa = document.getElementById(ID_CRIAR_TAREFA);
  listaTarefas = document.getElementById(ID_LISTA_TAREFAS);
  botaoApagarTudo = document.getElementById(ID_APAGAR_TUDO);
  botaoApagaFinalizadas = document.getElementById(ID_REMOVER_FINALIZADOS);
  botaoSalvarLista = document.getElementById(ID_SALVAR_TAREFAS);
  botaoMoverCima = document.getElementById(ID_MOVER_CIMA);
  botaoMoverBaixo = document.getElementById(ID_MOVER_BAIXO);
}

// Seleciona uma tarefa da lista
function selecioanarTarefa(event) {
  const desselecionarTarefa = document.querySelector('.'.concat(CLASSE_SELECIONADA));
  if (desselecionarTarefa !== null) {
    desselecionarTarefa.classList.remove(CLASSE_SELECIONADA);
  }
  const tarefa = event.target;
  tarefa.classList.add(CLASSE_SELECIONADA);
}

// Risca uma tarefa marcando como completada e faz o inverso
function tarefaCompletada(event) {
  const tarefa = event.target;
  if (tarefa.classList.contains('completed')) {
    tarefa.classList.remove('completed');
  } else {
    tarefa.classList.add('completed');
  }
}

// Adiciona uma tarefa clicando no botão
function adicionaTarefaBotao() {
  // Pega o texto no input e depois limpa
  const tarefa = inputTextoTarefa.value;
  inputTextoTarefa.value = '';
  // Cria um li com o texto do input
  const li = document.createElement('li');
  li.innerText = tarefa;
  // Adiciona ouvintes para a li
  li.addEventListener('click', selecioanarTarefa);
  li.addEventListener('dblclick', tarefaCompletada);
  // Adiciona a li na lista de tarefas
  listaTarefas.appendChild(li);
}

// Adicona uma tarefa apertando enter
function adicionaTarefaEnter(event) {
  if (event.key === 'Enter') {
    adicionaTarefaBotao();
  }
}

// Apaga todas as tarefas da lista
function apagarTarefas() {
  listaTarefas.innerHTML = '';
}

// Apaga todas as tarefas finalizadas da lista
function apagarTarefasFinalizadas() {
  const tarefasFinalizadas = document.getElementsByClassName('completed');
  for (let i = tarefasFinalizadas.length - 1; i >= 0; i -= 1) {
    tarefasFinalizadas[i].remove();
  }
}

// Salva a lista no armazenamento local
function salvarLista() {
  const arrLista = [];
  const tarefas = document.querySelectorAll('#lista-tarefas li');
  for (let i = 0; i < tarefas.length; i += 1) {
    const completada = tarefas[i].classList.contains('completed');
    const tarefa = tarefas[i].innerText;
    const arrTarefa = [tarefa, completada];
    arrLista.push(arrTarefa);
  }
  window.localStorage.setItem(ID_LISTA_TAREFAS, JSON.stringify(arrLista));
}

// Adiciona tarefa salva no armazenamento local
function adicionaTarefaSalva(tarefa) {
  // Cria um li com o texto
  const li = document.createElement('li');
  li.innerText = [tarefa[0]];
  // Marca a tarefa como concluida ou não
  if (tarefa[1]) {
    li.classList.add('completed');
  }
  // Adiciona ouvintes para a li
  li.addEventListener('click', selecioanarTarefa);
  li.addEventListener('dblclick', tarefaCompletada);
  // Adiciona a li na lista de tarefas
  listaTarefas.appendChild(li);
}

// Carrega as tarefas salvas no armazenamento local
function cerregarTarefas() {
  let tarefas = window.localStorage.getItem(ID_LISTA_TAREFAS);
  tarefas = JSON.parse(tarefas);
  if (tarefas !== null) {
    for (let i = 0; i < tarefas.length; i += 1) {
      adicionaTarefaSalva(tarefas[i]);
    }
  }
}

// Move a tarefa selecionada para cima
function moverCima() {
  const tarefa = document.querySelector('.'.concat(CLASSE_SELECIONADA));
  if (tarefa !== null) {
    const tarefaCima = tarefa.previousElementSibling;
    if (tarefaCima !== null) {
      tarefa.insertAdjacentElement('afterend', tarefaCima);
    }
  }
}

// Move a tarefa selecionada para baixo
function moverBaixo() {
  const tarefa = document.querySelector('.'.concat(CLASSE_SELECIONADA));
  if (tarefa !== null) {
    const tarefaBaixo = tarefa.nextElementSibling;
    if (tarefaBaixo !== null) {
      tarefa.insertAdjacentElement('beforebegin', tarefaBaixo);
    }
  }
}

// Adiciona ouvintes nos elementos
function adicionaOuvintes() {
  botaoCriarTarefa.addEventListener('click', adicionaTarefaBotao);
  inputTextoTarefa.addEventListener('keypress', adicionaTarefaEnter);
  botaoApagarTudo.addEventListener('click', apagarTarefas);
  botaoApagaFinalizadas.addEventListener('click', apagarTarefasFinalizadas);
  botaoSalvarLista.addEventListener('click', salvarLista);
  botaoMoverCima.addEventListener('click', moverCima);
  botaoMoverBaixo.addEventListener('click', moverBaixo);
}

// Função executada após carregar a página para fazer as ações necessárias
function fazerAcoes() {
  // Pega os elementos
  pegarElementos();
  // Adiciona ouvintes aos elementos
  adicionaOuvintes();
  // Carrega tarefas salvas no armazenamento local
  cerregarTarefas();
}

window.onload = fazerAcoes;
