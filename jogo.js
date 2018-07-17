var timerID = null; //chamada da funcao de segundos no cronometro
function iniciaJogo() {
  var url = window.location.search;
  var nivelJogo = url.replace("?", "");
  var tempo_segundos = 0;
  
  if(nivelJogo == 1) {//nivel facil
    tempo_segundos = 120;
  }
  if(nivelJogo == 2) {//nivel medio
    tempo_segundos = 60;
  }
  if(nivelJogo == 3) {//nivel dificil
    tempo_segundos = 30;
  }
  document.getElementById('cronometro').innerHTML = tempo_segundos;
  
  var qtde_baloes = 20;
  
  document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
  document.getElementById('baloes_estourados').innerHTML = 0;
  cria_baloes(qtde_baloes);
  contagem_segundos(tempo_segundos);
}

function game_over(){
  alert('Você não conseguiu extourar todos os balões antes do tempo acabar!');
  for(var i = 1; i <= qtde_baloes; i++){
    alert('b'+i);
    document.getElementById('b'+i).setAttribute('onclick', '');
  }
}

function contagem_segundos(segundos){  
  if (segundos == -1) {
    clearTimeout(timerID);
    game_over();
    return false;
  }
  document.getElementById('cronometro').innerHTML = segundos;
  segundos = segundos -1;
  timerID = setTimeout("contagem_segundos("+segundos+")", 1000);
}


function cria_baloes(qtde_baloes){
  for (var i = 1; i <= qtde_baloes; i++) {
    var balao = document.createElement("img");
    balao.src  = 'imagens/balao_azul_pequeno.png';
    balao.style.margin = '12px';
    balao.id = 'b' + i;
    balao.onclick = function(){ 
      estourar(this);
    };
    
    document.getElementById('cenario').appendChild(balao);
  }
}

function estourar(e){
  var id_balao = e.id;
  
  document.getElementById(id_balao).setAttribute('onclick', '');
  document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png'; //troca de imagem
  
  pontuacao(-1); //chamada a função para remover pontuação
  
}

function pontuacao(acao){
  var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
  var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
  
  
  baloes_inteiros = parseInt(baloes_inteiros);
  baloes_estourados = parseInt(baloes_estourados);
  
  baloes_inteiros = baloes_inteiros + acao;
  baloes_estourados = baloes_estourados - acao;
  
  document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
  document.getElementById('baloes_estourados').innerHTML = baloes_estourados;
  
  situacaoJogo(baloes_inteiros);
}

function situacaoJogo(baloes_inteiros){
  if(baloes_inteiros == 0){
    alert('Parabéns, você conseguiu estourar todos os balões a tempo!');
    clearTimeout(timerID);
  }
}