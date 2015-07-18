import React from 'react'

export default class NewContentBlock extends React.Component {
  render(){
    return (
      <div className="flex-auto p2 center">
        <h2>Adicione um bloco de conteúdo</h2>
        <p>Os blocos serão adicionados ao fim da sua página, mas você pode trocá-los de ordem a qualquer momento</p>
        <div className="col col-6 px3 mb3">
          <div className="clearfix border p2 bg-silver button block" style={{lineHeight: '50%'}}>
            <div className="col col-12 mb2 bg-blue"><br/><br/><br/><br/><br/><br/><br/></div>
            <div className="col col-12 mb2 bg-blue"><br/></div>
            <div className="col col-12 mb2 bg-blue"><br/></div>
            <div className="col col-12 mb2 bg-blue"><br/></div>
            <div className="col col-12 bg-blue"><br/></div>
          </div>
        </div>
        <div className="col col-6 px3 mb3">
          <div className="clearfix border py2 bg-white button block" style={{lineHeight: '50%'}}>
            <div className="clearfix col col-6 px2">
              <div className="col col-12 mb2 bg-blue"><br/><br/><br/><br/><br/><br/><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 bg-blue"><br/></div>
            </div>
            <div className="clearfix col col-6 px2">
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 bg-blue"><br/></div>
            </div>
          </div>
        </div>
        <div className="col col-6 px3 mb3">
          <div className="clearfix border py2 bg-white button block" style={{lineHeight: '50%'}}>
            <div className="clearfix col col-4 px2">
              <div className="col col-12 mb2 bg-blue"><br/><br/><br/><br/><br/><br/><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 bg-blue"><br/></div>
            </div>
            <div className="clearfix col col-8 px2">
              <div className="col col-12 mb2 bg-blue"><br/><br/><br/><br/><br/><br/><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 bg-blue"><br/></div>
            </div>
          </div>
        </div>
        <div className="col col-6 px3 mb3">
          <div className="clearfix border py2 bg-white button block" style={{lineHeight: '50%'}}>
            <div className="clearfix col col-4 px2">
              <div className="col col-12 mb2 bg-blue"><br/><br/><br/><br/><br/><br/><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 bg-blue"><br/></div>
            </div>
            <div className="clearfix col col-4 px2">
              <div className="col col-12 mb2 bg-blue"><br/><br/><br/><br/><br/><br/><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 bg-blue"><br/></div>
            </div>
            <div className="clearfix col col-4 px2">
              <div className="col col-12 mb2 bg-blue"><br/><br/><br/><br/><br/><br/><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 mb2 bg-blue"><br/></div>
              <div className="col col-12 bg-blue"><br/></div>
            </div>
          </div>
        </div>
        <div className="col col-12 px3">
          <button className="col col-12 button bg-blue">Adicionar</button>
        </div>
      </div>
    )
  }
}
