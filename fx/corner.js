/*
 * <* fx="corner"></*>  default radius is 4px
 * <* fx="corner[radius=8]"></*>
 * <* fx="corner[radius=8,4]"></*>
 * <* fx="corner[radius=8,4,12]"></*>
 *
 * */
ZARK_FX.corner = {};

var initCorner = function(){
    $('['+ZARK_FX.FX+']').each(function(){
        var $this = $(this);
        if(ZARK_FX.parserFx($this.attr(ZARK_FX.FX)).corner !== undefined){
            var attrs = ZARK_FX.parserFx($this.attr(ZARK_FX.FX)).corner;
            var temp = ZARK_FX.getJSC();
            $this.addClass(temp);
            var radius = 4;
            if (attrs.radius !== undefined){
                if (attrs.radius.indexOf(',') > -1){
                    var rs = attrs.radius.split(',');
                    var radius = '';
                    for(var i in rs){
                        if($.trim(rs[i]).length > 0){
                            radius += rs[i] + 'px '
                        };
                    };
                }else{
                    radius = parseInt(attrs.radius);
                };
            };
            DD_roundies.addRule('.'+temp, radius, true);
        };
    });
};

$.getScript(ZARK_FX.PATH + ZARK_FX.JS_LIB_PATH + 'ddroundies.js', initCorner);
