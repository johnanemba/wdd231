// scripts/weather.js

document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
  const cityId = "YOUR_CITY_ID";  // Get city ID for chamber location
  const units = "metric"; // or 'imperial' for Fahrenheit

  const currentWeatherEl = document.getElementById("weather-current");
  const forecastEl = document.getElementById("weather-forecast");

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&units=${units}&appid=${apiKey}`
  )
    .then(response => response.json())
    .then(data => {
      // Current weather (first item)
      const current = data.list[0];
      const temp = current.main.temp.toFixed(1);
      const desc = current.weather[0].description;

      currentWeatherEl.innerHTML = `
        <p>Current Temperature: ${temp}°C</p>
        <p>Conditions: ${desc}</p>
      `;

      // 3-day forecast (next 3 days at noon)
      let forecastHTML = "<h4>3-Day Forecast</h4><ul>";
      const forecastItems = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

      forecastItems.forEach(item => {
        const date = new Date(item.dt_txt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
        const tempDay = item.main.temp.toFixed(1);
        const weatherDesc = item.weather[0].description;

        forecastHTML += `<li>${date}: ${tempDay}°C, ${weatherDesc}</li>`;
      });
      forecastHTML += "</ul>";

      forecastEl.innerHTML = forecastHTML;
    })
    .catch(err => {
      currentWeatherEl.textContent = "Weather data unavailable.";
      forecastEl.textContent = "";
      console.error(err);
    });
});
