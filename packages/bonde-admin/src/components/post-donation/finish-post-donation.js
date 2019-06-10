import { bool, string, object } from 'prop-types'
import React from 'react'

const FinishPostDonation = ({
  preview,
  href,
  mobilization,
  widget
}) => {
  console.log('preview', preview)
  console.log('href', href)
  console.log('mobilization', mobilization)
  console.log('widget', widget)

  return (
    <div className='center p3 darkengray rounded'>
      Seu componente de pós-doação
    </div>
  )
}

FinishPostDonation.propTypes = {
  preview: bool,
  widget: object,
  mobilization: object,
  href: string,
}

export default FinishPostDonation
