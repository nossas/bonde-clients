import request from 'superagent'

// Constants

export const REQUEST_FETCH_MOBILIZATIONS = 'REQUEST_FETCH_MOBILIZATIONS'
export const SUCCESS_FETCH_MOBILIZATIONS = 'SUCCESS_FETCH_MOBILIZATIONS'
export const FAILURE_FETCH_MOBILIZATIONS = 'FAILURE_FETCH_MOBILIZATIONS'

export const SUCCESS_ADD_MOBILIZATION = 'SUCCESS_ADD_MOBILIZATION'
export const SUCCESS_EDIT_MOBILIZATION = 'SUCCESS_EDIT_MOBILIZATION'

export const PROGRESS_UPLOAD_FACEBOOK_IMAGE = 'PROGRESS_UPLOAD_FACEBOOK_IMAGE'
export const FINISH_UPLOAD_FACEBOOK_IMAGE = 'FINISH_UPLOAD_FACEBOOK_IMAGE'

// Actions
// TODO: Buscar uma maneira mais clara de fazer isso

export const fetchMobilizations = (queryFilter = {}) => ({
  types: [
    REQUEST_FETCH_MOBILIZATIONS,
    SUCCESS_FETCH_MOBILIZATIONS,
    FAILURE_FETCH_MOBILIZATIONS
  ],
  promise: () => new Promise((resolve, reject) => {
    request
      .get(`${process.env.API_URL}/mobilizations`)
      .send(queryFilter)
      .end((err, res) => {
        if (err || !res.ok) reject(err || res.body)
        else resolve(res.body)
      })
  })
})

const addMobilizationSuccess = mobilization => ({ type: SUCCESS_ADD_MOBILIZATION, mobilization })
export const add = (credentials, mobilization, next) => dispatch =>
  new Promise((resolve, reject) => {
    request
      .post(`${process.env.API_URL}/mobilizations`)
      .set(credentials)
      .send({ mobilization })
      .end((err, res) => {
        if (err || !res.ok) reject({ _error: `Response Error: ${err.status}` })
        else {
          dispatch(addMobilizationSuccess(res.body))
          // TODO: I don't know if the better place.
          next && next(res.body)
          resolve()
        }
      })
  })

const editMobilizationSuccess = mobilization => ({ type: SUCCESS_EDIT_MOBILIZATION, mobilization })
export const edit = (credentials, mobilization, next) => dispatch =>
  new Promise((resolve, reject) => {
    request
      .put(`${process.env.API_URL}/mobilizations/${mobilization.id}`)
      .set(credentials)
      .send({ mobilization })
      .end((err, res) => {
        if (err || !res.ok) reject({ _error: `Response Error: ${err.status}` })
        else {
          dispatch(editMobilizationSuccess(res.body))
          next && next(res.body)
          resolve()
        }
      })
  })

export const mobilizationsIsLoaded = state => state.mobilization.loaded
export const progressUploadFacebookImage = () => ({ type: PROGRESS_UPLOAD_FACEBOOK_IMAGE })
export const finishUploadFacebookImage = () => ({ type: FINISH_UPLOAD_FACEBOOK_IMAGE })
