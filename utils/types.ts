export interface IRoomInfo {
  teamA: {
    name: string;
    members: Array<string>;
    points: number;
  };
  teamB: {
    name: string;
    members: Array<string>;
    points: number;
  };
  buzzedPlayer?: string;
  questions?: Array<string>;
}

export interface IUserInfo {
  readonly socket: string;
  username: string;
  room?: string;
}
