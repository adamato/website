
page.base('/');
page('/',function(ctx) {
    showPage('home');
});
page('/:section', function (ctx) {
    showPage(ctx.params.section.toLowerCase())
});
page();

function showPage(section) {
    $('.page').stop().animate({opacity:0},500,function() {
        $('#'+section).stop().animate({opacity:1},500);
    });
}

$('.nav-link').click(function (evt) {
    var section = evt.target.innerText;
    window.history.pushState(section,section,'/'+section.toLowerCase());
    showPage(section.toLowerCase());
});
