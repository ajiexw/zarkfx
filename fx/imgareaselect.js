/*
 *
 * DOC_BEGIN
 *
 * Image Area Select
 * =================
 *
 * This FX provides a packaged
 * `jQuery imgAreaSelect Plugin <http://odyniec.net/projects/imgareaselect/>`_.
 *
 * Example 1
 * ---------
 *
 * .. zarkfx:: :demo:
 *
 *      <img src="http://p4.42qu.us/721/694/83638.jpg" fx="imgareaselect[preiviewid=preview;foursquare;valueid=value]"/>
 *      <div id="preview" style="width:96px; height:96px;"></div>
 *      <input id="value" type="text" autocomplete="off" />
 *
 *
 * DOC_END
 *
 */

ZARK_FX.getFrame('jquery-1.3.2', function($) {


    ZARK_FX.run('imgareaselect', function(attrs) {

        if (attrs.style !== 'none'){
            ZARK_FX.getCSS(ZARK_FX.CSS_PATH + 'imgareaselect/imgareaselect-'+attrs.style+'.css');
        };

        var change_functions = [];

        if(attrs.preiviewid){
            var $preview = $('#'+attrs.preiviewid);
            var $this = $(this);
            $('<img/>').attr('src',$(this).attr('src')).css({display:'inline'}).appendTo('#'+attrs.preiviewid);
            $preview.css({overflow:'hidden', margin:'auto'});

            change_functions.push(function(img, selection){
                if ( !! selection.width && !! selection.height) {
                    var e = $preview.width() / selection.width,
                        f = $preview.height() / selection.height;
                    $("img", $preview).css({
                        width: Math.round(e * $this.width()),
                        height: Math.round(f * $this.height()),
                        marginLeft: -Math.round(e * selection.x1),
                        marginTop: -Math.round(f * selection.y1)
                    });
                };
            });

        };

        if(attrs.valueid){
            var $value = $('#'+attrs.valueid);
            change_functions.push(function(img, selection){
                $value.val(selection.x1 + " " + selection.y1 + " " + selection.width + " " + selection.height);
            });
        };

        if(attrs.foursquare) {
            attrs.aspectRatio = "1:1";
            delete attrs.foursquare;
        };

        attrs.onSelectChange = function(img, selection){
            for(var i in change_functions){
                change_functions[i](img, selection);
            };
        };
        attrs.onSelectBegin = attrs.onSelectChange;
        attrs.onSelectEnd = attrs.onSelectChange;
        attrs.onInit = attrs.onSelectChange;

        if(!attrs["fx_var"]) {
            $(this).imgAreaSelect(attrs);
        } else {
            eval("$(this).imgAreaSelect(" + attrs["fx_var"] + ")");
        };

    }, {
        fxvar:      undefined,
        style:      'default',
        preiviewid: undefined,
        valueid:    undefined,
        handles:    true,
        x1:         100,
        x2:         200,
        y1:         100,
        y2:         200,
        foursquare: false,
        show:       true,
        keys:       false

    }, 'imgareaselect');

});
