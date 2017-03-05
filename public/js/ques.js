$(document).ready(function() {
    $('#enter').click(function() {
        document.getElementById("ent").setAttribute('src', 'imgs/entrance_active.png');
        var name = $("#name").val();
        var num = $("#num").val();
        var contact = $("#contact").val();
        var why = $("#why").val();
        var self = $("#self").val();
        if (name.length == 0 || num.length == 0 || contact.length == 0 || why.length == 0 || self.length == 0 || gua == 0 || clas == 0) {
            alert("정보를 올바르게 입력하지 않았습니다. (누락 항목 없이 전부 입력해야 합니다.)");
        } else {
            alert("이름 : "+name+"\n"+"학과 : "+gua+"\n"+"학번 : "+num+"\n"+"연락처 : "+contact+"\n"+"지원분야 : "+clas+"\n"+"지원동기 : "+why+"\n"+"자기소개 : "+self);
            var regdata = "name=" + name + "&num=" + num + "&contact=" + contact + "&why=" + why + "&self=" + self + "&gua=" + gua + "&clas=" + clas;
            $.ajax({        
                type: "POST",
                url: "http://soylatte.kr:8989/newpeople",
                    data: regdata,
                    success: function(data)     {        
                    if (data.success == true) {
                        alert("정상적으로 접수되었습니다. 자세한 정보는 추후 공지하겠습니다.");
                    }
                },
                    error: function(xhr, status, error)     {
                    alert("서버에 문제가 있습니다. 관리자에게 문의하세요 (01077033712 이주호)");
                }
            });
        }
    })
});
$("#sft").click(function() {
    clic(1);
})
$("#mul").click(function() {
    clic(2);
})
$("#ga").click(function() {
    clic(3);
})
$("#de").click(function() {
    clic(4);
})
$("#gi").click(function() {
    clic(5);
})

var gua = 0;
var clas = 0;

function clic(i) {
    if (i == 1) {
        document.getElementById("sf").setAttribute('src', 'imgs/sft_active.png');
        document.getElementById("mu").setAttribute('src', 'imgs/mul.png');
        gua = "소프트웨어";
    } else if (i == 2) {
        document.getElementById("mu").setAttribute('src', 'imgs/mul_active.png');
        document.getElementById("sf").setAttribute('src', 'imgs/sft.png');
        gua = "멀티미디어";
    } else if (i == 3) {
        document.getElementById("gae").setAttribute('src', 'imgs/ga_c.png');
        document.getElementById("dee").setAttribute('src', 'imgs/de.png');
        document.getElementById("gie").setAttribute('src', 'imgs/gi.png');
        clas = "개발자";
    } else if (i == 4) {
        document.getElementById("gae").setAttribute('src', 'imgs/ga.png');
        document.getElementById("dee").setAttribute('src', 'imgs/de_c.png');
        document.getElementById("gie").setAttribute('src', 'imgs/gi.png');
        clas = "디자이너";
    } else if (i == 5) {
        document.getElementById("gae").setAttribute('src', 'imgs/ga.png');
        document.getElementById("dee").setAttribute('src', 'imgs/de.png');
        document.getElementById("gie").setAttribute('src', 'imgs/gi_c.png');
        clas = "기획자"
    }
}
