// Selecting the paragraph and button elements
let para = document.querySelector("p");
let btn = document.querySelector("button");

btn.onclick = function () {
  // Fetching the city name from input and encoding it
  let cityname = encodeURIComponent(
    document.querySelector("input").value.trim()
  );

  // OpenWeather API URL for 5-day forecast data using city name
  let weather_url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=5a87669d5ec4583c5aec185a1a8d7b35`;

  // Fetching weather data
  fetch(weather_url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Weather API Error: ${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .then((weatherData) => {
      // Today's date in YYYY-MM-DD format
      let today = new Date().toISOString().split("T")[0];

      // Getting hourly temperatures for today with descriptions
      let todayTemps = weatherData.list
        .filter((item) => item.dt_txt.startsWith(today))
        .map((item) => {
          let time = item.dt_txt.split(" ")[1]; // Extracting time
          let tempCelsius = (item.main.temp - 273.15).toFixed(1); // Convert from Kelvin to Celsius
          let description = item.weather[0].description; // Getting weather description
          return `${time}: ${tempCelsius}°C, ${description}`; // Format: time: temp, description
        });

      // Display hourly temperatures for today
      para.innerText = `Today's Hourly Temperatures:\n${todayTemps.join(
        "\n"
      )}\n`;

      // Getting average temperatures and descriptions for the next 4 days
      let dailyTemps = {};
      let dailyDescriptions = {};

      weatherData.list.forEach((item) => {
        let date = item.dt_txt.split(" ")[0];
        if (!dailyTemps[date]) {
          dailyTemps[date] = [];
          dailyDescriptions[date] = []; // Initialize descriptions array for the date
        }
        dailyTemps[date].push(item.main.temp - 273.15); // Convert from Kelvin to Celsius
        dailyDescriptions[date].push(item.weather[0].description); // Store descriptions
      });

      // Calculate daily averages and get a representative description
      let nextDays = Object.keys(dailyTemps).slice(1, 5);
      let averageTempsWithDesc = nextDays.map((date) => {
        let avgTemp =
          dailyTemps[date].reduce((a, b) => a + b) / dailyTemps[date].length;
        let uniqueDescriptions = [...new Set(dailyDescriptions[date])]; // Get unique descriptions
        return `${date}: ${avgTemp.toFixed(1)}°C, ${uniqueDescriptions.join(
          ", "
        )}`; // Format: date: avgTemp, description
      });

      // Display average temperatures and descriptions for the next 4 days
      para.innerText += `Next 4 Days Average Temperatures and Descriptions:\n${averageTempsWithDesc.join(
        "\n"
      )}`;
    })
    .catch((err) => {
      para.innerText = "Error fetching data!";
      console.error(err); // Log detailed error message
    });
};
