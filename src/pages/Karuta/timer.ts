import { ref } from 'vue'

const useTimer = () => {
  const time = ref({ min: 3, sec: 0 })
  let timerId: number
  let isActive = false
  const count = () => {
    if (time.value.sec > 0) {
      time.value.sec--
    } else if (time.value.min > 0) {
      time.value.min--
      time.value.sec = 59
    } else {
      clearInterval(timerId)
    }
  }
  const startCountdown = (min: number) => {
    if (min < 0 || isActive) return
    time.value.min = min
    time.value.sec = 0
    timerId = setInterval(count, 1000)
    isActive = true
  }
  const stopCountdown = () => {
    if (!isActive) return
    clearInterval(timerId)
    isActive = false
  }
  return { time, startCountdown, stopCountdown }
}

export default useTimer
