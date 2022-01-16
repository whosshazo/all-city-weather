var API_KEY = "f90d646020d714f2dced46f00a203dcb";

function getWeatherData(){
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={'API_KEY}")
    console.log(data);
}
