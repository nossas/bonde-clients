import React from 'react'

import { FormRedux, Button, FormGroup, ControlLabel, FormControl, FormError } from '~components/forms'
import { PageCentralizedStepsLayout } from '~mobilizations/components'

const MobilizationsSettingsDomainPage = props => {
  const { location, mobilization, fields: { custom_domain: customDomain }, ...formProps } = props

  return (
    <PageCentralizedStepsLayout
      {...{ mobilization, location }}
      title='Lançando sua Mobilização'
    >
      <FormRedux
        className='bg-white rounded left-align'
        onSubmit={() => { console.log('submited!') }} {...formProps}
        nosubmit
      >
        <h3 className='h2 mt2 pt2 mb3 bold center'>
          Configura o domínio
        </h3>
        <p className='h5 mx3'>
          Você pode personalizar o endereço da sua mobilização caso já tenha um domínio.
          Preencha o campo abaixo e clique em Salvar.
        </p>
        <FormGroup controlId='customDomain' {...customDomain}>
          <ControlLabel>Domínio personalizado</ControlLabel>
          <FormControl
            type='text'
            placeholder='www.meudominio.com.br'
            style={{ height: 40, borderBottom: '1px solid #ebebeb' }}
          />
        </FormGroup>
        <Button className='btn bg-blacker white col-12 rounded-bottom py2 caps mt3'>
          {formProps.submitting ? 'Salvando...' : 'Lançar mobilização'}
        </Button>
        <FormError className='mt2' />
      </FormRedux>
    </PageCentralizedStepsLayout>
  )
}

export default MobilizationsSettingsDomainPage
