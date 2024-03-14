const button = document.querySelector('button')
const input = document.querySelector('input')
const img = document.querySelector('img')
const place = document.getElementById('place')
const degrees = document.getElementById('degrees')
const wind = document.getElementById('wind')
const humidity = document.getElementById('humidity')
const content = document.getElementById('content')

button.addEventListener("click", () => {
  if (!input.value) return;

  content.style.background = 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(34,29,147,1) 0%, rgba(249,255,0,1) 90%)'
  content.style.width = '20pc'
  content.style.paddingTop = '1px'
  content.style.borderRadius = '10px'
  content.style.marginTop = '10px'
  content.style.textAlign = 'center'

  getDataApi();
});


async function getDataApi() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${API_KEY}`;

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
