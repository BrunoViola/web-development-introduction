var altura = 0;
var largura = 0;
var mosquitoNaoClicado = 1;
var tempo = 10;

var criaMosquito;

var tempoCriaMosquito = 1500;

var nivel = (window.location.search).replace('?','');

//definindo a dimensão do palco do jogo
function ajustaTamanhoPalcoJogo() {
   altura = window.innerHeight;
   largura = window.innerWidth;
   console.log(largura, altura);
}

// posicionando o mosquito pelo palco do jogo
function posicionaMosquito(){
   //remover mosquito anterior, caso exista
   if(document.getElementById('mosquito')){
      document.getElementById('mosquito').remove();

      switch(mosquitoNaoClicado){
         case 1:
            document.getElementById('v1').src = 'img/coracao_vazio.png';
            break;
         case 2:
            document.getElementById('v2').src = 'img/coracao_vazio.png';
            break;
         case 3:
            document.getElementById('v3').src = 'img/coracao_vazio.png';
            break;
      }
      mosquitoNaoClicado+=1;

      if(mosquitoNaoClicado==4) {
         window.location.href = 'fim_do_jogo.html';
      }
   }

   // randomiza as posições dos mosquitos
   var posicaoX = Math.floor(Math.random() * largura) - 90;
   var posicaoY = Math.floor(Math.random() * altura) - 90;

   //evita que a posição seja negativa
   posicaoX = posicaoX < 0 ? 0 : posicaoX;
   posicaoY = posicaoY < 0 ? 0 : posicaoY;

   // cria o elemento html
   var mosquito = document.createElement('img');
   mosquito.src = 'img/mosquito.png';
   mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
   mosquito.style.left = posicaoX + 'px';
   mosquito.style.top = posicaoY + 'px';
   mosquito.style.position = 'absolute';
   mosquito.id = 'mosquito';
   mosquito.onclick = function () {
      this.remove();
   }

   document.body.appendChild(mosquito);
}

// randomiza o tamanho do mosquito
function tamanhoAleatorio() {
   var classe = Math.floor(Math.random()*3);

   switch (classe) {
      case 0:
         return 'mosquito-grande';
      case 1:
         return 'mosquito-medio';
      case 2:
         return 'mosquito-pequeno';
   }
}

//modificar o lado para qual o mosquito está virado
function ladoAleatorio() {
   var classe = Math.floor(Math.random() * 2);

   switch(classe) {
      case 0:
         return 'ladoA';
      case 1:
         return 'ladoB';
   }
}

//criando e removendo mosquitos por ciclo de tempo
function criaRemoveTempo() {
   criaMosquito = setInterval(function(){
      posicionaMosquito()
   }, tempoCriaMosquito)
}

function estabeleceNivel(){
   if(nivel === 'normal') {
      tempoCriaMosquito = 1500;
   } else if (nivel === 'medio') {
      tempoCriaMosquito = 1000;
   } else if (nivel === 'dificil') {
      tempoCriaMosquito = 750;
   }
}

function main() {
   estabeleceNivel();
   ajustaTamanhoPalcoJogo();
   criaRemoveTempo();

   var cronometro = setInterval(function (){
      if (tempo>=0) {
         document.getElementById('cronometro').innerHTML = tempo;
         tempo -= 1;
      } else { //vitória
         clearInterval(cronometro);
         clearInterval(criaMosquito);
         window.location.href = 'vitoria.html';
      }
   }, 1000)
}

main();