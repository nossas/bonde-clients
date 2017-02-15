const makePressureWidget = (mobilizationId, widgetId, path) =>
  `/mobilizations/${mobilizationId}/widgets/${widgetId}/${path}`

export const formPressureWidget = (mid, wid) => makePressureWidget(mid, wid, 'pressure')
export const emailPressureWidget = (mid, wid) => makePressureWidget(mid, wid, 'pressure/email')
export const finishPressureWidget = (mid, wid) => makePressureWidget(mid, wid, 'pressure/finish')
