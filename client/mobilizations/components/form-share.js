import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import DefaultServerConfig from '~server/config'
import { FormGroup, ControlLabel, FormControl, UploadImageField } from '~client/components/forms'

const FormShare = ({
  FormComponent,
  fields: {
    facebook_share_image: facebookShareImage,
    facebook_share_title: facebookShareTitle,
    facebook_share_description: facebookShareDescription,
    twitter_share_text: twitterShareText
  },
  ...formProps
}) => (
  <FormComponent {...formProps}>
    <div className='h5 caps bold mb2 inline'>
      <i className='fa fa-facebook-square align-middle' style={{ fontSize: 32 }} />
      <span className='align-middle pl2 h6'>Share de Facebook</span>
    </div>
    <p className='mb2 lightgray'>
      Configure o post que será publicado no Facebook sempre que alguém compartilhar a ação.
      É importante que esses textos sejam cativantes e curtos para não aparecerem cortados. :)
    </p>

    <div className='col-12'>
      <FormGroup
        contorlId='facebookShareImage'
        className='form-group col col-5 mb3'
        style={{ paddingRight: '.7rem' }}
        {...facebookShareImage}
      >
        <ControlLabel>Imagem</ControlLabel>
        <div
          className='border border-gray94 rounded p2 bg-white center relative overflow-hidden'
          style={{ height: '220px' }}
        >
          <div className='clearfix'>
            {facebookShareImage ? (
              <div
                className='bg-cover square'
                style={{ backgroundImage: `url(${facebookShareImage.value})` }}
              />
            ) : (
              <div className='square-float'>
                <i className='fa fa-image silver mt2 mb1' style={{ fontSize: '5em' }} />
              </div>
            )}
            <div className={facebookShareImage ? 'hide' : null}>
              <div className='mb1 gray'>Sua imagem deve ter 470x270 pixels</div>
            </div>
            <div className='overflow-hidden'>
              <UploadImageField
                theme='classic'
                signingUrl={`${DefaultServerConfig.apiUrl}/uploads`}
              />
            </div>
          </div>
        </div>
      </FormGroup>

      <div className='col col-7'>
        <FormGroup
          {...facebookShareTitle}
          controlId='facebookShareTitle'
          style={{ paddingLeft: '0' }}
        >
          <ControlLabel className='ml1' maxLength={70}>Título do post</ControlLabel>
          <FormControl
            maxLength={70}
            placeholder='Um título direto que passe a ideia da sua mobilização'
          />
        </FormGroup>

        <FormGroup
          controlId='facebookShareDescription'
          style={{ paddingLeft: '0' }}
          {...facebookShareDescription}
        >
          <ControlLabel className='ml1' maxLength={90}>Subtítulo do post</ControlLabel>
          <FormControl
            componentClass='textarea'
            rows={7}
            maxLength={90}
            placeholder='Complete a informação do título e chame o leitor para a mobilização'
          />
        </FormGroup>
      </div>
    </div>

    <div className='separator' />

    <div className='col col-12'>
      <div className='h5 caps bold mb2 inline'>
        <i className='fa fa-twitter  align-middle' style={{ fontSize: 32 }} />
        <span className='align-middle pl2 h6'>Share de Twitter</span>
      </div>
      <p className='mb2 lightgray'>
        Configure a mensagem que será publicada no Twitter
        sempre que alguém compartilhar sua mobilização.
      </p>

      <FormGroup controlId='twitterShareText' {...twitterShareText}>
        <ControlLabel maxLength={140}>Texto do Tweet</ControlLabel>
        <FormControl
          componentClass='textarea'
          rows={5}
          maxLength={140}
          placeholder='Insira uma frase e chame o leitor para a mobilização'
        />
      </FormGroup>
    </div>
  </FormComponent>
)

FormShare.propTypes = {
  FormComponent: PropTypes.node,
  fields: PropTypes.shape({
    facebook_share_image: PropTypes.object.isRequired,
    facebook_share_title: PropTypes.object.isRequired,
    facebook_share_description: PropTypes.object.isRequired,
    twitter_share_text: PropTypes.object.isRequired
  }).isRequired
}

const fields = [
  'id',
  'facebook_share_image',
  'facebook_share_title',
  'facebook_share_description',
  'twitter_share_text'
]

export default (
  mapStateToProps = () => {},
  mapDispatchToProps = {},
  validate = () => ({})
) => reduxForm(
  { form: 'mobilizationShareForm', fields, validate },
  mapStateToProps,
  mapDispatchToProps
)(FormShare)
