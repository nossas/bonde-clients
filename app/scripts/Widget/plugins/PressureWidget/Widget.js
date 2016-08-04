import React from 'react'

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


  return (
    <div className="pressurewidget">
      <h2 className="center py2 px3 m0 white rounded-top" style={{backgroundColor: bgColor}}>Envie um e-mail para quem pode tomar essa decisão</h2>
      {/* TODO: Change HTML by TargetList */}
      <div className="targetlist flex" style={{backgroundColor: '#eeeeee'}}>
        <p className="bold px2 py1">Quem você pode pressionar</p>
      </div>
      {/* TODO: Change HTML by AtivistForm */}
      <form className="ativistform bg-white">
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
