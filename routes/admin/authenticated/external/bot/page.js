import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { Link, browserHistory } from 'react-router'
import { Background } from '~client/components/layout'
import { FlatForm } from '~client/ux/components'
import { FormGroup, ControlLabel, FormControl } from '~client/components/forms'
import { Button } from '~client/ux/components'
import { StepsContainerStack, StepContent } from '~client/components/steps'
import { Tabs, Tab } from '~client/components/navigation/tabs'

const mockActivists = [
  {"gender":"male","last_name":"Takeda","first_name":"Gabriel","profile_pic":"https://scontent.xx.fbcdn.net/v/t31.0-1/19250447_1680559175317618_6725395899405980837_o.jpg?oh=dea254354edef2b91fb7eceaee2dff2f&oe=5A4D0DD9"},
  {"gender":"female","last_name":"Möller","first_name":"Paula","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/10563098_10204686296541477_6696575716164730582_n.jpg?oh=d4e86cf04cc9bf1a9dd518ed106cf369&oe=5A1CE319"},
  {"gender":"female","last_name":"Ribeiro","first_name":"Mariana","profile_pic":"https://scontent.xx.fbcdn.net/v/t31.0-1/17632406_10212494295453041_8250977081872433031_o.jpg?oh=0c11a1e3ae07083702b7f2e9fa19a2f4&oe=5A13BFCF"},
  {"gender":"female","last_name":"Safir","first_name":"Pri","profile_pic":"https://scontent.xx.fbcdn.net/v/t31.0-1/20901020_1049005278568420_7254200029935850556_o.jpg?oh=68a5cf5ff695312c8ec2c7830f513e38&oe=5A57BDE1"},
  {"gender":"female","last_name":"Halsman","first_name":"Amanda","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/20525281_1453996438016451_5050129091476868819_n.jpg?oh=38aef88fc141410463cda8c6faf2e258&oe=5A1CC7B2"},
  {"gender":"female","last_name":"Herykinha","first_name":"Herykinha","profile_pic":"https://scontent.xx.fbcdn.net/v/t31.0-1/21200881_2014438042125921_1359805629981010485_o.jpg?oh=7370d2b68ff60d034b54dc7af9eab0e5&oe=5A16E4AA"},
  {"gender":"male","last_name":"Hugo","first_name":"Vitor","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/21369534_172864373273209_1420357281137781364_n.jpg?oh=8eea63294f02c94482c0067efa47d090&oe=5A17FA48"},
  {"gender":"female","last_name":"Moraes","first_name":"Rôh","profile_pic":"https://scontent.xx.fbcdn.net/v/t31.0-1/20617112_1915227482053277_4171145399190115893_o.jpg?oh=6ab361e9e63ab15d3e94ab0cdb586fc9&oe=5A5E53A1"},
  {"gender":"female","last_name":"Sabrina","first_name":"Pâmela","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/15073528_603200066549466_7797220539982557862_n.jpg?oh=1b5a7e159e62fdbb24b35529d0f0b013&oe=5A19C8BD"},
  {"gender":"female","last_name":"Sangiorgi","first_name":"Gabriella","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/16831132_1810783925805870_4604366754378835752_n.jpg?oh=23693e72c780c5f1e4b11068cd9e89ec&oe=5A56FD50"},
  {"gender":"female","last_name":"Trevizolo","first_name":"Mariana","profile_pic":"https://scontent.xx.fbcdn.net/v/t31.0-1/21248199_1519000364805867_3726762708978708399_o.jpg?oh=a71adfc4340bb7feb4a18b1729fd8574&oe=5A57FE0B"},
  {"gender":"female","last_name":"Vassoler","first_name":"Ana","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/17498821_2070061359887392_393748699999808810_n.jpg?oh=a32910ae3e063b204801313b61f29408&oe=5A22A972"},
  {"gender":"female","last_name":"Paulino","first_name":"Rebeca","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/21078777_1334565296652884_2684552250520685678_n.jpg?oh=8514aac823ff8aa63a37e451b8a94a26&oe=5A51FC6D"},
  {"gender":"female","last_name":"Petrechen","first_name":"Natália","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/20727821_10207511940635716_3918510191681574739_n.jpg?oh=d0613294d92162b950b0e00c06ed91e0&oe=5A125395"},
  {"gender":"female","last_name":"Pozzatti","first_name":"Cássia","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/20106615_10213676758776325_2839002041837047113_n.jpg?oh=82e7d36ef905a66aed88a42e9a20b222&oe=5A15EFC0"},
  {"gender":"female","last_name":"Serpa","first_name":"Isadora","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/20707977_2365467823678448_2539550675161765911_n.jpg?oh=824104faaae85d491f1dad66526dfa28&oe=5A505E4E"},
  {"gender":"female","last_name":"Coelho","first_name":"Luciana","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/21232096_10203908843639640_562157744312456128_n.jpg?oh=1c44221b497bdde8abb61f74d8bfdd29&oe=5A2127B0"},
  {"gender":"female","last_name":"Oliveira","first_name":"Elaine","profile_pic":"https://scontent.xx.fbcdn.net/v/t31.0-1/p720x720/20643281_1365744366874882_9136536248914437294_o.jpg?oh=0976eb2d370e188f1d74bb7f7ab45822&oe=5A1711DF"},
  {"gender":"female","last_name":"Caroline","first_name":"Cintia","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/20257965_717040061816794_6469403673467373618_n.jpg?oh=20f4557f7961ba26da576eaac38ca7d0&oe=5A23C81D"},
  {"gender":"female","last_name":"Ferreira Bado","first_name":"Érica","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/20638163_1354963994620603_3983324467223256403_n.jpg?oh=dc99d1ea7df25b1faa500f48a10ab181&oe=5A22422D"},
  {"gender":"female","last_name":"Bandeira","first_name":"Emilly","profile_pic":"https://scontent.xx.fbcdn.net/v/t31.0-1/19441741_698606810339480_6886619842285358021_o.jpg?oh=5ba892cb044c676ca427c44ed82601ca&oe=5A565A4F"},
  {"gender":"female","last_name":"Draper","first_name":"Hannah","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/14088594_1423646767652171_4222567748624278402_n.jpg?oh=f3a09fbae73a2df6615397f03197a1ae&oe=5A1F9905"},
  {"gender":"male","last_name":"Furlan","first_name":"Rodrigo","profile_pic":"https://scontent.xx.fbcdn.net/v/t31.0-1/20900683_10209691863120408_4089060053752796251_o.jpg?oh=5a476d3fe15ac29e6f158e721e8fbfbb&oe=5A19B791"},
  {"gender":"female","last_name":"Anciutti","first_name":"Brisa","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/21077733_1557663337623617_8363332048725550612_n.jpg?oh=df7fae1baa29af045709abd8f0563eec&oe=5A1A1CCD"},
  {"gender":"female","last_name":"Albuquerque","first_name":"Bruna","profile_pic":"https://scontent.xx.fbcdn.net/v/t31.0-1/14608929_10153798559207027_568754908861238743_o.jpg?oh=ed8dbabae0fa42e44884577f36c5c213&oe=5A5FA32B"},
  {"gender":"female","last_name":"Liberatori","first_name":"Caroline","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/15894785_1309118065829490_4078900619228301636_n.jpg?oh=2040f3611430f04e0a705550a23e27cb&oe=5A5E4308"},
  {"gender":"female","last_name":"Leite","first_name":"Clara","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/13331020_10208643213930078_5878804754915256949_n.jpg?oh=ba846ba6b3f5f1c4e57c23d6a548ed99&oe=5A15ADB8"},
  {"gender":"female","last_name":"Aguillar Leite","first_name":"Gabriela","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/12112462_1030663100330016_2536397460787669735_n.jpg?oh=4203e31822dc8d061e7eb8f624af57f9&oe=5A242F6E"},
  {"gender":"female","last_name":"Machado","first_name":"Vanessa","profile_pic":"https://scontent.xx.fbcdn.net/v/t31.0-1/15972811_1279129898822193_8296105090163758459_o.jpg?oh=50f95f1e6b81aadbfa0f593c467cccb7&oe=5A203A5C"},
  {"gender":"female","last_name":"Zonta","first_name":"Ana Paula","profile_pic":"https://scontent.xx.fbcdn.net/v/t31.0-1/17854824_1739391449420704_1887115932938314580_o.jpg?oh=bcf002a5f266a9718f8679120150780d&oe=5A57DEC0"},
  {"gender":"female","last_name":"Ravanello","first_name":"Ivna","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/17952971_1482383621793122_1621481582705746177_n.jpg?oh=25ca5f2d928e2da1d1fdf1012d7b4b7d&oe=5A5E9F27"},
  {"gender":"male","last_name":"Amador","first_name":"Hyagor","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/15220218_1682590862071352_2403014041916991142_n.jpg?oh=4177e8ee4d5fa252435bdd6baa605a5d&oe=5A59718C"},
  {"gender":"female","last_name":"Gomes","first_name":"Ediane","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/13872991_1089108991165043_1760822554562869942_n.jpg?oh=7d7228465116cccb952f6b032f997732&oe=5A253A13"},
  {"gender":"male","last_name":"Benedikt","first_name":"Everton","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/20994106_1777588955614597_5103604300206790341_n.jpg?oh=7ffd09fd669e768605b7c09a256ddc43&oe=5A142500"},
  {"gender":"female","last_name":"Areas","first_name":"Luiza","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/10603564_666213033474650_5620912545552504039_n.jpg?oh=d4140a29bc3b9ad80eebfec72a8a7f9a&oe=5A1C45ED"},
  {"gender":"female","last_name":"Britez","first_name":"Raisa","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/13895471_1448462635169186_509534557134682736_n.jpg?oh=4b10894311ae36d8ba59bdf84ce2ca5c&oe=5A5413B9"},
  {"gender":"male","last_name":"Arnaiz","first_name":"Rodrigo","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/14022164_921386051300961_4132675126343372134_n.jpg?oh=8905b95f8b9a232bbb1de2b0f9628517&oe=5A1A6886"},
  {"gender":"female","last_name":"Molinari","first_name":"Laura","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/14993493_1242452582495150_25907673648466674_n.jpg?oh=7bafe09b6462bee24593b37106a9f099&oe=5A50D116"},
  {"gender":"female","last_name":"Gommez","first_name":"Evelyn","profile_pic":"https://scontent.xx.fbcdn.net/v/t31.0-1/21055881_1441834795906529_1156941268902826949_o.jpg?oh=764a06b811ad46d3d62a5b4c6a737fba&oe=5A52B260"},
  {"gender":"female","last_name":"Landi","first_name":"Thaís","profile_pic":"https://scontent.xx.fbcdn.net/v/t31.0-1/19452931_10207099625487625_2531945951572786733_o.jpg?oh=7d304af0af922b04e053ed270a1c8e00&oe=5A19020C"},
  {"gender":"female","last_name":"Legrady","first_name":"Isabel","profile_pic":"https://scontent.xx.fbcdn.net/v/t31.0-1/21199689_1644068735645721_5027455066234902717_o.jpg?oh=10de6a1f13dba5fdb42f715f4a9dd4da&oe=5A17F655"},
  {"gender":"male","last_name":"Takeda","first_name":"Gabriel","profile_pic":"https://scontent.xx.fbcdn.net/v/t31.0-1/19250447_1680559175317618_6725395899405980837_o.jpg?oh=57e99ca6aa50e9c5990e1b05bdc2c39e&oe=5A2580D9"},
  {"gender":"female","last_name":"Borges","first_name":"Gabrielle","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/18814391_1472339622827006_9033190755277201162_n.jpg?oh=d9e8149855efb9c7e3293108f8e856e9&oe=5A58A0A8"},
  {"gender":"female","last_name":"Rocha","first_name":"Julia","profile_pic":"https://scontent.xx.fbcdn.net/v/t31.0-1/18451763_1044910042277269_2725202884913029266_o.jpg?oh=9e5fc37b7fd5edd89198547f69f6cc3b&oe=5A164B6A"},
  {"gender":"female","last_name":"Yañez","first_name":"Tayane","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/16865192_1465619340115900_8167685058041478411_n.jpg?oh=88814b5ac0fda38e3459c858b697c75c&oe=5A161F9A"},
  {"gender":"male","last_name":"Lima","first_name":"Gabriel","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/18664279_1548667415168199_2815030827951696314_n.jpg?oh=fa33d13c0e6be02457530d35275aeaf9&oe=5A57D859"},
  {"gender":"male","last_name":"Figueiredo","first_name":"Charles","profile_pic":"https://scontent.xx.fbcdn.net/v/t31.0-1/p720x720/15443166_10207146562412674_6181822072168409198_o.jpg?oh=77693505f0a5f85dc84116cd76d5a8d3&oe=5A586806"},
  {"gender":"male","last_name":"Ezabella","first_name":"Alessandro","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/12004892_10206044617489155_1922964070416941123_n.jpg?oh=d67149372ffe14f527fb6e85ec123bad&oe=5A5516EE"},
  {"gender":"female","last_name":"Skura","first_name":"Ivania","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/19875337_10212314575973606_3456443753149046327_n.jpg?oh=ef6d3a1309b7a710c7130f899135bb79&oe=5A16E275"},
  {"gender":"male","last_name":"Pirola","first_name":"Lucas","profile_pic":"https://scontent.xx.fbcdn.net/v/t1.0-1/10460721_10152232754266433_4486781482753643779_n.jpg?oh=7e40502cf9480a7cdb0e6892ad12b829&oe=5A149428"}
]

