
export interface UserStat {
  id: string;
  user_id: string;
  brawler_id: number;
  games_played?: number;
  victories?: number;
  defeats?: number;
  draws?: number;
  last_played?: string;
  favorite_game_mode?: string;
}
