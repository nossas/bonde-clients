export const isLoading = state => state.mobilizations.templates.loading

export const isLoaded = state => state.mobilizations.templates.isLoaded

export const getGlobalTemplates = state => state.mobilizations.templates.global

export const getCustomTemplates = state => state.mobilizations.templates.custom

export const getFilterableTemplates = state => state.mobilizations.templates.filterable.list

export const getSelectableIndex = state => state.mobilizations.templates.selectable.selectedIndex
