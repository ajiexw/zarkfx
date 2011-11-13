ZARK_FX.staytop = {};
if ($.browser.msie && ($.browser.version == "6.0") && (!$.support.style)) {
    ZARK_FX.staytop.fixedPosition = function(element ,top ,left){
        element.style.display = "block";
        if (!window.XMLHttpRequest && window.ActiveXObject)
        {
            element.style.position = "absolute";
            ZARK_FX.staytop.fixedPosition.setGlobal();
        }
        else
        {
            element.style.position = "fixed";
        }
        element.style.top = top +"px";
        element.style.left = left +"px";
    };
    ZARK_FX.staytop.fixedPosition.addCSSRule = function(key ,value){
        var css = document.styleSheets[document.styleSheets.length-1];
        css.cssRules ?
             (css.insertRule(key +"{"+ value +"}", css.cssRules.length)) :
             (css.addRule(key ,value));

    };
    ZARK_FX.staytop.fixedPosition.inited = false;
    ZARK_FX.staytop.fixedPosition.setGlobal = function(){
        if (! ZARK_FX.staytop.fixedPosition.inited)
        {
            document.body.style.height = "100%";
            document.body.style.overflow = "auto";
            ZARK_FX.staytop.fixedPosition.addCSSRule("*html" ,"overflow-x:auto;overflow-y:hidden;");
            ZARK_FX.staytop.fixedPosition.inited = true;
        }
    };
    ZARK_FX.staytop.ie6start = false;
};

