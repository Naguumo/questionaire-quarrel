import React, { useEffect, useState } from 'react';
import { route } from 'navi';
import { css } from '@emotion/css';
import { Card } from 'primereact/card';
import { socket } from '../utils/socket';
import { IRoomInfo } from '../../utils/types';

const roomCSS = css`
  height: 98vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 50% 1fr;
  grid-template-rows: 15% 60% 25%;
  gap: 1% 1%;
  grid-template-areas:
    'team-a-label question-prompt team-b-label'
    'team-a-list answer-possibilities team-b-list'
    'information buzzer settings';

  .team-a-label {
    grid-area: team-a-label;
  }

  .team-b-label {
    grid-area: team-b-label;
  }

  .question-prompt {
    grid-area: question-prompt;
  }

  .answer-possibilities {
    grid-area: answer-possibilities;
  }

  .team-a-list {
    grid-area: team-a-list;
  }

  .team-b-list {
    grid-area: team-b-list;
  }

  .buzzer {
    grid-area: buzzer;
  }

  .information {
    grid-area: information;
  }

  .settings {
    grid-area: settings;
  }
`;

interface RoomPageProps {
  id: string;
}

const RoomPage = ({ id }: RoomPageProps): JSX.Element => {
  const [data, setData] = useState<Partial<IRoomInfo>>();
  useEffect(() => {
    socket.on('roomState', (room: Partial<IRoomInfo>) => {
      setData(room);
      console.log('Hello', room);
    });
  }, []);
  return (
    <div className={roomCSS}>
      <Card className='team-a-label'>
        {data?.teamA?.name} - Points: {data?.teamA?.points}
      </Card>
      <Card className='team-b-label'>
        {data?.teamB?.name} - Points: {data?.teamB?.points}
      </Card>
      <Card className='question-prompt'>This is Room {id}</Card>
      <Card className='answer-possibilities'>Answers</Card>
      <Card className='team-a-list'>
        {data?.teamA?.members.map(val => (
          <p key={val}>{val}</p>
        ))}
      </Card>
      <Card className='team-b-list'>
        {data?.teamB?.members.map(val => (
          <p key={val}>{val}</p>
        ))}
      </Card>
      <Card className='buzzer'>Buzzer</Card>
      <Card className='information' />
      <Card className='settings'>
        <i className='pi pi-cog' />
      </Card>
    </div>
  );
};

export default route(async ({ params: { id } }) => {
  socket.emit('user', { room: id });
  return { view: <RoomPage id={id} /> };
});
