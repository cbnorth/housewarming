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
