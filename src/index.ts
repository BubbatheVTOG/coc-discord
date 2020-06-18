import * as dotenv from 'dotenv';
import { CocDiscordClient } from './coc-discord-client';

dotenv.config();

const clientId: string = process.env.CLIENT_ID || '721172077033553950';

const activate = () => {
  const client = new CocDiscordClient(clientId);
  client.start();
};

export { activate };
