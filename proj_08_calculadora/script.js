var resultado_exibido = false; //flag para que quando um resultado for calculado, apenas operações possam ser imediatamente concatenadas
function calcular(tipo, valor) {
   
   if(tipo === 'acao') {
      if(valor==='c'){
         document.getElementById('visor').value = '';
      } else {
         document.getElementById('visor').value += valor;
      }
      resultado_exibido = false;
   } else if(tipo === 'valor') {
      if(!resultado_exibido) {
         document.getElementById('visor').value += valor;
      } else { //um número foi digitado logo após a solução, o visor será limpo
         document.getElementById('visor').value = valor;
         resultado_exibido = false;
      }
   } else { //resolver
      var valor_campo = document.getElementById('visor').value;
      document.getElementById('visor').value = eval(valor_campo);
      resultado_exibido = true; //indica que um valor foi calculado
   }
   console.log(resultado_exibido);
}