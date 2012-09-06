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

FX.getFrame('jquery-1.3.2', function($) {

    FX.run('ellipsis', function(attrs){

        var $this = $(this);
        var text_span_class = FX.getJSC();
        $this.width($this.width()).html('<span style="width:100%; height:100%;" class="'+text_span_class+'">'+$this.html()+'</span>');
        $this.ThreeDots({
            max_rows:        parseInt(attrs.max_rows),
            alt_text_t:      attrs.use_title,
            text_span_class: text_span_class
        });
    
    }, {
        max_rows:       1,
        use_title:      false,
        whole_word:     false

    }, 'threedots');

});
