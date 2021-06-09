// weather api key//

var apiKey="398dd4de7a0a8a9dafc9ebc7a298ca0b"

// city var//

var city=""
var latitude=0
var longitude=0

//local storage//

let searchHistory=JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);

// get weather function//

function getWeather(city){
    var weatherUrl="https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+apiKey;
    $.ajax({
        url:weatherUrl,
        method:"GET"
    }).then(function(res){
        $("#city-name").text(res.name+" "+moment().format('l')); 
        $("#temp").text("Temperature: "+res.main.temp)
        $("#wind").text("Wind: "+res.wind.speed)
        $("#humidity").text("Humidity: "+res.main.humidity)
        latitude=res.coord.lat
        longitude=res.coord.lon
        getUv(latitude,longitude)
    })
}
function getUv(latitude,longitude){
    var uvUrl="https://api.openweathermap.org/data/2.5/onecall?lat="+latitude+"&lon="+longitude+"&appid="+apiKey;
    $.ajax({
        url:uvUrl,
        method:"GET"
    }).then(function(res){
        
        $("#uv-index").text("UV Index: "+res.current.uvi)
        $("#uv-index").css("color", "#2ECC71");
    })
}

function getFiveDayForecast(city){
    var urlForecast="https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid="+apiKey;
    $.ajax({
        url:urlForecast,
        method:"GET"
    }).then(function(res){
        console.log(res)
        $("#date-one").text(moment().add(1, 'days').calendar()); 
        $("#f-temp").text("Temp: "+res.list[0].main.temp)
        $("#f-wind").text("Wind: "+res.list[0].main.temp)
        $("#f-humidity").text("Humidity: "+res.list[0].wind.speed)
        $("#date-two").text(moment().add(2, 'days').calendar()); 
        $("#temp-two").text("Temp: "+res.list[8].main.temp)
        $("#wind-two").text("Wind: "+res.list[8].main.temp)
        $("#humidity-two").text("Humidity: "+res.list[8].wind.speed)
        $("#date-three").text(moment().add(3, 'days').calendar()); 
        $("#temp-three").text("Temp: "+res.list[16].main.temp)
        $("#wind-three").text("Wind: "+res.list[16].main.temp)
        $("#humidity-three").text("Humidity: "+res.list[16].wind.speed)
        $("#date-four").text(moment().add(4, 'days').calendar()); 
        $("#temp-four").text("Temp: "+res.list[24].main.temp)
        $("#wind-four").text("Wind: "+res.list[24].main.temp)
        $("#humidity-four").text("Humidity: "+res.list[24].wind.speed)
        $("#date-five").text(moment().add(5, 'days').calendar()); 
        $("#temp-five").text("Temp: "+res.list[32].main.temp)
        $("#wind-five").text("Wind: "+res.list[32].main.temp)
        $("#humidity-five").text("Humidity: "+res.list[32].wind.speed)

    })
}
$("#search").on("click",function(){

    city=$("#search-input").val();
    getWeather(city);
    getFiveDayForecast(city)
})

$("#city-name").on("click", function(){
    localStorage.setItem("city", $("#city-name").val());
})
