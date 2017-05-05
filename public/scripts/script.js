$(function (){
  console.log('gotowy do dzialania');
  $('#maxMoves').focus();
  $('#submit').click(function(){

    $.ajax({
      url: '/api/item',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        maxMoves:$('#maxMoves').val(),
        maxColors: $('#maxColors').val(),
        codeSize:$('#codeSize').val()
      }),
      success:function(json){
        console.dir(json);
        $('body').append('<p id="p1">ok</p>');
        $('#p1').fadeOut(1000,function(){
          $(this).remove();
        });
      },
      error:function(xhr,status,error){
        console.dir(xhr);
        console.log('status='+status);
        console.log('error='+error);
      },
      complete:function(xhr,status){
        console.log('Koniec obslugi ajaxa');
        $('#maxMoves').val('').focus();
      }
    });
  });
});
