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

  return { updateMeta }
}
