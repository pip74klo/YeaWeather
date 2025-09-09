export function getCurrentTime(element) {
  const currentTime = new Date().toLocaleTimeString('en-Us', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
  element.textContent = currentTime.toLowerCase()
}