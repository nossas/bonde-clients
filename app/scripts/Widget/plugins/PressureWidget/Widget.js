import React from 'react'
import classnames from 'classnames'

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
  /* TODO: support all browser
   * -webkit-box-shadow: inset 0px 15px 18px -10px rgba(227,224,227,1);
   * -moz-box-shadow: inset 0px 15px 18px -10px rgba(227,224,227,1);
   * box-shadow: inset 0px 15px 18px -10px rgba(227,224,227,1);
   */
  const pressureCount = {
    boxShadow: "inset 0px 15px 18px -10px rgba(227,224,227,1)",
  }

  const targetList = {
    overflowX: 'auto'
  }
  const targetItem = {
    width: '200px',
    height: '75px',
    float: 'left'
  }


  const targetItemClassname = 'target-item py1 px2 mr1 bg-white rounded'
  const imageClassname = 'left circle mr2'

  const targets = Array(3).fill({
    image: 'https://placeholdit.imgix.net/~text?txtsize=8&txt=50%C3%9750&w=50&h=50',
    name: 'Lúcia Regina Mendes Espagolla',
    office: 'Diretora Regional de Ensino Norte-1'
  })

  return (
    <div className="pressure-widget">
      <h2 className="center py2 px3 m0 white rounded-top" style={{backgroundColor: bgColor}}>Envie um e-mail para quem pode tomar essa decisão</h2>
      {/* TODO: Change HTML by TargetList */}
      <div className="target-list px2 py1 clearfix" style={{backgroundColor: '#eeeeee', ...targetList}}>
        <p className="bold">Quem você pode pressionar</p>
        <div className="clearfix pl2" style={{ width: `${240 * targets.length}px` }}>
          {/* TODO: Change HTML by TargetListItem */}
          {targets.map(target => (
            <div className={targetItemClassname} style={targetItem}>
              <img className={imageClassname} src={target.image} height="55" width="55" />
              <p className="black h6">
                <span className="bold flex">{target.name}</span>
                <span>{target.office}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* TODO: Change HTML by AtivistForm */}
      <form className="ativist-form bg-white">
        <div className={controlClassname}>
          <label className="flex" htmlFor="emailId">E-mail</label>
          <input className="col-12" style={inputReset} id="emailId" type="email" name="email" placeholder="exemplo@email.com" />
        </div>
        <div className={controlClassname}>
          <label className="flex" htmlFor="nameId">Seu nome</label>
          <input className="col-12" style={inputReset} id="nameId" type="text" name="name" placeholder="Nome" />
        </div>
        <div className={controlClassname}>
          <label className="flex" htmlFor="last_nameId">Seu sobrenome</label>
          <input className="col-12" style={inputReset} id="last_nameId" type="text" name="last_name" placeholder="Sobrenome" />
        </div>
        <div className="p3 border-top">
          <button className="caps white col-12 py2 rounded" style={{backgroundColor: bgColor}}>Enviar email</button>
        </div>
      </form>
      {/* TODO: Change HTML by PressureCount */}
      <div className="pressure-count p3 bg-white rounded-bottom" style={pressureCount}>
        <p className="center m0">
          <span style={{color: bgColor}}>12.234</span>&nbsp;<span>pressões feitas</span>
        </p>
      </div>
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
