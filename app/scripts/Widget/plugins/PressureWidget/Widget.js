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
   * -webkit-box-shadow: inset 0px 4px 5px -2px rgba(235,235,235,1);
   * -moz-box-shadow: inset 0px 4px 5px -2px rgba(235,235,235,1);
   * box-shadow: inset 0px 4px 5px -2px rgba(235,235,235,1);
   */
  const pressureCount = {
    boxShadow: "inset 0px 4px 5px -2px rgba(235,235,235,1)",
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
    </div>
  )
}

export default PressureWidget
