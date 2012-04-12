/*
 *
 * DOC_BEGIN
 *
 * Cycle
 * =====
 *
 * This FX provides a packaged
 * `jQuery Cycle Plugin <http://jquery.malsup.com/cycle/>`_.
 *
 * Example 1
 * ---------
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="cycle[fx=fade;timeout=100]">
 *         <img src="http://cloud.github.com/downloads/malsup/cycle/beach1.jpg" width="200" height="200" />
 *         <img src="http://cloud.github.com/downloads/malsup/cycle/beach2.jpg" width="200" height="200" />
 *         <img src="http://cloud.github.com/downloads/malsup/cycle/beach3.jpg" width="200" height="200" />
 *     </div>
 *
 * Example 2
 * ---------
 *
 * .. zarkfx:: :demo:
 *
 *     <script type="text/javascript">
 *         var fx_var = {
 *             fx:"shuffle",
 *             timeout:5000,
 *         }
 *     </script>
 *
 *     <div fx="cycle[fx_var=fx_var]">
 *         <img src="http://cloud.github.com/downloads/malsup/cycle/beach1.jpg" width="200" height="200" />
 *         <img src="http://cloud.github.com/downloads/malsup/cycle/beach2.jpg" width="200" height="200" />
 *         <img src="http://cloud.github.com/downloads/malsup/cycle/beach3.jpg" width="200" height="200" />
 *     </div>
 *
 * DOC_END
 *
 */

// 如果要让cycle默认不滚动, 把timeout设置为0即可

ZARK_FX.getFrame('jquery-1.3.2', function($) {

    ZARK_FX.run('cycle', function(attrs) {

        if(!attrs["fx_var"]) {
            $(this).cycle(attrs);
        } else {
            eval("$(this).cycle(" + attrs["fx_var"] + ")");
        };

    }, {
        fx_var: undefined,
        timeout: 0,
        speed:  1000
    
    }, 'cycle');

});
