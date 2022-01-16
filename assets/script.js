var button = document.querySelector('.btn')
var inputValue = document.querySelector('#weatherSearch')


button.addEventListener('click',function(){
    fetch()
    .then(response => response.json())
    .then(data => console.log(data))
    
})
