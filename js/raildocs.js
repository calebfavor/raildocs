$(function () {
    var mdContainer = $('.md-container');
    var converter = new showdown.Converter();

    $('.md-link').click(function () {
        var file = $(this).data('file');

        values=file.split('*');
        file=values[0];
        locationInFile=values[1];
        if(locationInFile){
            console.log(locationInFile);
        }
        
        mdContainer.fadeOut(100, function () {
            $.ajax({
                type: 'GET',
                url: 'pages/' + file,
                success: function (html) {
                    mdContainer.html(converter.makeHtml(html));
                    mdContainer.fadeIn(100);
                }
            });
        });

        $('.md-link').removeClass('active');
        $(this).addClass('active');
    }).first().click();
});