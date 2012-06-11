/*
 *  <div fx="score[hoversrc=**;clicksrc=**]" > 
 *      <img src="**" />
 *      <img src="**" />
 *  </div>
 *
 *  when hover a image,change its src *
 * */

FX.getFrame('jquery-1.3.2', function($){
    FX.run('score', function(attrs){

        var $img = $(this).children('img');
        var originsrc=$img.attr('src');

        if(attrs.hoversrc !== undefined){
            $img.each(function(){
                $(this).hover(function(){
                    $(this).add($(this).prevAll()).attr('src',attrs.hoversrc);
                },function(){
                    $(this).add($(this).prevAll()).attr('src',originsrc);
                });
            });
        };

        
         if(attrs.clicksrc !== undefined){
            $img.each(function(){ 
                $(this).click(function(){ 
                    $img.unbind('mouseenter').unbind('mouseleave');
                    $(this).add($(this).prevAll()).attr('src',attrs.clicksrc);
                });
            });
        };


    });
});
