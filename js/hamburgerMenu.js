/*
 * hamburgarMenu 0.0.1 - A Jquery mobile  menu
 * Homepage: www.articlage.com/adrianillo/article/hamburgarMenu
 *
 * Author:      Adrianillo
 * Twitter:     @adrianillo
 * Mail:        elcorreillodeadrianillo@gmail.com
 *
 * licensed under the MIT (MIT-LICENSE.txt)
 * http://www.opensource.org/licenses/mit-license.php
 *
 * requiere: jquery
 * optional: jqueryui
 */
jQuery.fn.extend({
    hamburgerMenu: function (settings , menuList) {
        var self= this;
        this.config = {
            mainContent: 'contentmain',
            url:null,
            urlType: 'post',
            urlCache:false,
            urlParam:''
        };
        if (settings){$.extend(this.config, settings);}


        this.render= function(menuList, self)
        {
            var html='<header id="headerHamburger" data-role="header">';
            html+='<div id="hamburgerBtn" class="hide">';
            html+='<div></div>';
            html+='<div></div>';
            html+='<div></div>';
            html+='</div>';
            html+='</header>';
            html+='<nav id="menuHamburger" class="menuHamburger hide">';
            html+='<ul>';

            $.each(menuList, function( index, value ) {

                html+='<li id="'+(value.id!=null?value.id:'')+'"><a href="'+(value.href!=null?value.href:'#')+'">'+(value.text!=null?value.text:'')+'</a></li>';
            });

            html+='</ul>';
            html+='</nav>';
            $(self).html(html);

            $(self).off('click','#menuHamburger li');
            $(self).on('click','#menuHamburger li',this, function (e) {
                if(e.data.config.onClickHamburgerMenu) {
                    e.data.config.onClickHamburgerMenu(e);
                }
                e.data.hideMenuHamburger(e);
            });

            $(self).off('click','#hamburgerBtn');
            $(self).on('click','#hamburgerBtn',this,function (e) {
                if(!$(this).hasClass('hamburgerActive')) {
                    e.data.onClickAmburger(e);
                }
            });

            $('body').off('click','#mainContent');
            $('body').on('click','#mainContent',this,function (e) {
                e.data.hideMenuHamburger(e);
            });

            $(self).off('click','#hamburgerBtn.hamburgerActive');
            $(self).on('click','#hamburgerBtn.hamburgerActive',this,function (e) {
                $("#hamburgerBtn").removeClass("hamburgerActive");
                $("#hamburgerBtn").addClass("hamburgerNoActive");
                e.data.hideMenuHamburger(e);
            });
        };

        this.onClickAmburger = function(e)
        {
            var mainContent= '#'+e.data.config.mainContent;
            var contentWidth = $(mainContent).width();
            $(mainContent).css('width', contentWidth);

            $('body').on('touchmove',this,function (e) {
                e.preventDefault()
            });

            var animateMode='linear';
            if($.easing) {
                if ($.easing.easeOutExpo) {
                    animateMode = 'easeOutExpo';
                }
            }

            $(mainContent).animate({ "marginLeft": ["75%", animateMode] }, {
                duration: 700,
                complete: function () {

                }
            });

            $("#menuHamburger").animate({"marginLeft": ["0", animateMode]}, {
                duration: 700,
                complete: function () {
                    $("#hamburgerBtn").addClass("hamburgerActive");
                    $("#hamburgerBtn").removeClass("hamburgerNoActive");
                }
            });


        };
        this.hideMenuHamburger = function(e)
        {
            var mainContent= '#'+e.data.config.mainContent;
            $('body').off('touchmove');

            var animateMode='linear';
            if($.easing) {
                if ($.easing.easeOutExpo) {
                    animateMode = 'easeOutExpo';
                }
            }
            $(mainContent).animate({"marginLeft": ["4", animateMode]}, {
                    duration: 700,
                    complete: function () {

                        $(mainContent).css('width', 'auto');
                        $("#hamburgerBtn").removeClass("hamburgerActive");
                        $("#hamburgerBtn").addClass("hamburgerNoActive");
                    }
            });

            $("#menuHamburger").animate({ "marginLeft": ["-75%", animateMode] }, {
                duration: 700,
                complete: function () {
                }
            });
        };


        if(this.config.url!=null)
        {
            $.ajax({
                url: this.config.url,
                dataType: 'json',
                cache: this.config.urlCache,
                data: this.config.urlParam,
                success: function (data) {
                    if(data!=null)
                    {
                        if($.isArray(data))
                        {
                            menuList=data;
                            self.render(menuList,self);
                        }
                    }
                },
                error: function (e) {
                },
                type: this.config.urlType
            });
        }
        else
        {
            this.render(menuList,self);
        }
    },
    onClickHamburgerMenu: function (e,o) {
        if (o.onClickHamburgerMenu)
            o.onClickHamburgerMenu(e);
    }
});
