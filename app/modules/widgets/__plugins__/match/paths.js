export const matchChoicesMobilizationWidget = (mobilizationId, widgetId) => {
  return `/mobilizations/${mobilizationId}/widgets/${widgetId}/matches/choices`
}

export const matchGoalsMobilizationWidget = (mobilizationId, widgetId) => {
  return `/mobilizations/${mobilizationId}/widgets/${widgetId}/matches/goals`
}

export const shareMatchWrapper = (widgetId, matchId) => {
  return `/widgets/${widgetId}/matches/${matchId}/share`
}
