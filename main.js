import { setLocalStorage, getLocalStorage, getLocalStorageTheme, setLocalStorageTheme } from "./js/localStorage.js";
import { getCurrentTime } from "./js/getCurrentTime.js";
import { renderInfo, renderWeatherMetric, renderHistory } from "./js/render.js";
import { fetchData } from "./js/fetchData.js";

const toggleSwitchElement = document.querySelector('.toggle__switch');
const imgThemeElement = document.querySelector('.theme__icon')
const bodyElement = document.querySelector('body')
const locationInfoElement = document.querySelector('.location__info')
const weatherElement = document.querySelector('.weather')
const searchFormElement = document.querySelector('.search__form')
const searchInputElement = document.querySelector('.form__input')
const logoTimeElement = document.querySelector('.logo__time')
const loadingElement = document.querySelector('.loading')
const historyListElement = document.querySelector('.history__list')
const historyBtnElement = document.querySelector('.nav__history-btn')
const historyElement = document.querySelector('.history')

let state = {
  settings: {
    theme: 'light',
    unit: 'C',
  },
  history: []
}

async function updateState(stateValue, city) {
  loadingElement.classList.remove('hidden')
  weatherElement.classList.add('hidden')
  try {
    const response = await fetchData(stateValue, city)
    state = response

    weatherElement.classList.remove('weather__start-message', 'hidden')
    setLocalStorage(state.history)
    renderInfo(state, locationInfoElement)
    renderWeatherMetric(state, weatherElement)
  } catch (err) {
    alert('Не удалось получить данные, попробуйте еще раз или измените параметры поиска!')
    console.error(err);
    searchInputElement.focus()
    weatherElement.classList.remove('hidden')
  } finally {
    loadingElement.classList.add('hidden')
    renderHistory(state, historyListElement)
  }
}

searchFormElement.addEventListener('submit', (e) => {
  e.preventDefault()
  const valueInput = searchInputElement.value.trim()
  if (valueInput) {
    updateState(state, valueInput)
    searchInputElement.value = ''
    searchInputElement.blur()
  }
})

toggleSwitchElement.addEventListener('click', () => {
  toggleSwitchElement.classList.toggle('active')
  state.settings.unit = state.settings.unit === 'C' ? 'F' : 'C'

  if (state.weather) {
    renderInfo(state, locationInfoElement)
  }
})

imgThemeElement.addEventListener('click', () => {
  bodyElement.classList.toggle('dark')
  state.settings.theme = state.settings.theme === 'light' ? 'dark' : 'light'
  setLocalStorageTheme(state.settings.theme)
})

historyBtnElement.addEventListener('click', () => {
  historyElement.classList.toggle('active')
  renderHistory(state, historyListElement)
})

historyListElement.addEventListener('click', (e) => {
  if (e.target.classList.contains('history__item')) {
    updateState(state, e.target.textContent)
    historyElement.classList.remove('active')
  }
})

function initApp() {
  getCurrentTime(logoTimeElement)
  state.history = getLocalStorage()
  state.settings.theme = getLocalStorageTheme()
  if (state.settings.theme === 'dark') {
    bodyElement.classList.add('dark')
  }
  setInterval(() => getCurrentTime(logoTimeElement), 1000 * 30)
}

initApp()




