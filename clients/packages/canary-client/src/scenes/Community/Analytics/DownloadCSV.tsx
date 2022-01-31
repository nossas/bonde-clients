import React, { useState, useContext } from 'react';
import { Context as SessionContext } from 'bonde-core-tools';
import { Header, Icon, Loading, toast, Success } from 'bonde-components';
import downloadjs from 'downloadjs'
import styled from 'styled-components';
import Panel from '../../../components/Panel';

type ReportButtonProps = {
  loading: boolean
}

const ReportButton = styled.button<ReportButtonProps>`
  margin: 0 18px 5px 0;
  border: none;
  outline: none;

  &:active, &:focus, &:hover {
    border: none;
    outline: none;
  }

  &:hover {
    h5 {
      color: #a4a4a4 !important;
    }

    .fill {
      path {
        fill: #a4a4a4 !important;
      }
    }
  }

  ${Panel} {
    display: grid;
    grid-template-columns: repeat(2, auto);
    align-items: center;
    grid-gap: 20px;
    width: 205px;
    height: 96px;
    padding: 25px 20px;
    text-align: left;

    div {
      margin: auto;
    }

    svg {
      ${props => props.loading
        ? `
          width: calc(0.4*176px);
          height: calc(0.4*135px);
          margin-top: -19px;
          margin-bottom: -10px;
        `
        : `
          margin-right: 0;
        `
      }
    }
  }
`

type DownloadCSVProps = {
  path: 'donation_reports' | 'download_subscriptions' | 'activist_actions' | 'activists'
  label: string
  icon: any
}

const DownloadCSV = ({ path, label, icon }: DownloadCSVProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const { community, token } = useContext(SessionContext);
  const apiUrl = process.env.REACT_APP_DOMAIN_API_REST;
  const headers = { 'access-token': token || 'no-token' };
  const reportNames = {
    donation_reports: 'Doação',
    download_subscriptions: 'Doação recorrente',
    activist_actions: 'Ações',
    activists: 'Ativistas'
  }

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/communities/${community?.id}/${path}.csv`, { method: 'GET', headers });

      if (response.status === 200) {
        const filename = `[Relatório][${reportNames[path]}] ${community?.name}.csv`;
        downloadjs(new Blob([(await response.blob())]), filename, 'text/csv');
        
        toast(<Success message={`O download de ${filename} foi feito com sucesso.`} />, { type: toast.TYPE.SUCCESS });
      }
      setLoading(false);
    } catch (err) {
      console.error('error', err);
      toast(err.message, { type: toast.TYPE.ERROR });
      setLoading(false);
    }
  }

  return (
    <ReportButton
      type='button'
      onClick={handleClick}
      loading={loading}
      disabled={loading}
    >
      <Panel>
        {loading
          ? <Loading size='small' />
          : (
            <>
              <Icon name={icon as any} />
              <Header.H5 uppercase  style={{ fontWeight: 800, color: '#000' }}>{label}</Header.H5>
            </>
          )
        }
      </Panel>
    </ReportButton>
  );
}

export default DownloadCSV;