var styles = require('exenv').canUseDOM ? require('./page.scss') : {}

const ActivistSegmentationForm = reduxForm({
  form: 'facebookBotActivistSegmentationForm',
  fields: ['message', 'quick_reply', 'date_interval_start', 'date_interval_end']
})(({
  fields: {
    message,
    quick_reply: quickReply,
    date_interval_start: dateIntervalStart,
    date_interval_end: dateIntervalEnd
  },
  ...formProps
}) => (
  <FlatForm
    {...formProps}
    hideButton
    buttonText='Buscar'
    style={{ paddingTop: '.5rem' }}
    submit={values => {
      console.log('values', values)
    }}
  >
    <FormGroup className='mb2' controlId='message' {...message}>
      <ControlLabel>Mensagem</ControlLabel>
      <FormControl
        type='text'
        placeholder='Digite aqui a mensagem que o usuário enviou'
      />
    </FormGroup>

    <FormGroup className='mb2' controlId='quickReply' {...quickReply}>
      <ControlLabel>Quick Reply</ControlLabel>
      <FormControl
        type='text'
        placeholder='Ex: QUICK_REPLY_A'
      />
    </FormGroup>

    <div className='clearfix col-12' style={{ marginBottom: '1.5rem' }}>
      <FormGroup className='col col-6' controlId='dateIntervalStart' {...dateIntervalStart}>
        <ControlLabel>Data de início</ControlLabel>
        <FormControl
          type='text'
          placeholder='Ex: DD/MM/AAAA'
        />
      </FormGroup>

      <FormGroup className='col col-4 ml3' controlId='dateIntervalEnd' {...dateIntervalEnd}>
        <ControlLabel>Data limite</ControlLabel>
        <FormControl
          type='text'
          placeholder='Ex: DD/MM/AAAA'
        />
      </FormGroup>
    </div>

    <div className={styles.summary}>
      <span className={styles.summaryHighlight}>452</span>
      <span>pessoas receberão a mensagem</span>
    </div>

    <Button>Escrever mensagem</Button>
  </FlatForm>
))

