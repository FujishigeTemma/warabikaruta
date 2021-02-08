import { ref } from 'vue'

const useTimer = () => {
  const time = ref(150)
  let timerId: number | undefined
  let isActive = false
  const count = () => {
    if (time.value > 0) {
      time.value--
    } else {
      clearInterval(timerId)
      timerId = undefined
    }
  }
  const startCountdown = (timelimit: number) => {
    if (timelimit < 0 || isActive) return
    time.value = timelimit
    timerId = timerId ? timerId : setInterval(count, 1000)
    isActive = true
  }
  const stopCountdown = () => {
    if (!isActive) return
    clearInterval(timerId)
    timerId = undefined
    isActive = false
  }
  return { time, startCountdown, stopCountdown }
}

export default useTimer
