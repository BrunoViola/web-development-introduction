var altura = 0;
var largura = 0;

//definindo a dimensão do palco do jogo
function ajustaTamanhoPalcoJogo() {
   altura = window.innerHeight;
   largura = window.innerWidth;
   console.log(largura, altura);
}
function posicionaMosquito(){
   // randomiza as posições dos mosquitos
   var posicaoX = Math.floor(Math.random() * largura) - 90;
   var posicaoY = Math.floor(Math.random() * altura) - 90;

   //evita que a posição seja negativa
   posicaoX = posicaoX < 0 ? 0 : posicaoX;
   posicaoY = posicaoY < 0 ? 0 : posicaoY;

   // cria o elemento html
   var mosquito = document.createElement('img');
   mosquito.src = 'img/mosquito.png';
   mosquito.className = 'mosquito-principal';
   mosquito.style.left = posicaoX + 'px';
   mosquito.style.top = posicaoY + 'px';
   mosquito.style.position = 'absolute';

   document.body.appendChild(mosquito);
}

function main() {
   ajustaTamanhoPalcoJogo();
   posicionaMosquito();
}

main();