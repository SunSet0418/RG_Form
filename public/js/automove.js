$("#am1").click(function(){
  amove(1);
})
$("#am2").click(function(){
  amove(2);
})
$("#am3").click(function(){
  amove(3);
})
$("#am4").click(function(){
  amove(4);
})
$("#am_2").click(function(){
  amove(2);
})
function amove(i)
{
  var ost=$("#div_"+i).offset().top;
  $('html, body').stop().animate( { scrollTop : ost-60 },600 );
}
function hover(i) {
  if(i==1)
  {
    document.getElementById("am_2").setAttribute('src', 'imgs/down_active.png');
  }
  else if(i==2)
  {
    document.getElementById("etimg").setAttribute('src', 'imgs/entrance_active.png');
  }
}
function unhover(i) {
  if(i==1)
  {
    document.getElementById("am_2").setAttribute('src', 'imgs/down.png');
  }
  else if(i==2)
  {
    document.getElementById("etimg").setAttribute('src', 'imgs/entrance.png');
  }
}
