const button = document.querySelector('button')
const input = document.querySelector('input')
const img = document.querySelector('img')
const place = document.getElementById('place')
const degrees = document.getElementById('degrees')
const wind = document.getElementById('wind')
const humidity = document.getElementById('humidity')

button.addEventListener("click", () => {
  if (!input.value) return;

  getDataApi();
});


async function getDataApi() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=your-code`;

  try {
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data?.cod && data.cod === '404') {
          return alert('Local Não Encontrado!')
        }
        loadData(data)
      })
  } catch (error) {
    alert(error)
  }
}
function loadData(data) {
  place.innerHTML = `${data.name} - ${data.sys.country}`
  degrees.innerHTML = `Temperatura: ${data.main.temp.toFixed(0)}°C`
  img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  wind.innerHTML = `Velociade do Vento: ${data.wind.speed}Km/h`
  humidity.innerHTML = `Humidade do Ar: ${data.main.humidity}%`
}

