import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from '../../../components/Navigation'
import { SettingsPageLayout, SettingsPageMenuLayout, SettingsPageContentLayout } from '../../../components/Layout'



class EditCommunityContainer extends Component {

  render() {

    const { children, community } = this.props

    return (
      <SettingsPageLayout>
        <SettingsPageMenuLayout title="Configurações da comunidade">
          <Tabs>
            <Tab text="Informações" isActive={true} />
            <Tab text="Membros" />
            <Tab text="Pagamento" />
          </Tabs>
        </SettingsPageMenuLayout>
        <SettingsPageContentLayout>
          {children && React.cloneElement(children, { community })}
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

const mapStateToProps = ({ community }) => ({
  community: community.data.filter(c => c.id === community.currentId)[0],
})

export default connect(mapStateToProps)(EditCommunityContainer)
