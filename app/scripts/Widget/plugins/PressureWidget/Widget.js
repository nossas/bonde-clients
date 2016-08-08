import React, { PropTypes } from 'react'
import classnames from 'classnames'

import { OverlayWidget } from '../../components'
import { PressureForm, TargetList, PressureCount } from './components'

/* TODO: Change static content by props
 * - title
 * - bgColor
 */
const PressureWidget = ({ editable }) => {

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
    <OverlayWidget editable={editable} onClick={() => {
      console.log('// TODO: Redirect to settings PressureWidget')
    }}>
      <div className="pressure-widget">
        <h2 className="center py2 px3 m0 white rounded-top" style={{backgroundColor: bgColor}}>Envie um e-mail para quem pode tomar essa decisão</h2>
        <TargetList targets={targets} />
        <PressureForm
          buttonColor={bgColor}
          subject="Lorem ipsum dolor"
          body="Prezadas, Lúcia Regina Espagolla e Vera Lucia Benfica da Costa,
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac lectus tortor.
          Vivamus ac lorem at magna aliquam vestibulum. Sed scelerisque
          nibh ac sapien pharetra porttitor. Donec mi dui, accumsan eget
          molestie quis, sollicitudin sit amet nibh. Nam in odio eros.
          Phasellus pellentesque pharetra magna non finibus.
          Nulla luctus erat nec fermentum euismod."
          onSubmit={data => {
            console.log(data)
            alert(data)
          }}>
          <PressureCount total={12234} totalColor={bgColor} />
        </PressureForm>
        <div className="bg-black mt1 rounded py1 px3">
          <p className="white m0">Caso você seja o alvo dessa mobilização,
          dê uma resposta publica clicando <a href="#" style={{color: bgColor}}>aqui</a>.
          Ela será publicada nesta página</p>
        </div>
      </div>
    </OverlayWidget>
  )
}

PressureWidget.propTypes = {
  editable: PropTypes.bool,
}

export default PressureWidget
