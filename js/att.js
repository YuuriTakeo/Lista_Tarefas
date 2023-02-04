$(document).ready(function () {
  var db = openDatabase("lista", "1.0", "lista", 1024 * 1024 * 2);
  db.transaction(function (tx) {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS registros(id INTEGER PRIMARY KEY, tarefa VARCHAR, data VARCHAR, prioridade VARCHAR, descricao VARCHAR, realizada INTEGER)"
    );

    voltar();
    function voltar() {
      $("#add-btn").click(function () {
        alert('e isso mesmo')
        let storage = window.sessionStorage;
        let id = storage.getItem("id");
        let tarefa = $("#tarefa").val();
        let data = $("#data").val();
        let descricao = $("#descricao").val();
        let prioridade = $("#prioridade").val();
        let realizada = $("#realizada").val();
        alert(id, tarefa)
        db.transaction(function (tx) {
          tx.executeSql(
            "UPDATE registros SET tarefa = ?, prioridade = ?, descricao = ?, data = ?, realizada = ? WHERE id = ?", [tarefa, prioridade, descricao, data, realizada, id]
          );
          alert("dados atualizados");

        });

        window.location.href = "index.html";
      });
    }

    transportarDados();
    function transportarDados() {
      $(document).ready(function () {
        db.transaction(function (tx) {
          tx.executeSql("SELECT * FROM registros", [], function (tx, results) {
            let storage = window.sessionStorage;
            let valor1 = storage.getItem("id");
            let valor2 = storage.getItem("tarefa");
            let valor3 = storage.getItem("prioridade");
            let valor4 = storage.getItem("descricao");
            let valor5 = storage.getItem("data");
            let valor6 = storage.getItem("realizada");
            $("#tarefa").val(valor2);
            $("#prioridade").val(valor3);
            $("#descricao").val(valor4);
            $("#data").val(valor5);
            $("#realizada").val(valor6);
          });
        });
      });
    }
  });
});
