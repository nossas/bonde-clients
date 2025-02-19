import React, { Component } from 'react'
import exenv from 'exenv'

class ZendeskWidget extends Component {
  componentWillMount () {
    if (exenv.canUseDOM) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.text = `
window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement("iframe");
window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,
r.src="javascript:false",r.title="",r.role="presentation",(r.frameElement||r).style
.cssText="display: none",d=document.getElementsByTagName("script"),d=d[d.length-1],d.parentNode
.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(e){n=document.domain,r
.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',o=s}o.open()._l=function(){
var o=this.createElement("script");n&&(this.domain=n),o.id="js-iframe-async",o.src=e,
this.t=+new Date,this.zendeskHost=t,this.zEQueue=a,this.body.appendChild(o)},o.write(
'<body onload="document._l();">'),o.close()}(
"https://assets.zendesk.com/embeddable_framework/main.js","nossas.zendesk.com")`
      document.body.appendChild(script)
    }
  }

  render () {
    return <span />
  }
}

export default ZendeskWidget
