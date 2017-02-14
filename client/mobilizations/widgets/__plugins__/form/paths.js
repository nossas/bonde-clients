const prefix = (mobilizationId, widgetId, slug) =>
  `/mobilizations/${mobilizationId}/widgets/${widgetId}/${slug}`

export const fieldsMobilizationWidget = (mobilizationId, widgetId) =>
  prefix(mobilizationId, widgetId, 'form/fields')

export const formMobilizationWidget = (mobilizationId, widgetId) =>
  prefix(mobilizationId, widgetId, 'form')

export const widgetFormSettingsFinish = (mobilizationId, widgetId) =>
  prefix(mobilizationId, widgetId, 'form/finish')
