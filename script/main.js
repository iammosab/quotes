



  $(document).ready(function(){
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwrn62-lhHReM5eZxnBDfThO5DPmb0mllq_XSQP0TRA3eI-cWnR/exec", 
        type:"POST",
        data:{action:"readQuotes"},
        success: function(result){
            var table = "<table><thead><th>ID</th><th>Quote</th><th>Author</th><th>Categorie</th></thead><tbody>";
            var text = "";
            result.forEach(element => {
                text +="<tr>";
                text +="<th>"+element.id+"</th>";
                text +="<td>"+element.quote+"</td>";
                text +="<td>"+element.author+"</td>";
                text +="<td>"+element.categorie+"</td>";
                text +="</tr>";
            });
            table+=text+ "</tbody></table>";
            $("main").html(table);
      }});
  });