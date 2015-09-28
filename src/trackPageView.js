function trackPageView(path, tracker) {
  if (!window.ga) {
    return
  }

  const trackerSend = tracker ? `${tracker}.send` : 'send'
  window.ga(trackerSend, 'pageview', path)
}

export default trackPageView
