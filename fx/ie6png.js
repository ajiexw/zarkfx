/*
 *
 * DOC_BEGIN
 *
 * IE6 PNG
 * =======
 *
 * 让IE6下的PNG图片半透明,请用IE6预览本效果. (本FX基于 `DD_belatedPNG <http://www.dillerdesign.com/experiment/DD_belatedPNG/>`_ 开发)
 *
 * 让图片半透明
 * ------------
 * fx="ie6png"
 *
 * .. zarkfx:: :demo:
 *
 *     <img fx="ie6png" src="../../../file/ie6png/boxbg2.png" />
 *
 * 让div的背景图半透明
 * -------------------
 * fx="ie6png"
 *
 * .. zarkfx:: :demo:
 *
 *     <div fx="ie6png" style="background: url(../../../file/ie6png/boxbg2.png) top left no-repeat transparent; width:80px; height:80px;" ></div>
 *
 *
 * DOC_END
 *
 */

if ($.browser.msie && ($.browser.version == "6.0") && (!$.support.style)) {

    try { document.execCommand("BackgroundImageCache", false, true); }
    catch (err) {};

    ZARK_FX.getFrame('jquery-1.3.2', function($){
        ZARK_FX.run('ie6png', function(attrs){
            DD_belatedPNG.fixPng(this);
        }, {}, 'ddpng');
    });

};
