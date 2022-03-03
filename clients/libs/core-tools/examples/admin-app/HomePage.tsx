import React from 'react';
import styled from 'styled-components';
import { Header } from 'bonde-components';
import { CommunityMenu, useSession } from '../../.';

const Styles = styled.div`
  background-color: #fff;
  max-height: ${props => props.height};
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
  height: '500px'
}

const Colunm = styled.div`
  ${props => props.grow && `flex-grow: ${props.grow};`}
  padding: 13px 15px 14px;
`

const Image = styled.img`
  width: 40px;
  height: 40px;
`

const HomePage = () => {
  const { user, communities, storage } = useSession()
  return (
    <>
      <Styles>
        <ul>
          {communities.map((c: any, index: number) => (
            <li key={index}>
              <Colunm>
                <Image src={c.image || 'https://via.placeholder.com/100'} alt={c.name} />
              </Colunm>
              <Colunm grow={1}>
                <Header.h4>{c.name}</Header.h4>
                <Header.h5>{c.city}</Header.h5>
              </Colunm>
              <Colunm>
                <CommunityMenu community={c} />
              </Colunm>
              <Colunm>
                <button
                  type='button'
                  onClick={() => {
                    storage
                      .setAsyncItem('community', c)
                      .then(() => {
                        console.log('redirect com community on session')
                      })
                  }}
                >
                  Alterar comunidade na sessão
                </button>
              </Colunm>
            </li>
          ))}
        </ul>
      </Styles>
    </>
  )
}

export default HomePage