import React, {PropTypes} from 'react'
import { reduxForm } from 'redux-form'
import ReactS3Uploader from 'react-s3-uploader'

import { CloseButton, Label, InputCounter, SaveButton } from '../../components'

import * as Paths from '../../Paths'
import * as Selectors from '../MobilizationSelectors'
import * as MobilizationActions from '../MobilizationActions'


class MobilizationSharingPage extends React.Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      isFacebookShareImageUploading: false,
      edited: false
    }
  }

  componentWillReceiveProps(nextProps) {
    const { submitting } = this.props
    if (submitting !== nextProps.submitting) {
      this.setState({
        edited: submitting && !nextProps.submitting
      })
    }
  }

  render() {
    const {
      fields: { facebook_share_image, facebook_share_title, facebook_share_description, twitter_share_text },
      handleSubmit, submitting, error
    } = this.props
    const { mobilization, credentials, edit, ...props } = this.props

    const { isFacebookShareImageUploading } = this.state

    return (
      <div className="p3 col col-8">
        <div className="h5 caps bold flex flex-center mb2">
          <i className="fa fa-facebook-square mr1" style={{fontSize: '2em'}} />
          <span>Postagem de Facebook</span>
        </div>
        <p className="h5 mb3">
          Configure as informações do post que será publicado no Facebook
          sempre que alguém compartilhar a ação.
        </p>
        <form onSubmit={handleSubmit((values, dispatch) => dispatch(edit(credentials, { ...mobilization, ...values })))}>
          <div className="mb3">
            <Label htmlFor="facebookShareImage">Imagem</Label>
            <div className="border rounded p2 bg-white center">
              {facebook_share_image.value ? <img src={facebook_share_image.value} /> : <i className="fa fa-image silver mb2" style={{fontSize: '5em'}} />}
              <div className="mb1">Sua imagem deve ter 470x270 pixels</div>
              <div className="overflow-hidden">
                { isFacebookShareImageUploading
                  ? <i className="fa fa-spin fa-refresh" />
                  : <ReactS3Uploader
                    id="facebookShareImage"
                    signingUrl={`${process.env.API_URL}/uploads`}
                    accept="image/*"
                    onProgress={() => !isFacebookShareImageUploading && this.setState({ isFacebookShareImageUploading: true })}
                    onFinish={(image) => {
                      const imageUrl = image.signedUrl.substring(0, image.signedUrl.indexOf('?'))
                      facebook_share_image.onChange(imageUrl)
                      this.setState({ isFacebookShareImageUploading: false })
                    }}
                  />
                }
              </div>
            </div>
          </div>
          <div className="mb3">
            <Label htmlFor="facebookShareTitle">Título</Label>
            <InputCounter
              maxLength={70}
              length={facebook_share_title.value ? facebook_share_title.value.length : 0}
              classNames={['right']}
            />
            <input
              id="facebookShareTitle"
              maxLength={70}
              type="text"
              className="field-light block full-width"
              placeholder="Um título direto que passe a ideia da sua mobilização"
              {...facebook_share_title}
            />
          </div>
          <div className="mb3">
            <Label htmlFor="facebookShareDescription">Subtítulo</Label>
            <InputCounter
              maxLength={90}
              length={facebook_share_description.value ? facebook_share_description.value.length : 0}
              classNames={['right']}
            />
            <textarea
              id="facebookShareDescription"
              maxLength={90}
              className="field-light block full-width"
              placeholder="Complete a informação do título e chame o leitor para a mobilização"
              {...facebook_share_description}
            />
          </div>

          <div className="h5 caps bold flex flex-center mb2">
            <i className="fa fa-twitter-square mr1" style={{fontSize: '2em'}} />
            <span>Postagem de Twitter</span>
          </div>
          <p className="h5 mb3">
            Configure a mensagem que será publicada no Twitter
            sempre que alguém compartilhar sua mobilização.
          </p>
          <div className="mb3">
            <Label htmlFor="twitterShareText">Texto do Tweet</Label>
              <InputCounter
                maxLength={140}
                length={twitter_share_text.value ? twitter_share_text.value.length : 0}
                classNames={['right']}
              />
            <textarea
              id="twitterShareText"
              maxLength={140}
              className="field-light block full-width"
              placeholder={ "Insira uma frase e chame o leitor para a mobilização" }
              {...twitter_share_text}
            />
          </div>

          <div>
            <input
              type="submit"
              className="caps button bg-aqua h3 mt1 p2"
              disabled={submitting || !props.dirty}
              value={submitting ? 'Salvando...' : 'Salvar'}
            />
          </div>
        </form>
        <CloseButton dirty={props.dirty} path={Paths.editMobilization(mobilization.id)} />
      </div>
    )
  }
}

MobilizationSharingPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,

  mobilization: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired
}

const fields = ['facebook_share_title', 'facebook_share_description', 'facebook_share_image', 'twitter_share_text']

export default reduxForm({
  form: 'mobilizationForm',
  fields
},
(state, ownProps) => {
  const mobilization = Selectors.getMobilization(state, ownProps)
  return {
    mobilization: mobilization,
    initialValues: mobilization || {},
    credentials: state.auth.credentials
  }
}, { ...MobilizationActions })(MobilizationSharingPage)
