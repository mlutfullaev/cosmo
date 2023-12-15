import axios from 'axios'

export function useHelpers () {
  function updateMeta (meta: { description?: string, keywords?: string, title?: string }) {
    if (meta.description) {
      const description = document.querySelector('meta[name="description"]')
      if (description) {
        description.setAttribute('content', meta.description)
      }
    }

    if (meta.keywords) {
      const keywords = document.querySelector('meta[name="keywords"]')
      if (keywords) {
        keywords.setAttribute('content', meta.keywords)
      }
    }

    if (meta.title) {
      document.title = meta.title
    }
  }

  function validateEmail (email: string): boolean {
    return !!email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }

  async function sendEmail (email: string) {
    return await axios.post(`https://api-www.beautyid.app/subscribe/email?subscriberEmail=${email}`)
  }

  return { updateMeta, validateEmail, sendEmail }
}
