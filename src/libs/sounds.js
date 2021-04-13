export const clapForCount = (count) => {
  switch (count) {
    case 1:
      new Audio(require('@/assets/sounds/clap-loud.mp3')).play()
      break
    case 5:
      new Audio(require('@/assets/sounds/clap-surprise.mp3')).play()
      break
    default:
      new Audio(require('@/assets/sounds/clap-fake.mp3')).play()
      break
  }
}
