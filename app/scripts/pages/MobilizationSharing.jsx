import React, { PropTypes } from 'react'
import { ConfigurationsMenu } from './../components'
import reduxForm from 'redux-form'
import { connect } from 'react-redux'
import * as MobilizationActions from './../actions/MobilizationActions'
import ReactS3Uploader from 'react-s3-uploader'

@connect(state => ({ form: state.mobilizationSharing }))
@reduxForm('mobilizationSharing')

export default class MobilizationSharing extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    mobilization: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context)

    this.state = {
      isFacebookShareImageUploading: false
    }

    const { mobilization } = props
    props.initializeForm({
      facebook_share_title: mobilization.facebook_share_title,
      facebook_share_description: mobilization.facebook_share_description
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { data, dispatch, mobilization, auth } = this.props

    dispatch(MobilizationActions.editMobilization({
      id: mobilization.id,
      credentials: auth.credentials,
      mobilization: {
        facebook_share_title: data.facebook_share_title,
        facebook_share_description: data.facebook_share_description
      }
    }))
  }

  handleFacebookShareImageUploadProgress() {
    if (!this.state.isFacebookShareImageUploading) {
      this.setState({isFacebookShareImageUploading: true})
    }
  }

  handleFacebookShareImageUploadFinish() {
    this.setState({isFacebookShareImageUploading: false})
  }

  render() {
    const {
      data: { facebook_share_title, facebook_share_description },
      handleBlur, handleChange
    } = this.props

    const { isFacebookShareImageUploading } = this.state

    return (
      <div className="flex-auto bg-silver gray">
        <ConfigurationsMenu {...this.props} />
        <div className="p3 col col-8">
          <div className="h5 caps bold flex flex-center mb2">
            <i className="fa fa-facebook-square mr1" style={{fontSize: '2em'}} />
            <span>Share de Facebook</span>
          </div>
          <p className="h5 mb3">
            Configure o post que será publicado no Facebook sempre que alguém
            compartilhar a ação. É importante que esses textos sejam cativantes
            e curtos para não aparecerem cortados. :)
          </p>
          <form onSubmit={::this.handleSubmit}>
            <div className="flex mb2">
              <div className="mr2">
                <label className="h5 bold caps">Imagem</label>
                <div className="border rounded p2 bg-white center" style={{width: '12em'}}>
                  <i className="fa fa-image silver mb2" style={{fontSize: '5em'}} />
                  <div className="mb1">A imagem deve ter no mínimo 200x200px</div>
                  <div className="overflow-hidden">
                    { isFacebookShareImageUploading ?
                      <i className="fa fa-spin fa-refresh" /> :
                      <ReactS3Uploader
                        signingUrl={`${process.env.API_URL}/uploads`}
                        accept="image/*"
                        onProgress={::this.handleFacebookShareImageUploadProgress}
                        onFinish={::this.handleFacebookShareImageUploadFinish}
                      />
                    }
                  </div>
                </div>
              </div>
              <div className="flex-auto">
                <div className="mb2">
                  <label className="h5 bold caps">Título do post</label>
                  <textarea
                    className="field-light block full-width"
                    value={facebook_share_title}
                    onChange={handleChange('facebook_share_title')}
                    onBlur={handleBlur('facebook_share_title')}
                  />
                </div>
                <div>
                  <label className="h5 bold caps">Subtítulo do post</label>
                  <textarea
                    className="field-light block full-width"
                    value={facebook_share_description}
                    onChange={handleChange('facebook_share_description')}
                    onBlur={handleBlur('facebook_share_description')}
                  />
                </div>
              </div>
            </div>
            <div>
              <button className="button bg-aqua h3" onClick={::this.handleSubmit}>
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
