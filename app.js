/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=b1e3f55a6cd67382bbe42c872cafd464&units=metric'
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
//event listener for the element with the id: generate, with a callback function to execute when it is clicked.
document.getElementById('generate').addEventListener('click', performAction);
//the callback function to execute when the element with the id: generate is clicked.
function performAction() {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getTemperature(baseURL, zipCode, apiKey)
    .then(function (data) {
        console.log(data);
        postData ('/addWeatherData', {
            date: newDate, 
            temperature: data.main.temp, 
            userResponse: feelings});
    })
    .then((data) => updateUI())
};
//callback function call your async GET request with the parameters: base url, user entered zip code, and personal API key
const getTemperature = async (baseURL, zipCode, apiKey) => {
    const res = await fetch (baseURL+zipCode+apiKey)
    console.log(res);
    if (zipCode) {
        try {
            const data = await res.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log('error', error);
        }
    } else {
        alert('Enter zip code please!');
    }
    
};
//Async function makes a POST request to add the API data, as well as data entered by the user, to the app    
const postData = async (url = '', data = {}) => {
    const postResponse = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await postResponse.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};
//Async function that updates the UI dynamically
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.userResponse;
        console.log(allData);
    } catch (error) {
        console.log('error', error);
    }
};
