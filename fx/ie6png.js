/*
 * <a fx="ie6png" ></a>
 * <span fx="ie6png" ></span>
 *
 * 注意: 如果你使用ctrl+F5刷新, 可能看不到效果
 *
 * 警告: DD_belatedPNG是全局变量!
 *
 * */

if ($.browser.msie && ($.browser.version == "6.0") && (!$.support.style)) {

    try { document.execCommand("BackgroundImageCache", false, true); }
    catch (err) {};

    ZARK_FX.getFrame('jquery-1.3.2', function($){
        ZARK_FX.run('ie6png', function(attrs){
            DD_belatedPNG.fixPng(this);
        }, {}, 'ddpng');
    });

};
