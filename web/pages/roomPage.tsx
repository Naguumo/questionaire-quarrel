import React from 'react';
import { route } from 'navi';
import { css } from '@emotion/css';

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
    'settings-a buzzer settings-b';

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

  .settings-a {
    grid-area: settings-a;
  }

  .settings-b {
    grid-area: settings-b;
  }
`;

interface RoomPageProps {
  id: string;
}

const RoomPage = ({ id }: RoomPageProps): JSX.Element => {
  return (
    <div className={roomCSS}>
      <div className='team-a-label'>Team A</div>
      <div className='team-b-label'>Team B</div>
      <div className='question-prompt'>This is Room {id}</div>
      <div className='answer-possibilities'>Answers</div>
      <div className='team-a-list'>Team A List</div>
      <div className='team-b-list'>Team B List</div>
      <div className='buzzer'>Buzzer</div>
      <div className='settings-b'>Settings</div>
    </div>
  );
};

export default route(async ({ params: { id } }) => {
  return { view: <RoomPage id={id} /> };
});
