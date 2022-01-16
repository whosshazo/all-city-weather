var button = document.querySelector('.btn')
var inputValue = document.querySelector('#weatherSearch')


button.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/onecall?q="+inputValue.value+"lat={lat}&lon={lon}&exclude={alerts,}&appid={f90d646020d714f2dced46f00a203dcb}')
    .then(response => response.json())
    .then(data => console.log(data))
    
})
