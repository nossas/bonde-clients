const prefix = (mobilizationId, widgetId, path) =>
  `/mobilizations/${mobilizationId}/widgets/${widgetId}/${path}`

export const formPressureWidget = (mid, wid) => prefix(mid, wid, 'pressure')
export const emailPressureWidget = (mid, wid) => prefix(mid, wid, 'pressure/email')
export const finishPressureWidget = (mid, wid) => prefix(mid, wid, 'pressure/finish')
