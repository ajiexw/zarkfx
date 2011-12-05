/*
 * <* fx="corner"></*>  default radius is 4px
 * <* fx="corner[radius=8]"></*>
 * <* fx="corner[radius=8,4]"></*>
 * <* fx="corner[radius=8,4,12]"></*>
 *
 * */

ZARK_FX.getFrame('jquery-1.3.2', function($){

    ZARK_FX.run('corner', function(attrs){

        var $this = $(this);
        var radius;
        var temp_jsc = ZARK_FX.getJSC();
        $this.addClass(temp_jsc);
        if (typeof attrs.radius === 'string' && attrs.radius.indexOf(',') > -1){
            radius = '';
            var rs = attrs.radius.split(',');
            for(var i in rs){
                if($.trim(rs[i]).length > 0){
                    radius += $.trim(rs[i]) + 'px '
                };
            };
        }else{
            radius = parseInt(attrs.radius);
        };
        DD_roundies.addRule('.'+temp_jsc, radius, true);

    }, {radius: 4}, 'ddroundies');

});