class BotPage extends Component {
  render () {
    const { image } = this.props

    const genderIconMap = { male: 'mars', female: 'venus' }

    return (
      <Background image={image} alignment={{ x: 'center', y: 'center' }} contentSize={12}>
        <div className={styles.activistListContainer}>
          <h1 className={styles.activistListTitle}>
            Preview
            <p className={styles.activistListHelper}>
              Exibindo 50 de 452
            </p>
          </h1>
          <ul className={styles.activistList}>
            {mockActivists.map(activist => (
              <li className={styles.activistListItem}>
                <div className={styles.activistListItemAvatar}>
                  <img src={activist.profile_pic} />
                </div>
                <div className={styles.activistListItemGender}>
                  <i className={`fa fa-${genderIconMap[activist.gender]}`} />
                </div>
                <div className={styles.activistListItemName}>
                  {activist.first_name} {activist.last_name}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.stepsContainer}>
          <h1 className={styles.stepsTitle}>
            Envio de mensagem em massa
          </h1>
          <StepsContainerStack
            ComponentPointerContainer={Tabs}
            ComponentPointerChildren={Tab}
            pointerChildrenProps={({ index, step }) => ({ isActive: index === step, index })}
            progressValidations={[() => false, () => false]}
          >
            <StepContent>
              <ActivistSegmentationForm />
            </StepContent>

            <StepContent>
              <div className='ux--flat-form'>
                <h1>Seu BONDE está pronto!</h1>
                <p className='h5'>
                  Em uma nova aba, digite o endereço que cadastrou na mobilização
                  para se certificar de que ela já está no ar. Se ainda não estiver,
                  cheque se cadastrou os domínios corretamente. Está tudo certo? Então
                  é só esperar ele propagar pela internet!
                </p>
              </div>
            </StepContent>
          </StepsContainerStack>
        </div>
      </Background>
    )
  }
}

export default BotPage
