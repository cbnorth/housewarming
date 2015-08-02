(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//require("./link");
require("./googlemaps");
require("./onload");

$('.animate_in').addClass('active');
},{"./googlemaps":2,"./onload":3}],2:[function(require,module,exports){
module.exports = function initGoogleMap() {
    //Map settings

    //Coordinates
    var myLatlng = new google.maps.LatLng(47.61873,-122.308072);

    //options
    var mapOptions = {
      zoom: 18, 
      zoomControl:true,
      panControl:false,
      scrollwheel: false,
      scaleControl:false,
      mapTypeControl:false,
      draggable:true,
      streetViewControl:false,
      overviewMapControl:true,
      rotateControl:false,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    // Render map
    var map = false;

    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    //map marker
    var iconBase = '/assets/images/'
    var marker = new google.maps.Marker({
        position: myLatlng,
        icon: iconBase + 'map-icon.png',
        map: map,
        title:"Party!"
    });

    var contentString = '<div class="map_info_popup">' + '<p><span class="title">Mod 19 Apartments</span><br />1814 E Denny Way, # 302<br/>' + '<a href="https://goo.gl/maps/NJ5Zv" target="_blank" class="link_map_directions">get directions</a></p>' + '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
 
    google.maps.event.addListener(marker, 'click', function() { // Add a Click Listener to our marker
        //window.open('https://goo.gl/maps/NJ5Zv', '_newtab');
        infowindow.open(map,marker);
    });
}

// Execute our 'initGoogleMap' function once the page has loaded.
google.maps.event.addDomListener(window, 'load', module.exports); 
google.maps.event.addDomListener(window, 'resize', module.exports);

},{}],3:[function(require,module,exports){
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
},{}]},{},[1]);
