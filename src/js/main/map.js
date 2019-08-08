function initMap() {
  var hydePark = {lat: 43.097672, lng: -79.020234};
  var map = new google.maps.Map(
    document.getElementById('map'), { zoom: 14, center: hydePark});
  return new google.maps.Marker({ position: hydePark, map});
}
