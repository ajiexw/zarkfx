if (!window['ZARK_FX']) window['ZARK_FX'] = {};
ZARK_FX = window['ZARK_FX'];

$(function(){

    ZARK_FX.fx = 'fx';
    ZARK_FX.PATH = '/gouwudang/zarkfx/';
    ZARK_FX.loaded = {};
    var fx = ZARK_FX.fx;

    ZARK_FX.parserFx = function(fx_string){
        var ret_fx = {};
        var fxs = fx_string.split(" ");
        for(var i in fxs){
            ret_fx[fxs[i]] = {};
        };
        return ret_fx;
    };

    $('['+fx+']').each(function(){
        var obj = $(this);
        var fx_string = obj.attr(fx);
        var tag_name = obj.attr('tagName').toLowerCase();
        var parsered_fx = ZARK_FX.parserFx(fx_string);

        for(var k in parsered_fx){
            if(ZARK_FX.loaded[k] === undefined){
                $.getScript(ZARK_FX.PATH+'js/'+k+'.js');
            };
            ZARK_FX.loaded[k] = true;
        };

    });

});
