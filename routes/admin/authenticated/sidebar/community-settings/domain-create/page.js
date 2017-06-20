import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { intlShape } from 'react-intl'
import { FormRedux, ControlLabel, FormControl, FormGroup } from '~client/components/forms'
import { Button } from '~client/ux/components'
import * as dnsMessages from '~client/community/notifications/dns'
import { Steps, Step } from '~client/steps'
import { DomainStep } from '~client/community/components/dns'
import * as paths from '~client/paths'

var styles = require('exenv').canUseDOM ? require('./page.scss') : {}

class Page extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dns: undefined,
      renderTestConnection: false
    }
  }

  handleTestConnection () {
    const { asyncCheckHostedZone, notify, intl } = this.props
    asyncCheckHostedZone(this.state.dns)
      .then(dns => {
        this.setState({ dns })

        const handleNotify = event => {
          const { id, message: defaultMessage, ...n } = event()
          notify({
            ...n,
            message: intl.formatMessage({ id, defaultMessage })
          })
        }

        if (!dns.ns_ok) handleNotify(dnsMessages.checkDNSFailure)
        else handleNotify(dnsMessages.checkDNSSuccess)
      })
  }

  render () {
    const {
      saving,
      asyncAddHostedZone,
      asyncDeleteHostedZone,
      fields: { domain_name: domainName },
      ...formProps
    } = this.props

    return (
      <div className='page'>
        <Steps
          renderRule={(position, current) => position <= current}
          progressValidations={[
            () => this.state.dns !== undefined,
            () => this.state.renderTestConnection,
            () => this.state.dns && this.state.dns.ns_ok
          ]}
        >
          <Step title='Insira o domínio desejado' stepComponent={DomainStep}>
            <FormRedux
              nosubmit
              {...formProps}
              onSubmit={values =>
                asyncAddHostedZone(values)
                  .then(dns => {
                    this.setState({ dns })
                    return Promise.resolve()
                  })
              }
            >
              <FormGroup {...domainName}>
                <ControlLabel>Domínio da sua comunidade</ControlLabel>
                <FormControl
                  type='text'
                  placeholder='Ex. minhacomunidade.org'
                  disabled={this.state.dns !== undefined}
                />
              </FormGroup>
              <div className={styles.actionButtons}>
                <span style={{ marginRight: '1rem' }}>
                  <Button
                    type='button'
                    disabled={saving || this.state.dns !== undefined}
                    onClick={() => browserHistory.push(paths.communityDomain())}
                  >
                    Cancelar
                  </Button>
                </span>
                <Button disabled={saving || this.state.dns !== undefined} type='submit'>
                  Adicionar
                </Button>
              </div>
            </FormRedux>
          </Step>

          <Step title='Altere os servidores do seu provedor DNS' stepComponent={DomainStep}>
            <p>
              Os Servidores DNS são endereços utilizados pelas organizações de registro de
              domínios como
              &nbsp;<a href='https://registro.br'>registro.br</a> ou
              &nbsp;<a href='https://br.godaddy.com'>godaddy.com</a>, para identificarem
              em qual servidor se encontram as informações sobre o domínio registrado.
            </p>
            <p>
              Complete a ativação do domínio alterando os servidores DNS, onde o domínio
              foi registrado, para os endereços abaixo:
            </p>
            <br />
            {
              this.state.dns &&
              this.state.dns.delegation_set_servers &&
              this.state.dns.delegation_set_servers.map((server, index) => (
                <p key={`server-${index}`}>
                  {server}
                </p>
              ))
            }
            <div className={styles.actionButtons}>
              <span style={{ marginRight: '1rem' }}>
                <Button
                  type='button'
                  onClick={() => browserHistory.push(paths.communityDomain())}
                >
                  Trocar depois
                </Button>
              </span>
              <Button
                onClick={() => {
                  const { location: { query } } = this.props
                  if (query && query.next) {
                    browserHistory.push(query.next)
                  } else {
                    this.setState({ renderTestConnection: true })
                  }
                }}
              >
                Continuar
              </Button>
            </div>
          </Step>

          <Step title='Teste a conexão' stepComponent={DomainStep}>
            <div>
              <p>Clique no botão abaixo para verificar se tudo está certo.</p>
              <p>Atenção: a mudança de DNS pode demorar até 48 horas para ser propagada pela internet.</p>
            </div>
            <div className={styles.actionButtons}>
              <span style={{ marginRight: '1rem' }}>
                <Button
                  type='button'
                  onClick={() => browserHistory.push(paths.communityDomain())}
                >
                  Testar depois
                </Button>
              </span>
              <Button onClick={() => this.handleTestConnection()}>
                Testar
              </Button>
            </div>
          </Step>
        </Steps>
      </div>
    )
  }
}

Page.propTypes = {
  intl: intlShape.isRequired
}

export default Page
