document.querySelector("#submit").addEventListener("click", function (event) {
    
  event.preventDefault();
  document.querySelector('.seven_day_forecast').style.display = "grid";
  document.querySelector('.map_box').style.display = "flex";
  document.querySelector('.right').style.display = "flex";
  document.querySelector('.main').style.justifyContent = "space-between";

  //CITY NAME ENTERED
  let city = document.querySelector("#city").value;

  //EMPTY Field validation
  if (city == "") {
    return alert("Please enter a city name to continue");
  }

  //Fetching the city data from API
  cityData(city);
  
  document.querySelector('#gmap_canvas').setAttribute('src', `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`)
});

async function cityData(city) {
  let data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=171d71eba201f63fa475687a2213c2ae`
  );
  data = await data.json(); 
  sevenDayData(data.coord.lat, data.coord.lon)
  displayData(data);
}

async function sevenDayData(lat, lon) {
    let data = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=171d71eba201f63fa475687a2213c2ae`)

    data = await data.json();
    displaySevenDayData(data);
}

function displaySevenDayData(data) {
    data.daily.forEach((elem, index) => {
        document.querySelectorAll('.day_box')[index].innerHTML = "";
        let dayTag = document.createElement('h2');
        dayTag.textContent = (new Date(elem.dt * 1000).toString().slice(0, 3))
        let img = document.createElement('img');
        let icon_link = elem.weather[0].icon;
        img.src = `http://openweathermap.org/img/wn/${icon_link}.png`;
        let max = document.createElement('h3');
        let min = document.createElement('h3');
        max.textContent = `${elem.temp.max}°C`
        min.textContent = `${elem.temp.min}°C`
        document.querySelectorAll('.day_box')[index].append(dayTag, img, max, min);
        
        
    })
}

function displayData(data) {
  document.querySelector("#current_temp").textContent =
    data.main.temp + "° Celsius";
  document.querySelector("#min_temp").textContent =
    data.main.temp_min + "° Celsius";
  document.querySelector("#max_temp").textContent =
    data.main.temp_max + "° Celsius";
  document.querySelector("#wind").textContent =
    "Wind Speed --> " + data.wind.speed;
  document.querySelector("#clouds").textContent =
    data.clouds.all || "Clear Sky";
  document.querySelector("#sunrise").textContent = new Date(
    data.sys.sunrise * 1000
  ).toLocaleString();
  document.querySelector("#sunset").textContent = new Date(
    data.sys.sunset * 1000
  ).toLocaleString();
}
