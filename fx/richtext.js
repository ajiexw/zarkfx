FX.getFrame('jquery-1.3.2', function($){

    FX.run('richtext', function(attrs){

        var $this = $(this);
        $this.tinymce({
            // Location of TinyMCE script
            script_url : FX.JS_PATH+'tiny_mce/tiny_mce.js',

            // General options
            theme : "advanced",
            plugins : "autolink,lists,style,iespell,media,fullscreen,template,advlist,sparker5image,table,searchreplace,advhr,directionality,preview,",

            // Theme options
            theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect,sparker5image,code",
            theme_advanced_buttons2 : "tablecontrols,|,search,replace,|,bullist,numlist,outdent,indent,forecolor,backcolor,removeformat,|,preview,hr,advhr,|,ltr,rtl,|,undo,redo,link,unlink,image,charmap,media,styleprops,template,|,fullscreen", 
            theme_advanced_buttons3 : "",
            theme_advanced_toolbar_location : "top",
            theme_advanced_toolbar_align : "left",
            theme_advanced_statusbar_location : "bottom",
            theme_advanced_resizing : true,
            relative_urls : false, 
            theme_advanced_font_sizes : "10px,11px,12px,13px,14px,16px,18px,20px,24px",


            // Example content CSS (should be your site CSS)
            //content_css : "css/content.css",

            // Drop lists for link/image/media/template dialogs
            //template_external_list_url : "lists/template_list.js",
            //external_link_list_url : "lists/link_list.js",
            //external_image_list_url : "lists/image_list.js",
            //media_external_list_url : "lists/media_list.js",

            // Replace values for the template plugin
            template_replace_values : {
                username : "Some User",
                staffid : "991234"
            }
        });
    
    }, {}, 'tiny_mce/jquery.tinymce' );

});

