// Declarando elementos
let inputTextoTarefa;
let botaoCriarTarefa;
let listaTarefas;
let botaoApagarTudo;

// Pega os elementos da página após ser carregada
function pegarElementos() {
  inputTextoTarefa = document.getElementById('texto-tarefa');
  botaoCriarTarefa = document.getElementById('criar-tarefa');
  listaTarefas = document.getElementById('lista-tarefas');
  botaoApagarTudo = document.getElementById('apaga-tudo');
}

// Seleciona uma tarefa da lista
function selecioanarTarefa(event) {
  const desselecionarTarefa = document.querySelector('.selecionada');
  if (desselecionarTarefa !== null) {
    desselecionarTarefa.classList.remove('selecionada');
  }
  const tarefa = event.target;
  tarefa.classList.add('selecionada');
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

// Adiciona ouvintes nos elementos
function adicionaOuvinte() {
  botaoCriarTarefa.addEventListener('click', adicionaTarefaBotao);
  inputTextoTarefa.addEventListener('keypress', adicionaTarefaEnter);
  botaoApagarTudo.addEventListener('click', apagarTarefas);
}

// Função executada após carregar a página para fazer as ações necessárias
function fazerAcoes() {
  // Pega os elementos
  pegarElementos();
  adicionaOuvinte();
}

window.onload = fazerAcoes;
