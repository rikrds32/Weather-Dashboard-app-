// weather api key//
var apiKey="398dd4de7a0a8a9dafc9ebc7a298ca0b"
// city var//
var city=""
// get weather function//
function getWeather(city){
    var weatherUrl="api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey;
    $.ajax({
        url:weatherUrl,
        method:"GET"
    }).then(function(res){

    })
}
