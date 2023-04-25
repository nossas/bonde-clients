import React, { useState, useEffect } from 'react';
import type { Call, Target } from './types';

import styled from '@emotion/styled';
import HowItWorks from './HowItWorks';


const CallingStyled = styled.div`
  color: #333;
  background-color: #fff;
`

const CallerStyled = styled.div`
  background-color: #ffd500;

  .caller {
    display: grid;
    align-items: start;
  }
`


const CallDuration = () => {
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(duration + 1)
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, setDuration]);

  return (
    <span>{`${duration}s`}</span>
  )
}


interface Props {
  apiUrl: string
  target: Target
  call: Call
  emitChange: (call?: Call) => void
  pollInterval?: number
}

const CallingWidget = ({ apiUrl, target, call, emitChange, pollInterval = 500 }: Props) => {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${apiUrl}${call.url}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        const newCall = await response.json()

        if (newCall.status !== call.status) {
          emitChange(newCall)
        }
      } catch (err) {
        console.error(err)
        emitChange(undefined)
      }
    }, pollInterval);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <CallingStyled>
      <CallerStyled>
        {/* <span className="fa fa-phone ring" /> */}
        <div className='caller'>
          <span>{target.name}</span>
          {call.status !== 'in-progress' ? (
            <span>Discando...</span>
          ) : (
            <span>Chamada em andamento</span>
          )}
        </div>
        {call.status === 'in-progress' && <CallDuration />}
      </CallerStyled>
      <HowItWorks />
    </CallingStyled>
  );
}

export default CallingWidget