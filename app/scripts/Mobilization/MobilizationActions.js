import request from 'superagent'

import * as Paths from '../Paths'

// Constants

export const REQUEST_FETCH_MOBILIZATIONS = 'REQUEST_FETCH_MOBILIZATIONS'
export const SUCCESS_FETCH_MOBILIZATIONS = 'SUCCESS_FETCH_MOBILIZATIONS'
export const FAILURE_FETCH_MOBILIZATIONS = 'FAILURE_FETCH_MOBILIZATIONS'

export const REQUEST_ADD_MOBILIZATION = 'REQUEST_ADD_MOBILIZATION'
export const SUCCESS_ADD_MOBILIZATION = 'SUCCESS_ADD_MOBILIZATION'
export const FAILURE_ADD_MOBILIZATION = 'FAILURE_ADD_MOBILIZATION'

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

// TODO: Validar qual a melhor forma de escrever as actions
// Original code ~ app/scripts/actions/MobilizationActions.js
export const addMobilization = ({ credentials, mobilization, transitionTo }) => {
  return {
    types: [REQUEST_ADD_MOBILIZATION, SUCCESS_ADD_MOBILIZATION, FAILURE_ADD_MOBILIZATION],
    promise: () => {
      return new Promise((resolve, reject) => {
        request
          .post(`${process.env.API_URL}/mobilizations`)
          .set(credentials)
          .send({ mobilization })
          .end((err, res) => {
            if (err || !res.ok) {
              reject(err || res.body)
            } else {
              resolve(res.body)
              // TODO: Velidar se aqui é o melhor local a se redirecionar
              // levar em consideração dificuldade de testar essa chamada
              if (res.body.id) {
                transitionTo(Paths.cityNewMobilization(res.body.id))
              }
            }
          })
      })
    }
  }
}

export const mobilizationsIsLoaded = (globalState) => {
  return globalState.mobilization.loaded
}


