import request from 'superagent'

// Constants

export const REQUEST_FETCH_MOBILIZATIONS = 'REQUEST_FETCH_MOBILIZATIONS'
export const SUCCESS_FETCH_MOBILIZATIONS = 'SUCCESS_FETCH_MOBILIZATIONS'
export const FAILURE_FETCH_MOBILIZATIONS = 'FAILURE_FETCH_MOBILIZATIONS'

// Actions
// TODO: Buscar uma maneira mais clara de fazer isso

export const fetchMobilizations = () => {
  return {
    types: [REQUEST_FETCH_MOBILIZATIONS, SUCCESS_FETCH_MOBILIZATIONS, FAILURE_FETCH_MOBILIZATIONS],
    promise: () => {
      return new Promise((resolve, reject) => {
        request
          .get(`${process.env.API_URL}/mobilizations`)
          .end((err, res) => {
            if (err || !res.ok) {
              reject(err || res.body)
            } else {
              resolve(res.body)
            }
          })
      })
    }
  }
}

export const mobilizationsIsLoaded = (globalState) => {
  const { mobilization: { objects } } = globalState
  return objects.loaded
}
