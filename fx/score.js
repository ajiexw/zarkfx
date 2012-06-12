/*
 *  <* fx="score[hoversrc=**;clicksrc=**;showclass=**]" > 
 *      <img src="**" />
 *      <img src="**" />
 *      ...
 *  </*>
 *
 *  <* class=showclass></*>
 *  <* class=showclass></*>
 *  ...
 *
 *  when hover or click an image,change its src *
 * */

FX.getFrame('jquery-1.3.2', function($){
    FX.run('score', function(attrs){
        
        var $score=$(this),
            $img = $score.children('img'),
            $originsrc=$img.attr('src'),
            $show=$("."+attrs.showclass);

        if(attrs.hoversrc !== undefined){
            $img.each(function(){
                var i=$score.children().index($(this));

                $(this).hover(function(){
                    $(this).add($(this).prevAll()).attr('src',attrs.hoversrc);
                    $show.eq(i).show();  
                },function(){
                    $(this).add($(this).prevAll()).attr('src',$originsrc);
                    $show.hide();
                });
            });
        };

        
         if(attrs.clicksrc !== undefined){
            $img.each(function(){ 
                var k=$score.children().index($(this));

                $(this).click(function(){

                    $img.unbind('mouseenter').unbind('mouseleave');
                    $(this).add($(this).prevAll()).attr('src',attrs.clicksrc);
                    $(this).nextAll().attr('src',$originsrc);
                    $show.eq(k).show();


                    var $current_img=$(this);
                    $img.each(function(){
                        $(this).hover(function(){
                            var j=$score.children().index($(this));   
                            $(this).add($(this).prevAll()).attr('src',attrs.hoversrc);
                            $show.hide().eq(j).show();
                        },function(){
                            $current_img.add($current_img.prevAll()).attr('src',attrs.clicksrc);
                            $current_img.nextAll().attr('src',$originsrc); 
                            $show.hide().eq(k).show();                          
                        });    
                   
                   
                    });
                });
            });
        };




    });
});
