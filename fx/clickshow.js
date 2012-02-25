/*
 *  <* fx="clickshow[showid=atag;(hideme)]" > 
 *  click me show another *
 *  </*>
 *
 *  <* id="atag" style="display:none;" > 
 *  content
 *  </*>
 *
 * */

ZARK_FX.getFrame('jquery-1.3.2', function($){
    ZARK_FX.run('clickshow', function(attrs){

        var $this = $(this);
        if(attrs.showid !== undefined){
            $this.click(function(){
                if ( $('#'+attrs.showid).css('display') !== 'none' ){
                    $('#'+attrs.showid).hide();
                }else{
                    $('#'+attrs.showid).show();
                };
                if (attrs.hideme) {
                    $this.hide();
                };
                if (attrs.hideid) {
                    $('#'+attrs.hideid).hide();
                };
            });
        };

    });
});

