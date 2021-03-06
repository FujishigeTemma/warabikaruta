const playAudio = (src: string) => {
  return new Promise(function (resolve, reject) {
    // return a promise
    const audio = new Audio() // create audio wo/ src
    audio.preload = 'auto' // intend to play through
    audio.autoplay = true // autoplay when loaded
    audio.onerror = reject // on error, reject
    audio.onended = resolve // when done, resolve

    audio.src = src
  })
}

export default playAudio
