import { CocDiscordClient } from './coc-discord-client';
import { Logger } from './logger';
import { ConfigManager } from './configmanager';

const activate = () => {
  const configmanager = new ConfigManager();

  // eslint-disable-next-line no-new
  new Logger('discord-neovim', configmanager.loggingConfig);

  const client = new CocDiscordClient(configmanager.clientConfig);
  client.start();
};

export { activate };
