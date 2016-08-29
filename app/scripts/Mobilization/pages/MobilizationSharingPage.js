import { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import ReactS3Uploader from 'react-s3-uploader'

import { Label, InputCounter } from '../../components'
import * as Selectors from '../MobilizationSelectors'
import * as MobilizationActions from '../MobilizationActions'
import {
  FormRedux,
  FormGroup,
  ControlLabel,
  FormControl
} from '../../Dashboard/Forms'

const MobilizationSharingPage = ({
  ...rest,
  fields: {
    facebook_share_image: facebookShareImage,
    facebook_share_title: facebookShareTitle,
    facebook_share_description: facebookShareDescription,
    twitter_share_text: twitterShareText
  },
  dispatch,
  mobilization,
  credentials,
  isFacebookShareImageUploading,
  // Actions
  edit,
  progressUploadFacebookImage,
  finishUploadFacebookImage
}) => {
  const handleSubmit = (values, dispatch) =>
    dispatch(edit(credentials, { ...mobilization, ...values }))

  return (
    <div className="p3 col col-8">
      <div className="h5 caps bold flex flex-center mb2">
        <i className="fa fa-facebook-square mr1" style={{ fontSize: '2em' }} />
        <span>Postagem de Facebook</span>
      </div>
      <p className="h5 mb3">
        Configure as informações do post que será publicado no Facebook
        sempre que alguém compartilhar a ação.
      </p>

      <FormRedux onSubmit={handleSubmit} {...rest}>
        <div className="mb3">
          <Label htmlFor="facebookShareImage">Imagem</Label>
          <div className="border rounded p2 bg-white center">
            {
              facebookShareImage.value ?
              <img src={facebookShareImage.value} /> :
              <i className="fa fa-image silver mb2" style={{ fontSize: '5em' }} />
            }
            <div className="mb1">Sua imagem deve ter 470x270 pixels</div>
            <div className="overflow-hidden">
              {
                isFacebookShareImageUploading
                ? <i className="fa fa-spin fa-refresh" />
                : <ReactS3Uploader
                  id="facebookShareImage"
                  signingUrl={`${process.env.API_URL}/uploads`}
                  accept="image/*"
                  onProgress={() =>
                    !isFacebookShareImageUploading && dispatch(progressUploadFacebookImage())
                  }
                  onFinish={image => {
                    const imageUrl = image.signedUrl.substring(0, image.signedUrl.indexOf('?'))
                    facebookShareImage.onChange(imageUrl)
                    dispatch(finishUploadFacebookImage())
                  }}
                />
              }
            </div>
          </div>
        </div>

        <FormGroup controlId="facebookShareTitle" {...facebookShareTitle}>
          <ControlLabel>
            Título
            <InputCounter
              maxLength={70}
              length={facebookShareTitle.value ? facebookShareTitle.value.length : 0}
              classNames={['right', 'regular']}
            />
          </ControlLabel>
          <FormControl
            type="text"
            placeholder="Um título direto que passe a ideia da sua mobilização"
            maxLength={70}
          />
        </FormGroup>

        <FormGroup controlId="facebookShareDescription" {...facebookShareDescription}>
          <ControlLabel>
            Subtítulo
            <InputCounter
              maxLength={90}
              length={facebookShareDescription.value ? facebookShareDescription.value.length : 0}
              classNames={['right', 'regular']}
            />
          </ControlLabel>
          <FormControl
            type="text"
            placeholder="Complete a informação do título e chame o leitor para a mobilização"
            maxLength={90}
          />
        </FormGroup>

        <div className="h5 caps bold flex flex-center mb2">
          <i className="fa fa-twitter-square mr1" style={{fontSize: '2em'}} />
          <span>Postagem de Twitter</span>
        </div>
        <p className="h5 mb3">
          Configure a mensagem que será publicada no Twitter
          sempre que alguém compartilhar sua mobilização.
        </p>

        <FormGroup controlId="twitterShareText" {...twitterShareText}>
          <ControlLabel>
            Texto do Tweet
            <InputCounter
              maxLength={140}
              length={twitterShareText.value ? twitterShareText.value.length : 0}
              classNames={['right', 'regular']}
            />
          </ControlLabel>
          <FormControl
            componentClass='textarea'
            placeholder="Insira uma frase e chame o leitor para a mobilização"
            maxLength={140}
          />
        </FormGroup>
      </FormRedux>
    </div>
  )
}

MobilizationSharingPage.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  mobilization: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isFacebookShareImageUploading: PropTypes.bool.isRequired,
  // Actions
  edit: PropTypes.func.isRequired,
  progressUploadFacebookImage: PropTypes.func.isRequired,
  finishUploadFacebookImage: PropTypes.func.isRequired
}

MobilizationSharingPage.defaultProps = {
  isFacebookShareImageUploading: false
}

const fields = [
  'facebook_share_title',
  'facebook_share_description',
  'facebook_share_image',
  'twitter_share_text'
]
const mapStateToProps = (state, ownProps) => {
  const mobilization = Selectors.getMobilization(state, ownProps)
  return {
    mobilization,
    initialValues: mobilization || {},
    credentials: state.auth.credentials,
    isFacebookShareImageUploading: state.mobilization.isFacebookShareImageUploading
  }
}

export default reduxForm({
  form: 'mobilizationForm',
  fields
}, mapStateToProps, { ...MobilizationActions })(MobilizationSharingPage)
