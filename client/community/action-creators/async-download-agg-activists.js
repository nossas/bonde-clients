import downloadjs from 'downloadjs'

const asyncDownloadAggActivists = ({ id, name, ...community }) => (dispatch, getState, { api }) => {
  const { auth: { credentials } } = getState()

  return api
    .get(`/communities/${id}/agg_activists.csv`, { headers: credentials })
    .then(({ status, data }) => {
      if (status === 400 && data.errors) {
        return Promise.reject({ ...data.errors })
      } else if (status === 200) {
        if (data.length > 0) {
          downloadjs(
            new Blob([data]),
            `[Relatório Consolidado][Ações dos Ativistas] ${name}.csv`,
            'text/csv'
          )
          return Promise.resolve()
        }
      }
    })
    .catch(error => Promise.reject(error))
}

export default asyncDownloadAggActivists
