import { API_KEY, BASE_URL } from "./config.js"

export async function fetchData(state, city) {

  const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}&lang=ru`)
  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`)
  }

  const data = await response.json()
  const { country, name } = data.location
  const { cloud, humidity, wind_kph, vis_km, pressure_in, uv, temp_c, temp_f, feelslike_c, condition } = data.current

  const newState = {
    settings: {
      ...state.settings
    },
    weather: {
      country,
      city: name,
      cloud: {
        title: 'Облачность',
        value: `${cloud} %`,
        icon: "assets/icons/cloud.png"
      },
      humidity: {
        title: 'Влажность',
        value: `${humidity} %`,
        icon: "assets/icons/humidity.png"

      },
      speed: {
        title: 'Скорость ветра',
        value: `${(wind_kph * 0.2778).toFixed(1)} м/с`,
        icon: "assets/icons/wind.png"
      },
      visibility: {
        title: 'Видимость',
        value: `${vis_km > 1 ? vis_km + 'км' : vis_km * 1000 + 'м'}`,
        icon: "assets/icons/visibility.png"
      },
      pressure: {
        title: 'Давление',
        value: `${Math.round(pressure_in)} гПа`,
        icon: "assets/icons/pressure.png"
      },
      uvIndex: {
        title: 'УФ-индекс',
        value: uv,
        icon: "assets/icons/uv-index.png"
      },
      feelsLike: {
        title: 'Ощущается как',
        value: feelslike_c
      },
      tempC: `${temp_c.toFixed()} °`,
      tempF: `${temp_f.toFixed()} °`,
      condition: {
        icon: `https:${condition.icon}`,
        text: condition.text
      }
    },
    history: state.history.includes(name) ? state.history : [...state.history.slice(-4), name]
  }

  return newState
}