/*
 *
 *  <div fx="hoverfade[switch=a1,a2,a3]" > 
 *      <img src="../img/beach1.jpg" width="200" height="200" /> 
 *      <img src="../img/beach2.jpg" width="200" height="200" class="hidden" /> 
 *      <img src="../img/beach3.jpg" width="200" height="200" class="hidden" /> 
 *  </div>
 *
 *  <a id="a1" href="javascript:;" >1</a>
 *  <a id="a2" href="javascript:;" >2</a>
 *  <a id="a3" href="javascript:;" >3</a>
 *
 *
 *
 * */

FX.getFrame('jquery-1.3.2', function($){

    FX.run('hoverfade', function(attrs){
        var $this = $(this);
        var temp_id = FX.getJSC();
        $('<div id="'+temp_id+'" style="display:none"></div>').appendTo('body');
        $this.cycle({ 
            fx:     'fade', 
            timeout: 0, 
            pager:  '#'+temp_id,
            speed: 	    400,
            timeout:    4000,
            pause:	    1

        });
        // bind switch event
        if(attrs['switch'] !== undefined){
            var switchs = attrs['switch'].split(',');
            for(var index in switchs){
                //这里有一个for循环的闭包问题, hover后取到的index是最后一个, 所以用hack
                $('#'+switchs[index]).attr('fx_hack_hoverfade_index', index);
                $('#'+switchs[index]).mouseover(function(){
                    $(this).addClass('chosed');
                    $('#'+temp_id+' a:eq('+$(this).attr('fx_hack_hoverfade_index')+')').trigger('click');
                    $this.cycle('pause');
                }).mouseout(function(){
                    $(this).removeClass('chosed');
                    $this.cycle('resume');
                });
            };
        };
    
    }, {}, 'cycle');
});
