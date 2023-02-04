$(document).ready(function () {
  $(".fixed-action-btn").floatingActionButton();
  $(".preloader-background").hide();
  $(".modal").modal();

  $.getScript("add.js", function () {
    alert("Script loaded but not necessarily executed.");
  });

  var db = openDatabase("lista", "1.0", "lista", 1024 * 1024 * 2);

  db.transaction(function (tx) {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS registros(id INTEGER PRIMARY KEY, tarefa VARCHAR, data VARCHAR, prioridade VARCHAR, descricao VARCHAR, realizada INTEGER)"
    );
  });

  /*var tarefa = 'Minha tarefa';
  var data = '15/08/2021';
  var prioridade = 'alta';
  var descricao = 'lorem ipsum sit amet dolor';
  var realizada = 0;

  db.transaction(function(tx){
    tx.executeSql('INSERT INTO registros(tarefa, data, prioridade, descricao, realizada) VALUES(?,?,?,?,?)',[tarefa, data, prioridade, descricao, realizada], function(){
    });
  });*/
  /*
    var id = 12;
    db.transaction(function (tx) {
      tx.executeSql('DELETE FROM registros', [], function () {
        alert('Registro removido com sucesso');
      });
    });*/

  // var tarefa = 'Sua tarefa Yuuuuuuri';
  // var id =  3;

  //   db.transaction(function(tx){
  //   tx.executeSql('UPDATE registros SET tarefa = ? WHERE id = ?',[tarefa, id], function(){
  //     alert('Registro atualizado com sucesso');
  //   });
  // });

  /*db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM registros', [], function (tx, results) {
      let total = results.rows.length;
      let i;
      for (i = 0; i < total; i++) {
        alert(results.rows.item(i).tarefa);
      }
      //alert('Select realizado com sucesso');
    });
  });*/

  Home();
  function Home() {
    $(".material-icons").ready(function () {
      db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM registros", [], function (tx, results) {
          let total = results.rows.length;
          let i;
          for (i = 0; i < total; i++) {
            id = $(results.rows.item(i).id);
            conteudo = `<ul class="collection" id="bucketList">
              <li class="collection-item avatar">
              <i class="circle teal"> ${results.rows.item(i).id}</i>
              <span class="title"> ${results.rows.item(i).tarefa}</span>
              <p>${results.rows.item(i).prioridade}</p>

              <a href="#" class="secondary-content btn-edit" data-realizada ="${
                results.rows.item(i).realizada
              }" data-data ="${
                results.rows.item(i).data
              }" data-descricao ="${
                results.rows.item(i).descricao
              }" data-prioridade ="${
              results.rows.item(i).prioridade
            }" data-tarefa="${results.rows.item(i).tarefa}" data-id="${
              results.rows.item(i).id
            }"><i class="material-icons ">edit</i></a>

              <a href="#" class="secondary-content btn-delete" data-id="${
                results.rows.item(i).id
              }"><i class="material-icons">delete</i></a>

                          </li></ul>`;
            $("#bucketList").append(conteudo);
          }
        });
      });
    });
  }

  ResetarTabela();
  function ResetarTabela() {
    $("#add-reset").click(function () {
      db.transaction(function (tx) {
        tx.executeSql("delete from registros", [], function () {
          alert("todos os dados foram apagados com sucesso!");
          location.reload(true);
        });
      });
    });
  }

  editar();
  function editar() {
    $(document).on("click", ".btn-edit", function () {
      let id = $(this).attr("data-id");
      let tarefa = $(this).attr("data-tarefa");
      let prioridade = $(this).attr("data-prioridade");
      let descricao = $(this).attr("data-descricao");
      let data = $(this).attr("data-data")
      let realizada = $(this).attr("data-realizada");

      let storage = window.sessionStorage;
            storage.setItem("id", id);
            storage.setItem("tarefa", tarefa);
            storage.setItem("prioridade", prioridade);
            storage.setItem("descricao", descricao);
            storage.setItem('data', data)
            storage.setItem('realizada', realizada)

      window.location.href = "att.html";
    });
  }

  RemoverDado();
  function RemoverDado() {
    $(document).on("click", ".btn-delete", function () {
      let id = $(this).attr("data-id");
      db.transaction(function (tx) {
        tx.executeSql("DELETE FROM registros WHERE id = ?", [id], function () {
          let storage = window.sessionStorage;
          storage.removeItem("id");
          storage.removeItem("tarefa");
          storage.removeItem("prioridade");
          storage.removeItem("descricao");
          alert("removido com sucesso!");
        });
      });
      $(this).closest("ul").remove();
    });
  }
});
