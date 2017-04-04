Step-by-step Components
=======================

- StepsContainer: Control state to render `<StepContent />`.

- StepContent: Render content and pass for `<StepButton />` or `<StepForm />` like should be called next step.

    - *title* - Title for render header

    - *step* - Step position actual

    - *position* - Position of step in render, passed by `<StepsContainer />`

    - *onNextStep* - Function to call the next step, passed by `<StepContent />`

- StepButton: Render button when clicked render should render next step.

    - *onClick* - Called when clicked button

    - *onNextStep* - Function to call the next step, passed by `<StepContent />`

- StepForm: Render <ReduxForm /> for render next step when submit is done.

    - *onNextStep* - Function to call the next step, passed by `<StepContent />`


**Snippet:**

    ```
    ...
    import { StepsContainer, StepContent, StepForm, StepButton } from '~client/components/steps'


    class Page extends Component {

      constructor (props) {
        super(props)
        this.state = { isConnected: false }
      }

      handleConnectionTest () {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.setState({ isConnected: true })
            resolve()
          }, 1000)
        })
      }

      render() {

        const { fields: { domain }, ...formProps } = this.props

        return (
          <div className='page'>
            <StepsContainer title='Domínio da comunidade'>
              <StepContent title='Insira o domínio desejado'>
                <StepForm
                  {...formProps}
                  onSubmit={values => new Promise((resolve, reject) => {
                    console.log(values)
                    return resolve()
                  })}
                >
                  <FormGroup {...domain}>
                    <ControlLabel>Domínio da sua comunidade</ControlLabel>
                    <FormControl type='text' placeholder='Ex. minhacomunidade.org' />
                  </FormGroup>
                  <Button type='submit'>Adicionar</Button>
                </StepForm>
              </StepContent>
              <StepContent title='Altere os servidores no seu provedor DNS'>
                <div>
                  <p>1. Faça login no seu provedor de DNS (onde seu domínio está registrado, por exemplo GoDaddy, Locaweb, RegistroBR)</p>
                  <p>2. Encontre a página de <b>gerenciador de DNS</b>, e altere os <b>nomes de servidor</b> para os servidores do Bonde:</p>
                  <br />
                  <p>ns1.1098.19872.0871.98</p>
                  <p>ns2.1098.19872.0871.98</p>
                  <p>ns3.1098.19872.0871.98</p>
                </div>
                <StepButton>Continuar</StepButton>
              </StepContent>
              <StepContent title='Teste a conexão'>
                <div>
                  <p>Clique no botão abaixo para verificar se tudo está certo.</p>
                  <p>Atenção: a mudança de DNS pode demorar até 48 horas para ser propagada pela internet.</p>
                </div>
                <StepButton onClick={() => this.handleConnectionTest()}>
                  {!this.state.isConnected ? 'Testar' : 'Pronto'}
                </StepButton>
              </StepContent>
            </StepsContainer>
          </div>
        )
      }
    }
    ```
