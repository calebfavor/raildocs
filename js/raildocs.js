$(function () {
    var mdContainer = $('.md-container');
    var converter = new showdown.Converter();
    converter.setFlavor('github');

    $('.md-link').click(function () {
        var file = $(this).data('file');

        var paramString = $.param({'current-md': file});

        if (history.pushState) {
            var currentUrl = [location.protocol, '//', location.host, location.pathname].join('');

            window.history.pushState({path: currentUrl + "?" + paramString}, '', currentUrl +
                "?" +
                paramString);
        }

        mdContainer.fadeOut(60, function () {
            $.ajax({
                type: 'GET', url: 'pages/' + file, success: function (html) {
                    mdContainer.html(converter.makeHtml(html));

                    Prism.highlightAll(true, function(){});

                    $("html, body").animate({ scrollTop: 0 }, 150);

                    mdContainer.fadeIn(60);
                }
            });
        });

        $('.md-link').removeClass('active');
        $(this).addClass('active');
    });

    if(getParameterByName('current-md') != null) {
        $('.md-link[data-file="' + getParameterByName('current-md') + '"]').trigger('click');
    } else {
        $('.md-link').first().trigger('click');
    }

    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
});