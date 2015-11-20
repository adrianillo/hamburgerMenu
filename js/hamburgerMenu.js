/*
 * hamburgarMenu 0.0.1 - A Jquery mobile  menu
 * Homepage: https://www.articlage.com/adrianillo/article/HamburgerMenu
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
            urlParam:'',
            position:'left',
            fromTo:'leftRight'
        };
        if (settings){$.extend(this.config, settings);}

        this.render= function(menuList, self)
        {
            var me=this;
            this.config.running=false;
            this.config.marginTopContent= parseInt( $(this.config.mainContent).css("margin-top"));
            var header=$('<header>',{id:'headerHamburger',"data-role":'header'});
            if(this.config.position=='right'){
                header.addClass("rightPosition");
            }
            var containerBtn=$('<div>',{id:'hamburgerBtn'}).addClass("hide");
            containerBtn.append($('<div>'));
            containerBtn.append($('<div>'));
            containerBtn.append($('<div>'));
            header.append(containerBtn);
            var nav=$('<nav>',{id:'menuHamburger'}).addClass("menuHamburger").addClass("hide");
            var ul=$('<ul>');
            ul.height($(window).height());
            if(this.config.fromTo=="rightLeft")
            {
                nav.addClass("rightSide");
            }

            if(this.config.fromTo=="topDown")
            {
                ul.height('0px');
                nav.addClass("topSide");
            }


            $.each(menuList, function( index, value ) {

                var li=$('<li>',{id:(value.id!=null?value.id:'')});
                var a=$('<a>',{href:(value.href!=null?value.href:'#')}).text((value.text!=null?value.text:''));
                ul.append(li.append(a));
            });
            nav.append(ul);
            $(self).append(header);
            $(self).append(nav);

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
                    if(!me.config.running) {
                        e.data.onClickAmburger(e);
                    }
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
            this.config.running=true;
            var mainContent= '#'+e.data.config.mainContent;
            var contentWidth = $(mainContent).width();
            $(mainContent).css('width', contentWidth);
            $('body').addClass('noScroll');
            var animateMode='linear';
            if($.easing) {
                if ($.easing.easeOutExpo) {
                    animateMode = 'easeOutExpo';
                }
            }
            var animateSideMenuHamburger={"marginLeft": ["0", animateMode]};
            var animateSideMainContent={ "marginLeft": ["75%", animateMode] };
            if(this.config.fromTo=="rightLeft")
            {
                 animateSideMenuHamburger={"marginRight": ["0", animateMode]};
                 animateSideMainContent={ "marginLeft": ["-75%", animateMode] };
            }
            var me=this;
            if(this.config.fromTo=="topDown")
            {
                var offsetMenu= $(window).height()*0.7;

                var heightUl= $("#menuHamburger ul li").length*$("#menuHamburger ul li").outerHeight()+10;
                if(heightUl>offsetMenu) {
                    heightUl = offsetMenu;
                }
                var offsetContent= heightUl+this.config.marginTopContent;
                $("#menuHamburger ul").animate({"height": [heightUl+"px", animateMode]}, {
                    duration: 700,
                    complete: function () {
                        $("#hamburgerBtn").addClass("hamburgerActive");
                        $("#hamburgerBtn").removeClass("hamburgerNoActive");
                        me.config.running=false;
                    }
                });

                $(mainContent).animate({"margin-top": [offsetContent+"px", animateMode]}, {
                    duration: 700,
                    complete: function () {

                    }
                });
            }
            else {

                $("#menuHamburger").animate(animateSideMenuHamburger, {
                    duration: 700,
                    complete: function () {
                        $("#hamburgerBtn").addClass("hamburgerActive");
                        $("#hamburgerBtn").removeClass("hamburgerNoActive");
                        me.config.running=false;
                    }
                });

                $(mainContent).animate(animateSideMainContent, {
                    duration: 700,
                    complete: function () {

                    }
                });
            }


        };
        this.hideMenuHamburger = function(e)
        {
            var mainContent= '#'+e.data.config.mainContent;
            $('body').removeClass('noScroll');

            var animateMode='linear';
            if($.easing) {
                if ($.easing.easeOutExpo) {
                    animateMode = 'easeOutExpo';
                }
            }

            var animateSideMenuHamburger={ "marginLeft": ["-75%", animateMode] };
            var animateSideMainContent={"marginLeft": ["6", animateMode]};
            if(this.config.fromTo=="rightLeft")
            {
                 animateSideMenuHamburger={ "marginRight": ["-75%", animateMode] };
                 animateSideMainContent={"marginLeft": ["6", animateMode]};
            }

            if(this.config.fromTo=="topDown")
            {
                $("#menuHamburger ul").animate({"height": ["0px", animateMode]}, {
                    duration: 700,
                    complete: function () {
                        $("#hamburgerBtn").removeClass("hamburgerActive");
                        $("#hamburgerBtn").addClass("hamburgerNoActive");
                    }
                });

                $(mainContent).animate({"margin-top": [this.config.marginTopContent+"px", animateMode]}, {
                    duration: 700,
                    complete: function () {

                    }
                });
            }
            else {

                $("#menuHamburger").animate(animateSideMenuHamburger, {
                    duration: 700,
                    complete: function () {
                    }
                });

                $(mainContent).animate(animateSideMainContent, {
                    duration: 700,
                    complete: function () {

                        $(mainContent).css('width', 'auto');
                        $("#hamburgerBtn").removeClass("hamburgerActive");
                        $("#hamburgerBtn").addClass("hamburgerNoActive");
                    }
                });
            }
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
