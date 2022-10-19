let weather ={
    //sign in to openwethermap.org to get the api key
    "apiKey": "c115a6a800094fdcc4421b906840caad",
    fetchWeather: function(city){
        fetch(
            //add the city added by the user in the search-bar to the link to get the data of weather
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&appid="
            + this.apiKey

        )
            .then((response) =>response.json())
            .then((data)=>this.displayWeather(data));
    },
    displayWeather: function(data){
    //store the needed data in different variables
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    //update the collected data in hmtl template
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = (temp-273.15).toFixed(0) + "°C";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    //change the background image according to the city
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
    //function to search the weather by the text entered in search-bar
    search: function(){
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
//search the weather if user press on search icon
document.querySelector(".search button").addEventListener("click",function(){
    weather.search();
});

//search the weather if user press the enter/return key
document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});
//show the weather of saskatoon by default
weather.fetchWeather("Saskatoon");
