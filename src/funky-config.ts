export interface DiscordCommandDeploymentConfig {
  clientId: string;
  guildId: string;
}

export interface DiscordConfig {
  token: string;
  commandDeployment?: DiscordCommandDeploymentConfig;
}

export interface FunkyConfig {
  discord: DiscordConfig;
}
