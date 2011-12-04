/*
 *  jslib: http://tpgblog.com/2009/12/21/threedots-the-jquery-ellipsis-plugin/
 *
 *  max_rows 不一定准,  奇怪
 *
 *  <div fx="ellipsis[max_rows=3]" style="width:200px;" >
 *  abcdefg abcdefg abcdefg abcdefg abcdefg abcdefg abcdefg abcdefg abcdefg 
 *  </div>
 *
 *  <p fx="ellipsis[max_rows=2;use_title=true]" style="width:200px;" >
 *  abcdefg abcdefg abcdefg abcdefg abcdefg abcdefg abcdefg abcdefg abcdefg 
 *  </p>
 *
 * */
ZARK_FX.ellipsis = {};

var initEllipsis = function(){
    $('['+ZARK_FX.FX+']').each(function(){
        var $this = $(this);
        if (ZARK_FX.parserFx($this.attr(ZARK_FX.FX)).ellipsis !== undefined){
            var attrs = ZARK_FX.parserFx($this.attr(ZARK_FX.FX)).ellipsis;

            if (attrs.max_rows === undefined){ attrs.max_rows = 1; }
            else{ attrs.max_rows = parseInt(attrs.max_rows); };
            if (attrs.use_title === 'true'){ attrs.alt_text_t = true; }
            else{ attrs.alt_text_t = false; };
            delete attrs.use_title;
            if (attrs.whole_word === 'true'){ attrs.whole_word = true; }
            else{ attrs.whole_word = false; }; //这个属性可能会引起max_rows的bug

            attrs.text_span_class = ZARK_FX.getJSC();
            $this.html('<span style="width:100%; height:100%;" class="'+attrs.text_span_class+'">'+$this.html()+'</span>');
            $this.width($this.width());
            $this.ThreeDots(attrs);
        };
    });
};

$.getScript(ZARK_FX.JS_LIB_PATH + 'threedots.js', initEllipsis);
