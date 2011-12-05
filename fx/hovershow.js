/*
 *  <div fx="hovershow[showid=atag;(startshow)]" > 
 *  hover me show another *
 *  </div>
 *
 *  <* id="atag" > 
 *  content
 *  </*>
 *
 * */

ZARK_FX.getFrame('jquery-1.3.2', function($){
    ZARK_FX.run('hovershow', function(attrs){

        var $this = $(this);
        if(attrs.showid !== undefined){
            $this.hover(function(){
                $('#'+attrs.showid).show();
            },function(){
                $('#'+attrs.showid).hide();
            });
            if(attrs.startshow !== true){
                $('#'+attrs.showid).hide();
            };
        };

    });
});
