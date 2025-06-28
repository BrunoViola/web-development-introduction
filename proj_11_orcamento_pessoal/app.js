class Despesa {
   constructor(ano, mes, dia, tipo, descricao, valor) {
      this.ano = ano;
      this.mes = mes;
      this.dia = dia;
      this.tipo = tipo;
      this.descricao = descricao;
      this.valor = valor;
   }

   validarDados(){
      for(let i in this){
         if(this[i]==undefined || this[i]=='' || this[i]==null){
            return false;
         }
      }
      return true;
   }
}

class Bd {
   constructor(){
      let id = localStorage.getItem('id');

      if(id === null){
         localStorage.setItem('id', 0);
      }
   }

   getProximoId(){
      let proximoId = localStorage.getItem('id');
      proximoId = parseInt(proximoId) + 1;
      localStorage.setItem('id', proximoId)
      return proximoId;
   }

   gravar(despesa) {
      let id = this.getProximoId();
      localStorage.setItem(id, JSON.stringify(despesa));
   }
}

let bd = new Bd();

function cadastrarDespesa(){
   let ano = document.getElementById('ano');
   let mes = document.getElementById('mes');
   let dia = document.getElementById('dia');
   let tipo = document.getElementById('tipo');
   let descricao = document.getElementById('descricao');
   let valor = document.getElementById('valor');

   let despesa = new Despesa (
      ano.value,
      mes.value,
      dia.value,
      tipo.value,
      descricao.value,
      valor.value 
   );

   if(despesa.validarDados()){
      bd.gravar(despesa);

      document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso';
      document.getElementById('modal_titulo_div').className = 'modal-header text-success';
      document.getElementById('modal_conteudo').innerHTML = 'A despesa foi cadastrada com sucesso!';
      document.getElementById('modal_botao').innerHTML = 'Voltar';
      document.getElementById('modal_botao').className = 'btn btn-success';

      $('#modalRegistraDespesa').modal('show');
   } else {
      document.getElementById('modal_titulo').innerHTML = 'Erro na gravação';
      document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
      document.getElementById('modal_conteudo').innerHTML = 'Existem campos obrigatórios que não foram preenchidos.';
      document.getElementById('modal_botao').innerHTML = 'Voltar e corrigir';
      document.getElementById('modal_botao').className = 'btn btn-danger';

      $('#modalRegistraDespesa').modal('show');
   }
}