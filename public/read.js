$(document).ready(function() {
    $.ajax({        
        type: "GET",
        url: "http://soylatte.kr:8989/data",
            success: function(data)     {
          var json = eval(data);
            for(var i=0;i < json.length;i++)
            {
              document.getElementById("table").innerHTML += "<tr><td>"+json[i].name+"</td><td>"+json[i].num+"</td><td>"+json[i].gua+"</td><td>"+json[i].clas+"</td><td>"+json[i].contact+"</td><td>"+json[i].why+"</td><td>"+json[i].self+"</td></tr>"
            }
        },
            error: function(xhr, status, error)     {
            alert("서버에 문제가 있습니다. 관리자에게 문의하세요");
        }
    });
});
