export function renderInfo(state, infoElement) {
  const { city, tempC, tempF } = state.weather
  const { unit } = state.settings
  const { text, icon } = state.weather.condition

  infoElement.innerHTML = `
  <div class="info__title">
    <p class="info__title-text">${city}</p>
    <span class="info__title-img"></span>
  </div>
  <p class="info__title-temp">${unit === 'C' ? tempC : tempF}</p>
  <div class="info__desc">
    <p>${text}</p>
    <img
      class="info__condition"
      src=${icon}
      alt="icon"
    />
  </div>`
}

export function renderWeatherMetric(state, weatherElement) {
  const weatherList = ['cloud', 'humidity', 'speed', 'visibility', 'pressure', 'uvIndex']

  weatherElement.innerHTML = weatherList.map(weatherItem => {
    const title = state.weather[weatherItem].title
    const value = state.weather[weatherItem].value
    const icon = state.weather[weatherItem].icon

    return `
      <div class="weather-metric">
        <div class="weather-metric__icon">
          <img src=${icon} alt=${title} />
        </div>
        <div class="weather-metric__info">
          <div class="weather-metric__value">${value}</div>
          <div class="weather-metric__description">${title}</div>
        </div>
      </div>`
  }).join('')
}

export function renderHistory(state, historyListElement) {
  if (!state.history.length) {
    historyListElement.textContent = 'Начните поиск, чтобы сохранить города в истории...'
  } else {
    historyListElement.innerHTML = state.history.map(item => `<li class="history__item">${item}</li>`).join('')
  }
}