FX.getFrame('jquery-1.3.2', function($) {

    function toHTTP(url){
        if (url.indexOf('/') === 0){
            url = window.location.protocol + '//' + window.location.hostname + url;
        }else if (url.indexOf('http://') !== 0){
            url = window.location.href.substr(0, window.location.href.lastIndexOf('/')+1) + url;
        }
        return url;
    };

    function joinQuerys(url, param){
        var temp = [];
        for( var p in param ){
            temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
        }
        return url = url + "?" + temp.join('&');
    };

    function shareToRenRen(link, title, content, pic, attrs){
        var param = {
            resourceUrl : link,
            pic : pic,
            title : title,
            description : content
        };
        var url = joinQuerys("http://widget.renren.com/dialog/share", param),
            wa = 'width=700,height=650,left=0,top=0,resizable=yes,scrollbars=1';
        window.open(url, 'fwd', wa);
    };

    function shareToTencentWeibo(link, title, content, pic, attrs){
		var _assname = encodeURI(attrs.assname),
		    _appkey = encodeURI(attrs.appkey),
		    _pic = encodeURI(pic);

		var url = 'http://share.v.t.qq.com/index.php?c=share&a=index&url='+link+'&appkey='+_appkey+'&pic='+_pic+'&assname='+_assname+'&title='+encodeURIComponent(title+'   '+content);

		window.open( url,'', 'width=700, height=680, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, location=yes, resizable=no, status=no' );

    };

    function shareToSinaWeibo(link, title, content, pic, attrs){
        var param = {
            url:location.href,
            type:'3',
            count:'1', /**是否显示分享数，1显示(可选)*/
            appkey: attrs.appkey,
            title:  content,
            pic: pic,
            ralateUid: attrs.relateUid, /**关联用户的UID，分享微博会@该用户(可选)*/
            rnd: new Date().valueOf()
        }

        var url = joinQuerys("http://v.t.sina.com.cn/share/share.php", param);
        window.open(url);
    };

    function shareToDouban(link, title, content, pic, attrs){
        var e = encodeURIComponent,
            s1 = window.getSelection,
            s2 = document.getSelection,
            s3 = document.selection,
            s = s1?s1():s2?s2():s3?s3.createRange().text:'',
            r = 'http://www.douban.com/recommend/?url='+e(link)+'&title='+e(title+'   '+content)+'&sel='+e(s)+'&v=0';

        var x = function(){
            if(!window.open(r,'douban','toolbar = 0,resizable=1,scrollbars=yes,status=1,width=450,height=330')){
                location.href = r+'&r=1'
            }
        };

        if(/Firefox/.test(navigator.userAgent)){
            setTimeout(x,0)
        }else{
            x()
        }
    };

    function shareToQZone(link, title, content, pic, attrs){
        var param = {
            url: window.location.href,
            showcount: '1',
            desc: '',
            summary:content,
            title: title,
            site: attrs.siteName,
            pics:pic,
            style:'203',
            width:98,
            height:22
        };

        var url = joinQuerys("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",param);
        window.open(url);
    
    }

    FX.run('share', function(attrs) {
        var $this = $(this);

        $this.bind(attrs.event_type, function(){
            // 把下面这段代码放到bind函数里面， 是为了避免share过多时ie6下假死
            var content = '', title = '', link = '', pic = '';

            if (attrs.content_selector && $(attrs.content_selector).length > 0){
                content = $(attrs.content_selector).text();
            }
            if (attrs.title_selector && $(attrs.title_selector).length > 0){
                title = $(attrs.title_selector).text();
            }
            if (attrs.link_selector && $(attrs.link_selector).length > 0){
                var link = $(attrs.link_selector).attr('href');
                link = toHTTP(link);
            }else{
                link = window.location.href;
            }
            if (attrs.pic_selector && $(attrs.pic_selector).length > 0){
                var pic = $(attrs.pic_selector).attr('src') || $(attrs.pic_selector).val();
                pic = toHTTP(pic);
            }

            content = content.replace( /\s+/g, " " );
            if (content.length > attrs.content_limit){
                content = content.substr(0, attrs.content_limit) + '...';
            };

            if (attrs.site === 'renren'){
                shareToRenRen(link, title, content, pic, attrs);
            }else if (attrs.site === 'tencentweibo'){
                shareToTencentWeibo(link, title, content, pic, attrs);
            }else if (attrs.site === 'sinaweibo'){
                shareToSinaWeibo(link, title, content, pic, attrs);
            }else if (attrs.site === 'douban'){
                shareToDouban(link, title, content, pic, attrs);
            }else if (attrs.site === 'qzone'){
                shareToQZone(link, title, content, pic, attrs);
            };

        });


    }, {
        site:      undefined,
        content_selector:   undefined,
        title_selector:   undefined,
        link_selector:   undefined,
        pic_selector:   undefined,
        content_limit: 100,
        event_type: 'click',
        appkey:     undefined,
        relateUid:  undefined,
        assname:    undefined
    });

});
