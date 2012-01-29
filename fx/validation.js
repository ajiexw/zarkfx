/*
 * Test html:
 *
 * <html>
 * <head>
 * <meta charset="utf-8" />
 * <script type="text/javascript" src="jslib/jquery-1.3.2.js"></script>
 * <script type="text/javascript" src="zarkfx.js"></script>
 * <script type="text/javascript">
 *     var regex_email = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
 * 
 *     function check_user(text) {
 *         if( /^(xdcr|sdjl|davinwang)$/i.test(text) )
 *             setTimeout(this.ok, 1000);
 *         else
 *             setTimeout(this.fail, 1000);
 *     }
 * 
 *     function custom_valid() {
 *         alert("custom_valid is called: " + this.value);
 *     }
 * 
 *     function custom_invalid() {
 *         this.value = "custom_invalid is called";
 *     }
 * </script>
 * </head>
 * 
 * <body>
 *     <form>
 *         <table>
 *             <tr>
 *                 <td>User name:</td>
 *                 <td><input fx="validation[type=custom;custom_fn=check_user;invalid_id=out;invalid_msg=Invalid&nbsp;user&nbsp;name!]" /></td>
 *             </tr>
 *             <tr>
 *                 <td>Password:</td>
 *                 <td><input type="password" id="password" /></td>
 *             </tr>
 *             <tr>
 *                 <td>Confirm password:</td>
 *                 <td><input type="password" fx="validation[type=identical;another_id=password;invalid_id=out;invalid_msg=The&nbsp;two&nbsp;passwords&nbsp;are&nbsp;not&nbsp;identical!]" /></td>
 *             </tr>
 *             <tr>
 *                 <td>Email:</td>
 *                 <td><input fx="validation[type=regex;regex=regex_email;invalid_id=out;invalid_msg=Invalid&nbsp;email&nbsp;address!]" /></td>
 *             </tr>
 *             <tr>
 *                 <td>Numbers:</td>
 *                 <td><input fx="validation[type=numbers;valid_fn=custom_valid;invalid_fn=custom_invalid]" /></td>
 *             </tr>
 *             <tr>
 *                 <td><input type="submit" value="submit" /></td>
 *             </tr>
 *         </form>
 *     </table>
 *     <hr />
 *     <p id="out"></p>
 * </body>
 * </html>
 *
 */

ZARK_FX.getFrame('jquery-1.3.2', function($) {

    ZARK_FX.run('validation', function(attrs) {

        var out = $("#" + attrs["invalid_id"])[0];

        if(out) {
            if( !attrs["invalid_msg"] ) {
                return;
            };
        } else if( !attrs["valid_fn"] && !attrs["invalid_fn"] ) {
            return;
        };

        var tmp = {this: this, is_valid: false};
        var regex;

        switch(attrs["type"]) {
            case "numbers":
                regex = /^[0-9]+$/;

                break;

            case "email":
                regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

                break;

            case "regex":
                eval("regex = " + attrs["regex"]);
                if( !(regex instanceof RegExp) ) {
                    return;
                };

                break;

            case "identical":
                var another = $("#" + attrs["another_id"])[0];

                if(!another) {
                    return;
                };

                if(out) {
                    tmp.cb = function() {
                        if( tmp.this.value === another.value ) {
                            tmp.is_valid = true;
                            $(out).html("");
                        } else {
                            tmp.is_valid = false;
                            $(out).html(attrs["invalid_msg"]);
                        };
                    };
                } else {
                    tmp.cb = function() {
                        if( tmp.this.value === another.value ) {
                            tmp.is_valid = true;
                            if( attrs["valid_fn"] ) {
                                eval(attrs["valid_fn"] + ".call(tmp.this)");
                            };
                        } else {
                            tmp.is_valid = false;
                            if( attrs["invalid_fn"] ) {
                                eval(attrs["invalid_fn"] + ".call(tmp.this)");
                            };
                        };
                    };
                };

                break;

            case "custom":
                if( !attrs["custom_fn"] ) {
                    return;
                };

                if(out) {
                    tmp.ok = function() {
                        tmp.is_valid = true;
                        $(out).html("");
                    };
                    tmp.fail = function() {
                        tmp.is_valid = false;
                        $(out).html(attrs["invalid_msg"]);
                    };
                } else {
                    tmp.ok = function() {
                        tmp.is_valid = true;
                        if( attrs["valid_fn"] ) {
                            eval(attrs["valid_fn"] + ".call(tmp.this)");
                        };
                    };
                    tmp.fail = function() {
                        tmp.is_valid = false;
                        if( attrs["invalid_fn"] ) {
                            eval(attrs["invalid_fn"] + ".call(tmp.this)");
                        };
                    };
                };

                tmp.cb = function() {
                    eval(attrs["custom_fn"] +
                            '.call(tmp, "' + tmp.this.value + '")');
                };

                break;

            default:
                return;
        };

        if(regex)
        {
            if(out) {
                tmp.cb = function() {
                    if( regex.test(tmp.this.value) ) {
                        tmp.is_valid = true;
                        $(out).html("");
                    } else {
                        tmp.is_valid = false;
                        $(out).html(attrs["invalid_msg"]);
                    };
                };
            } else {
                tmp.cb = function() {
                    if( regex.test(tmp.this.value) ) {
                        tmp.is_valid = true;
                        if( attrs["valid_fn"] ) {
                            eval(attrs["valid_fn"] + ".call(tmp.this)");
                        };
                    } else {
                        tmp.is_valid = false;
                        if( attrs["invalid_fn"] ) {
                            eval(attrs["invalid_fn"] + ".call(tmp.this)");
                        };
                    };
                };
            };
        };

        $(this).change(function() {
            tmp.is_valid = false;
        });
        $(this).blur(tmp.cb);

        // for submit
        var form = this.form;

        if( !$.data(form, "zarkfx.validation") ) {
            $.data(form, "zarkfx.validation", []);

            $(form).submit(function() {
                var data = $.data(form, "zarkfx.validation");
                for(var i in data) {
                    data[i].cb();
                    if( !data[i].is_valid ) {
                        return false;
                    };
                };
                return true;
            });
        };

        $.data(this.form, "zarkfx.validation").push(tmp);

    }, {
        type: undefined,

        regex: undefined,
        another_id: undefined,
        custom_fn: undefined,

        invalid_id: undefined,
        invalid_msg: undefined,

        valid_fn: undefined,
        invalid_fn: undefined
    });

});
