import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Flexbox2 as Flexbox,
  DataListCard,
  SwitchSlider,
  Text,
  Title,
  Grid,
  Cell,
  Icon
} from 'bonde-styleguide'

const campaigns = [
  { id: 1, name: 'Apresentação da BETA', status: 'active' },
  { id: 2, name: 'Leis', status: 'active' },
  { id: 3, name: 'ADPF442', status: 'inactive' },
  { id: 5, name: 'Mapa do Acolhimento', status: 'inactive' },
  { id: 6, name: 'Mais sobre a BETA', status: 'active' }
]

const NameField = ({ value }) => (
  <Title.H4>{value}</Title.H4>
)

NameField.propTypes = {
  value: PropTypes.string
}

const StatusButtonField = ({ value }) => (
  <SwitchSlider round checked={value === 'active'}>
    <Text>{value === 'active' ? 'ATIVO' : 'INATIVO'}</Text>
  </SwitchSlider>
)

StatusButtonField.propTypes = {
  value: PropTypes.string
}

const MenuField = ({ value }) => (
  <Flexbox horizontal>
    <Button flat><Icon name='pencil' /> Editar</Button>
    <Button flat><Icon name='trash' /> Excluir</Button>
  </Flexbox>
)

MenuField.propTypes = {
  value: PropTypes.string
}

const fields = {
  name: { label: 'Nome do fluxo', render: NameField },
  status: { label: 'Status', render: StatusButtonField },
  id: { label: 'Ações', render: MenuField, width: 500 }
}

const CampaignsList = () => (
  <Grid gap={0}>
    <Cell size={[2, 2, 2]}>
      <Flexbox horizontal spacing='between'>
        <Button flat active>TODOS</Button>
        <Button flat>ATIVOS</Button>
        <Button flat>INATIVOS</Button>
      </Flexbox>
    </Cell>
    <Cell size={[12, 12, 12]}>
      <DataListCard
        border='separate'
        fields={fields}
        items={campaigns}
      />
    </Cell>
  </Grid>
)

export default CampaignsList
