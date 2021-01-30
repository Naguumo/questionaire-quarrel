export interface IMemberInfo {
  socketId: string;
  username: string;
}

export interface IGameInfo {
  teamA: {
    name: string;
    members: [IMemberInfo];
    points: number;
  };
  teamB: {
    name: string;
    members: [IMemberInfo];
    points: number;
  };
  buzzedPlayer: IMemberInfo;
  questions: [string];
}
