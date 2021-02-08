import { ref, Ref } from 'vue'

const NUMBER_OF_CARDS = 46
const NUMBER_OF_DISPLAY_CARDS = 12
export enum GameState {
  Start,
  Playing,
  Pose,
  Finished
}
const Timelimit = {
  '150秒': 150,
  '100秒': 100,
  '70秒': 70,
  '45秒': 45,
  '30秒': 30
}

const pickRandomCards = (list: number[], len: number) => {
  const arr: number[] = []
  for (let i = 1; i <= len; i++) {
    const index = Math.floor(Math.random() * Math.floor(list.length))
    arr.push(list[index])
    list[index] = list[list.length - 1]
    list.pop()
  }
  return arr
}

const getRandomNum = (max: number) =>
  Math.floor(Math.random() * Math.floor(max))

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useKaruta = (
  time: Ref<number>,
  startCountdown: (time: number) => void,
  stopCountdown: () => void
) => {
  const state = ref<GameState>(GameState.Start)
  const failed = ref(false)
  let timerId: number | undefined
  const remaining = [...Array(NUMBER_OF_CARDS).keys()]
  const obtained = ref<number[]>([])
  const targets = ref(pickRandomCards(remaining, NUMBER_OF_DISPLAY_CARDS))
  targets.value.forEach(card => remaining.splice(remaining.indexOf(card), 1))
  const currentTarget = ref(
    targets.value[getRandomNum(NUMBER_OF_DISPLAY_CARDS)]
  )
  const onStart = (timelimit: number) => {
    if (state.value !== GameState.Start) return
    currentTarget.value = targets.value[getRandomNum(targets.value.length)]
    state.value = GameState.Playing
    startCountdown(timelimit)
  }
  const onFinish = () => {
    stopCountdown()
    state.value = GameState.Finished
  }
  const onTap = (card: number) => {
    if (state.value !== GameState.Playing || time.value <= 0) return
    if (card === currentTarget.value) {
      obtained.value.push(currentTarget.value)
      if (remaining.length > 0) {
        const additional = pickRandomCards(remaining, 1)[0]
        remaining.splice(targets.value.indexOf(additional), 1)
        targets.value[targets.value.indexOf(card)] = additional
      } else {
        targets.value.splice(targets.value.indexOf(card), 1)
      }
      targets.value = targets.value.sort(() => Math.random() - 0.5)
      currentTarget.value = targets.value[getRandomNum(targets.value.length)]
    } else {
      failed.value = true
      timerId = timerId
        ? timerId
        : setTimeout(() => {
            failed.value = false
            timerId = undefined
          }, 1500)
      if (time.value > 5) {
        time.value -= 5
      } else {
        time.value = 0
      }
    }
  }
  return {
    state,
    failed,
    obtained,
    targets,
    currentTarget,
    onStart,
    onFinish,
    onTap,
    Timelimit
  }
}

export default useKaruta
