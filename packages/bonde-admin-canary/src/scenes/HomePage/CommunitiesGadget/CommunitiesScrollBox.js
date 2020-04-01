import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Header } from 'bonde-components'
import { CommunityMenu } from 'bonde-core-tools'
import { Empty } from 'components'

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: ${props => props.height};
  min-height: ${props => props.height};
  overflow-y: auto;

  ul {
    margin: 0;
    padding: 0;

    li {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }

  ${Header.h4}, ${Header.h5} {
    margin: 0;
  }

  &::-webkit-scrollbar {
    width: 33px;
  }
  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    background-color: rgba(74, 74, 74, 0.75);
    border-width: 20px 15px;
    border-style: solid;
    border-color: transparent;
    border-image: initial;
  }
`

Styles.defaultProps = {
  height: '535px'
}

const Colunm = styled.div`
  ${props => props.grow && `flex-grow: ${props.grow};`}
  padding: 13px 15px 14px;
`

const Image = styled.img`
  width: 40px;
  height: 40px;
`

const CommunitiesScrollBox = ({ communities }) => {
  return (
    <Styles>
      {communities.length > 0 ? (
        <ul>
          {communities.map((c: any, index: number) => (
            <li key={index}>
              <Colunm>
                <Image src={c.image || 'https://via.placeholder.com/100'} alt={c.name} />
              </Colunm>
              <Colunm grow={1}>
                <Header.h4>{c.name}</Header.h4>
                <Header.h5>{c.description || c.city}</Header.h5>
              </Colunm>
              <Colunm>
                <CommunityMenu community={c} />
              </Colunm>
            </li>
          ))}
        </ul>
      ) : <Empty message='Nenhuma comunidade encontrada' />}
    </Styles>
  )
}

CommunitiesScrollBox.propTypes = {
  communities: PropTypes.array.isRequired
}

CommunitiesScrollBox.defaultProps = {
  communities: []
}

export default CommunitiesScrollBox
