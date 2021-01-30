import React from 'react';
import { route } from 'navi';

interface RoomPageProps {
  id: string;
}

const RoomPage = ({ id }: RoomPageProps): JSX.Element => {
  return (
    <>
      <span>THIS IS ROOM {id}</span>
    </>
  );
};

export default route(async ({ params: { id } }) => {
  return { view: <RoomPage id={id} /> };
});
