import React from 'react'
import classnames from 'classnames'

import { AtivistForm, TargetList, PressureCount } from './components'

/* TODO: Change static content by props
 * - title
 * - bgColor
 */
const PressureWidget = () => {

  const controlClassname = 'px3 py1 border-top'
  const bgColor = '#f23392'
  const inputReset = {
    border: 'none',
    padding: '0',
    height: '2rem'
  }

  const targets = Array(3).fill({
    image: 'https://placeholdit.imgix.net/~text?txtsize=8&txt=50%C3%9750&w=50&h=50',
    name: 'Lúcia Regina Mendes Espagolla',
    office: 'Diretora Regional de Ensino Norte-1'
  })

  return (
    <div className="pressure-widget">
      <h2 className="center py2 px3 m0 white rounded-top" style={{backgroundColor: bgColor}}>Envie um e-mail para quem pode tomar essa decisão</h2>
      <TargetList targets={targets} />
      <AtivistForm buttonColor={bgColor} onSubmit={data => alert(data)} />
      <PressureCount total={12234} totalColor={bgColor} />
      {/* TODO: Change HTML by PressureForm */}
      <div className="pressure-form mt2">
        <h3 className="rounded-top m0 center py1" style={{backgroundColor: '#222'}}>
          <span className="white bold">Texto do e-mail</span>
        </h3>
        <form className="bg-white rounded-bottom">
          <div className={controlClassname}>
            <label className="flex p1 gray" htmlFor="subjectId">Assunto</label>
            <input className="col-12" style={inputReset} id="subjectId" type="text" name="subject" />
          </div>
          <div className={controlClassname}>
            <label className="flex p1 gray" htmlFor="bodyId">E-mail</label>
            <textarea className="col-12" style={{...inputReset, height: '13rem'}} id="bodyId" name="body">
            Prezadas, Lúcia Regina Espagolla e Vera Lucia Benfica da Costa,

            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac lectus tortor.
            Vivamus ac lorem at magna aliquam vestibulum. Sed scelerisque
            nibh ac sapien pharetra porttitor. Donec mi dui, accumsan eget
            molestie quis, sollicitudin sit amet nibh. Nam in odio eros.
            Phasellus pellentesque pharetra magna non finibus.
            Nulla luctus erat nec fermentum euismod.
            </textarea>
          </div>
        </form>
        <div className="bg-black mt1 rounded py1 px3">
          <p className="white m0">Caso você seja o alvo dessa mobilização,
          dê uma resposta publica clicando <a href="#" style={{color: bgColor}}>aqui</a>.
          Ela será publicada nesta página</p>
        </div>
      </div>
    </div>
  )
}

export default PressureWidget
