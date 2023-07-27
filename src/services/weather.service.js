import axios from 'axios'

const apiKey = '705cf5ed5df2974c750f33a1918db825'

export function getWeatherByCity(city) {
  return axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then((res) => res.data)
}

export function getWeatherByCord(lon, lat) {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    )
    .then((res) => res.data)
}
