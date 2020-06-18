import * as dotenv from 'dotenv';
import { CocDiscordClient } from './coc-discord-client';

dotenv.config();

const clientId: string = process.env.CLIENT_ID || '721172077033553950';
const elapseUpdateDuration: number = parseInt(process.env.ELAPSE_UPDATE_DURATION, 10) || 10000;

const activate = () => {
  const client = new CocDiscordClient(clientId, elapseUpdateDuration);
  client.start();
};

export { activate };
