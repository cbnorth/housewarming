module.exports = function initLoad() {

  var headerH = null;

  function headerHeight() {
    if ($(window).width() < 780) {
      headerH = ($('header').outerHeight()) + 20
    } else {
      headerH = 35;
    }
  };

  headerHeight();

  $(window).resize(function() {
    headerHeight();
  });
    

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: (target.offset().top) - headerH
        }, 1000);
        return false;
      }
    }
  });

  //add scroll down 
  setTimeout(function() {
    $('.scroll_down_container').addClass('activate');
  }, 800);

  $('.animate_in').addClass('active');

  //add class to header when past the marquee
  var offsetValue = null;

  function headerBackground() {
      var scrollTop = $(window).scrollTop();
      var marqueeHeight = $('.marquee').outerHeight();
      if(scrollTop >= marqueeHeight ){
          $('header').addClass('below_marquee');
      } else {
          $('header').removeClass('below_marquee');
      }
  }

  $(window).scroll(function (e) {
      headerBackground();
  });
}

window.onload = function() {
    module.exports();
};