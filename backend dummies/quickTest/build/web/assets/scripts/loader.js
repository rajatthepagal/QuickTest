$(document).ready(function(){
    var temp = $('.runnning').attr('id');
    if(Number(temp) > 0)
    {
       $('.test-list').find('#test'+ temp ).find('.start-test').trigger('click');
        setTimeout(function(){ $('#button').trigger('click'); }, 300);
    } 
});


