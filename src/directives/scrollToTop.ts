export default {
  created (button: HTMLElement) {
    window.onscroll = () => {
      if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        button.classList.add('active')
      } else {
        button.classList.remove('active')
      }
    }
    button.onclick = () => {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
