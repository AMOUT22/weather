const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");
let appikey= "5c2ae402e8010331ce3497773f79bb56";
let api;

inputField.addEventListener("keyup", e =>{
    // that the user press the enter key end the input not empty and then we call the api (the function below take the role to search dor what the user write and get a respone)
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () =>{
    // get the user location
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your browser not support geolocation api 😕");
    }
});

function requestApi(city){
    // search for the city (the URL of the api+ key api)
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5c2ae402e8010331ce3497773f79bb56`;
    fetchData();
}

function onSuccess(position){
    // if the user accept the api gets his location and evreything was good
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=5c2ae402e8010331ce3497773f79bb56`;
    fetchData();
}

function onError(error){
    // otherwise the api return with an error message
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){
    infoTxt.innerText = "Wait for a moment please ...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong ☺️❌";
        infoTxt.classList.replace("pending", "error");
    });
}
var greet = new Array("Is it hot today ☀️?", "Is it cold outside  ⛄️?", "Is it going to rain today☔️?");

var counter= 0;
document.getElementById('greeting').innerHTML = greet[counter];

Changegreeting1();
function Changegreeting1(){
  incrementIndex()
  document.getElementById('greeting1').innerHTML = greet[counter];

  document.getElementById('greeting').style.opacity = 0;
 
  document.getElementById('greeting1').style.opacity = 1;

  setTimeout(Changegreeting, 2000);
}
function Changegreeting(){
  incrementIndex();
  document.getElementById('greeting').innerHTML = greet[counter];
 
  document.getElementById('greeting').style.opacity = 1;
 
  document.getElementById('greeting1').style.opacity = 0;
 
  setTimeout(Changegreeting1, 2000);
}
function incrementIndex(){
  if(counter < greet.length - 1 ){
    counter++;
  }else{
    counter = 0;
  }
}
const d = new Date();
let hour = d.getHours();

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name ❔ `;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;

        if(id == 800){
            document.getElementById("myImg").src = "clear.png";
            if(hour>19){
            document.getElementById("myImg").src = "clear night.png";

            }
        }else if(id >= 200 && id <= 232){
            document.getElementById("myImg").src = "STORM.png";

        }else if(id >= 600 && id <= 622){
            document.getElementById("myImg").src = "snoww.png";

        }else if(id >= 701 && id <= 781){
            document.getElementById("myImg").src = "haze.png";

        }else if(id >= 801 && id <= 804){
            document.getElementById("myImg").src = "clouddy.png";
            if(hour>19){
                document.getElementById("myImg").src = "cloudy night.png";
    
                }

        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            document.getElementById("myImg").src = "rainn.png";

        }
        
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}


arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});