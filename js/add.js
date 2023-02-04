$(document).ready(function () {
  $("select").formSelect();
  $(".datepicker").datepicker({
    format: "dd/mm/yyyy",
  });
  $(".fixed-action-btn").floatingActionButton();

  //funções implementadas!!



  var db = openDatabase("lista", "1.0", "lista", 1024 * 1024 * 2);
  db.transaction(function (tx) {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS registros(id INTEGER PRIMARY KEY, tarefa VARCHAR, data VARCHAR, prioridade VARCHAR, descricao VARCHAR, realizada INTEGER)"
    );
  });


  receberDados();
  function receberDados() {
    $("#add-btn").click(function () {
      let tarefa = $("#tarefa").val();
      let data = $("#data").val();
      let descricao = $("#descricao").val();
      let prioridade = $("#prioridade").val();
      let realizada = $("#realizada").val();


      if (prioridade == 1) {
        prioridade = $('#prioridade option:selected').text();
        //var option = $( "#selectOption option:selected" ).text();
      } else if (prioridade == 2) {
        prioridade = $('#prioridade option:selected').text();

      } else if (prioridade == 3) {
        prioridade = $('#prioridade option:selected').text();
      }
      db.transaction(function (tx) {
        tx.executeSql(
          "INSERT INTO registros(tarefa, data, prioridade, descricao, realizada) VALUES(?,?,?,?,?)",
          [tarefa, data, prioridade, descricao, realizada],
          function () {
            alert("Cadastro Adicionado com sucesso!");

          }
        );

      });
      $('#tarefa, #data, #descricao, #realizada').val('')

    });
  }

});
