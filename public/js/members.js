var slider = $('.bxslider').bxSlider({
  pagerCustom: '#bx-pager',
  speed:100
});


// possibly try the slideSelector option from the bxslider API

$('.name').mouseover(function(){
	slider.goToSlide($(this).attr('data-slide-index'));
});

/*
use https://github.com/wandoledzep/bxslider-4
possibly begin with member profiles in 'ticker' mode
will want to index and use goToSlide

use Hakim Fokus on profile page

*/