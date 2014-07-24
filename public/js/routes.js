page.base();
page('/',function(ctx) {
    if(ctx.init) $('#home').css('opacity',1);
    else showPage('home');
});
page('/:section', function (ctx) {
    var section = ctx.params.section.toLowerCase();
    if(ctx.init) $('#'+section).css('opacity',1);
    else showPage(section);
});
page();

$('.nav-link').click(function (evt) {
    var section = evt.target.textContent.toLowerCase();
    showPage(section.toLowerCase());
    if (section == 'home') section = ''; 
    window.history.pushState(section,section,'/'+section);
    $('.nav-link').removeClass('nav-link-selected');
    $(this).addClass('nav-link-selected');
});

function showPage(section) {
    $('.page').stop().animate({opacity:0},500,function() {
        $('#'+section).stop().animate({opacity:1},500);
    });
}


$('.carousel').carousel({
    interval: 4500
});