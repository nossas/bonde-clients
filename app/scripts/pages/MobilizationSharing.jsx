import React, {PropTypes} from 'react'
import reduxForm from 'redux-form'
import {connect} from 'react-redux'
import ReactS3Uploader from 'react-s3-uploader'
import {ConfigurationsMenu, CloseButton, Label, InputCounter} from './../components'
import {editMobilization} from './../reducers/mobilizations'
import * as Paths from '../Paths'

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
    dispatch: PropTypes.func.isRequired,
    mobilizations: PropTypes.object.isRequired,
    initializeForm: PropTypes.func.isRequired,
    dirty: PropTypes.bool.isRequired
  }

  constructor(props, context) {
    super(props, context)

    const {initializeForm, mobilization} = props
    initializeForm({
      facebook_share_title: mobilization.facebook_share_title,
      facebook_share_description: mobilization.facebook_share_description,
      facebook_share_image: mobilization.facebook_share_image
    })

    this.state = {
      isFacebookShareImageUploading: false,
      edited: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const {mobilizations} = this.props
    if (mobilizations.editing !== nextProps.mobilizations.editing) {
      this.setState({
        edited: mobilizations.editing && !nextProps.mobilizations.editing
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const { data, dispatch, mobilization, auth } = this.props

    dispatch(editMobilization({
      id: mobilization.id,
      credentials: auth.credentials,
      mobilization: {...data}
    }))

    this.props.initializeForm(this.props.data)
  }

  handleFacebookShareImageUploadProgress() {
    if (!this.state.isFacebookShareImageUploading) {
      this.setState({isFacebookShareImageUploading: true})
    }
  }

  handleFacebookShareImageUploadFinish(image) {
    const imageUrl = image.signedUrl.substring(0, image.signedUrl.indexOf('?'))
    this.props.handleBlur('facebook_share_image')({target: {value: imageUrl}})
    this.setState({isFacebookShareImageUploading: false})
  }

  renderFacebookImage() {
    const {data} = this.props

    return (
      data.facebook_share_image
        ? <img src={data.facebook_share_image} />
        : <i className="fa fa-image silver mb2" style={{fontSize: '5em'}} />
    )
  }

  renderSaveButton() {
    if (this.props.mobilizations.editing) {
      return (
        <button className="button bg-aqua h3 mr1" disabled>
          <i className="fa fa-spin fa-refresh mr1" />
          Salvando...
        </button>
      )
    } else if (this.state.edited && !this.props.dirty) {
      return (
        <button className="button bg-aqua h3 mr1" disabled>
          <i className="fa fa-check mr1" />
          Salvo
        </button>
      )
    }
    return (
      <button className="button bg-aqua h3 mr1" onClick={::this.handleSubmit}>
        Salvar
      </button>
    )
  }

  render() {
    const {
      data: { facebook_share_title, facebook_share_description },
      handleBlur, handleChange
    } = this.props

    const { isFacebookShareImageUploading } = this.state

    return (
      <div className="flex-auto bg-silver gray relative">
        <ConfigurationsMenu {...this.props} />
        <div className="p3 col col-8">
          <div className="h5 caps bold flex flex-center mb2">
            <i className="fa fa-facebook-square mr1" style={{fontSize: '2em'}} />
            <span>Postagem de Facebook</span>
          </div>
          <p className="h5 mb3">
            Configure as informações do post que será publicado no Facebook
            sempre que alguém compartilhar a ação.
          </p>
          <form onSubmit={::this.handleSubmit}>
            <div className="mb3">
              <Label text="Imagem" htmlFor="facebookShareImage" />
              <div className="border rounded p2 bg-white center">
                { this.renderFacebookImage() }
                <div className="mb1">Sugerimos uma imagem de no mínimo 200x200px</div>
                <div className="overflow-hidden">
                  { isFacebookShareImageUploading
                    ? <i className="fa fa-spin fa-refresh" />
                    : <ReactS3Uploader
                      id="facebookShareImage"
                      signingUrl={`${process.env.API_URL}/uploads`}
                      accept="image/*"
                      onProgress={::this.handleFacebookShareImageUploadProgress}
                      onFinish={::this.handleFacebookShareImageUploadFinish}
                    />
                  }
                </div>
              </div>
            </div>
            <div className="mb3">
              <Label text="Título" htmlFor="facebookShareTitle" />
              <InputCounter
                maxLength={70}
                length={facebook_share_title ? facebook_share_title.length : 0}
                classNames={['right']}
              />
              <input
                id="facebookShareTitle"
                maxLength={70}
                type="text"
                className="field-light block full-width"
                value={facebook_share_title}
                onChange={handleChange('facebook_share_title')}
                onBlur={handleBlur('facebook_share_title')}
                placeholder="Um título direto que passe a ideia da sua mobilização"
              />
            </div>
            <div className="mb3">
              <Label text="Subtítulo" htmlFor="facebookShareDescription" />
                <InputCounter
                  maxLength={90}
                  length={facebook_share_description ? facebook_share_description.length : 0}
                  classNames={['right']}
                />
              <textarea
                id="facebookShareDescription"
                maxLength={90}
                className="field-light block full-width"
                value={facebook_share_description}
                onChange={handleChange('facebook_share_description')}
                onBlur={handleBlur('facebook_share_description')}
                placeholder="Complete a informação do título e chame o leitor para a mobilização"
              />
            </div>
            <div>
              { this.renderSaveButton() }
            </div>
          </form>
        </div>
        <CloseButton dirty={this.props.dirty} path={Paths.editMobilization(this.props.mobilization.id)} />
      </div>
    )
  }
}
