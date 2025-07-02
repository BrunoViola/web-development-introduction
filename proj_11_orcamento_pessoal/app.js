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

   recuperarTodosRegistros(){
      let despesas = Array();

      let totatlIds = localStorage.getItem('id');

      for(let i=1; i<= totatlIds; i++){
         let despesa = JSON.parse(localStorage.getItem(i));
         if (despesa === null) {
            continue;
         }
         despesa.id = i; // Adiciona o ID à despesa recuperada
         despesas.push(despesa);
      }

      return despesas;
   }

   pesquisar(despesa){
      let despesasFiltradas = Array();

      despesasFiltradas = this.recuperarTodosRegistros();

      if (despesa.ano != ''){
         despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);
      }
      if (despesa.mes != ''){
         despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes);
      }
      if(despesa.dia != ''){
         despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia);
      }
      if(despesa.tipo != ''){
         despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo);
      }
      if(despesa.descricao != ''){
         despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao);
      }
      if(despesa.valor != ''){
         despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor);
      }

      console.log(despesasFiltradas);
      return despesasFiltradas;
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

      //limpando os dados na tela após a gravação
      document.getElementById("ano").value = '';
      document.getElementById("mes").value = '';
      document.getElementById("dia").value = '';
      document.getElementById("tipo").value = '';
      document.getElementById("descricao").value = '';
      document.getElementById("valor").value = '';

      // exibição do modal
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

function carregaListaDespesas(despesas = Array(), filtro=false){
   if(despesas.length == 0 && filtro == false){
      despesas = bd.recuperarTodosRegistros();
   }
   //chamo a função para popular a tabela com as despesas
   let listaDespesas = document.getElementById('listaDespesas');
   listaDespesas.innerHTML = ''; // Limpa a tabela antes de inserir os novos dados

   //insiro a tabela com os dados filtrados
   despesas.forEach(function(d){
      let linha = listaDespesas.insertRow();
      linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
      // Ajustando o tipo
      switch(d.tipo){
         case '1':
            d.tipo = 'Alimentação';
            break;
         case '2':
            d.tipo = 'Educação';
            break;
         case '3':
            d.tipo = 'Lazer';
            break;
         case '4':
            d.tipo = 'Saúde';
            break;
         case '5':
            d.tipo = 'Transporte';
            break;
      }
      linha.insertCell(1).innerHTML = `${d.tipo}`
      linha.insertCell(2).innerHTML = `${d.descricao}`
      linha.insertCell(3).innerHTML = `R$ ${d.valor}`;
   
      //cria botão de exclusão
      let btn = document.createElement("button");
      btn.className = 'btn btn-danger';
      btn.innerHTML = '<i class="fas fa-times"></i>';
      btn.id = `id_despesa_${d.id}`;
      btn.onclick = function(){
         alert(btn.id);
      }
      linha.insertCell(4).appendChild(btn); //quarta coluna para inserir o botão
      })
}

function pesquisarDespesa(){
   let ano = document.getElementById('ano').value;
   let mes = document.getElementById('mes').value;
   let dia = document.getElementById('dia').value;
   let tipo = document.getElementById('tipo').value;
   let descricao = document.getElementById('descricao').value;
   let valor = document.getElementById('valor').value;

   let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);

   //recebo as depesas que foram filtradas
   let despesas = bd.pesquisar(despesa);
   //chamo a função para popular a tabela com as despesas filtradas
   carregaListaDespesas(despesas, true);
}