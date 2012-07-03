/*
 *
 * DOC_BEGIN
 *
 * Corner
 * ======
 *
 * 圆角特效 (本FX基于 `jQuery Corner Plugin <http://jquery.malsup.com/corner/>`_ 开发)
 *
 * 默认4px圆角
 * -----------
 * fx="corner"
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="corner" style="background-color:#66AAFF; height:100px; width:50px; "></div>
 *
 * 8px圆角
 * -------
 * fx="corner[radius=8]"
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="corner[radius=8]" style="background-color:#66AAFF; height:100px; width:50px; "></div>
 *
 * 16px与4px混合
 * -------------
 * fx="corner[radius=16,4]"
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="corner[radius=16,4]" style="background-color:#66AAFF; height:100px; width:50px; "></div>
 *
 * 8px,4px,12px混合
 * ----------------
 * fx="corner[radius=8,4,12]"
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="corner[radius=8,4,12]" style="background-color:#66AAFF; height:100px; width:50px; "></div>
 *
 *
 * DOC_END
 *
 */

/*
FX.getFrame('jquery-1.3.2', function($){

    FX.run('corner', function(attrs){

        var $this = $(this);
        var radius;
        var temp_jsc = FX.getJSC();
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

    }, {radius: '4'}, 'ddroundies');

});
*/
