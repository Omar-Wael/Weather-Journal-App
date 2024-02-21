/* Global Variables */
// let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let baseURL = "https://api.openweathermap.org/data/2.5/weather?q=";
// const apiKey = "&appid=b1e3f55a6cd67382bbe42c872cafd464&units=metric";
const apiKey = "&appid=b1e3f55a6cd67382bbe42c872cafd464&units=metric";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
//event listener for the element with the id: generate, with a callback function to execute when it is clicked.
document.getElementById("generate").addEventListener("click", performAction);
//the callback function to execute when the element with the id: generate is clicked.
function performAction() {
  const city = document.getElementById("city").value;
  const feelings = document.getElementById("feelings").value;
  getTemperature(baseURL, city, apiKey)
    .then(function (data) {
      console.log(data);
      postData("/addWeatherData", {
        date: newDate,
        // temperature: data.main.temp,
        temperature: data.main.temp,
        main: data.weather[0].main,
        icon: data.weather[0].icon,
        description: data.weather[0].description,
        userResponse: feelings,
      });
    })
    .then((data) => updateUI());
}
//callback function call your async GET request with the parameters: base url, user entered zip code, and personal API key
const getTemperature = async (baseURL, city, apiKey) => {
  const res = await fetch(baseURL + city + apiKey);
  console.log(res);
  if (city) {
    try {
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log("error", error);
    }
  } else {
    alert("Enter city name please!");
  }
};
//Async function makes a POST request to add the API data, as well as data entered by the user, to the app
const postData = async (url = "", data = {}) => {
  const postResponse = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await postResponse.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
//Async function that updates the UI dynamically
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = "Date: " + allData.date;
    document.getElementById("temp").innerHTML =
      "Temperature: " + allData.temperature + " °C";
    document.getElementById(
      "icon"
    ).innerHTML = `<span>Icon: </span><img src="https://openweathermap.org/img/wn/${allData.icon}@2x.png" alt="${allData.main}" />`;
    "https://openweathermap.org/img/wn/" + allData.icon;
    document.getElementById("main").innerHTML = "Main: " + allData.main;
    document.getElementById("description").innerHTML =
      "Description: " + allData.description;
    document.getElementById("content").innerHTML =
      "It is Feeling: " + allData.userResponse;
    console.log(allData);
  } catch (error) {
    console.log("error", error);
  }
};
