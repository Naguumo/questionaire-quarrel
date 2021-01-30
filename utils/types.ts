export interface IMemberInfo {
  socketId: string;
  username: string;
}

export interface IGameInfo {
  teamA: {
    members: [IMemberInfo];
    points: number;
  };
  teamB: {
    members: [IMemberInfo];
    points: number;
  };
  buzzedTeam: string;
  questions: [string];
}
