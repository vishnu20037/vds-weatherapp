'user strict'
var map = L.map('map', {
    center: [28, 73],
    zoom: 6,
    zoomControl: false,
});
var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
{
    attribution: '&copy; <a href="http://osm.org/copyright" target = "_blank">OpenStreetMap</a> contributors'
}).addTo(map);
var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("PLEASE CHECK THE WINDOW") //esample from leaflet, will be immediately replaced by weatherpopup...
        .openOn(map);
$(document).ready(function(){
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?lat=" + e.latlng.lat + '&lon=' + e.latlng.lng + "&appid=72bd54c93f410e46cde02d674f48578b",
    dataType: 'json',
    success: function(data) {
      // storing json data in variables
      cityName = data.name; // Name of Weatherstation
      country=data.sys.country;
      temperature = Math.round(((data.main.temp)-273)*100)/100;
      humidity = data.main.humidity;
      visibility= (data.visibility)/1000;
    // popup.setContent( cityName +', '+country + "<br>" + temperature + "°C<br>"+
    //   humidity + "%" + "<br>"+ visibility +"KM" );
      document.querySelector('.city').textContent=cityName;
      document.querySelector('.humid').textContent=humidity;
document.querySelector('.temp').textContent=temperature;
document.querySelector('.country').textContent=country;
document.querySelector('.visib').textContent=visibility;
    },
    error: function() {
      alert("error receiving wind data from openweathermap");
    }
  });        
});
}
map.on('click', onMapClick);