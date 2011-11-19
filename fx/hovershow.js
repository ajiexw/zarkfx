/*
 *
 *  <div fx="hovershow[showid=somediv;(startshow)]" > 
 *  hover me show another div
 *  </div>
 *
 *  <div id="somediv" > 
 *  content
 *  </div>
 *
 * */

ZARK_FX.hovershow = {};

$('['+ZARK_FX.FX+']').each(function(){
    var $this = $(this);
    if (ZARK_FX.parserFx($this.attr(ZARK_FX.FX)).hovershow !== undefined){
        var attrs = ZARK_FX.parserFx($this.attr(ZARK_FX.FX)).hovershow;
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
    };
});

