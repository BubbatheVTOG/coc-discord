import { workspace } from 'coc.nvim';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import { Client } from 'discord-rpc';
import { getFileTypeIcon, NeovimImageKey } from './fileAssets';
import { Logger } from './logger';

const logger: Logger = new Logger('discord-neovim');

export type activity = {
  state: string;
  details: string;
  startTimestamp: number;
  largeImageKey: string;
  smallImageKey?: string;
  instance: boolean;
};

export class CocDiscordClient {
  private discordRpcClient: Client;

  private elapseUpdateDuration: number;

  constructor(clientId: string, elapseUpdateDuration?: number) {
    logger.info(`Creaing coc-discord-neovim client with client ID: ${clientId}`);
    this.discordRpcClient = new Client({ transport: 'ipc' });
    this.discordRpcClient.connect(clientId);
    this.discordRpcClient.login({ clientId }).catch((e) => logger.error(e));
    this.elapseUpdateDuration = elapseUpdateDuration || 10000;
  }

  public start(): void {
    this.discordRpcClient.on('ready', () => {
      this.discordRpcClient.setActivity(this.buildActivity());
      setInterval(() => this.discordRpcClient.setActivity(this.buildActivity()), this.elapseUpdateDuration);
      logger.info(`Started coc-discord-neovim client. Updating activity every ${this.elapseUpdateDuration / 1000}s.`);
    });
  }

  // eslint throws a hissy-fit becasue there is no use of the word "this" in the next block. smh.
  // eslint-disable-next-line class-methods-use-this
  private buildActivity(): activity {
    const startTimestamp = Date.now();

    const details: string = pipe(
      O.fromNullable(workspace.uri),
      O.filter((x) => x.startsWith('file:///')),
      O.map((x) => x.substr(8)),
      O.map((x) => x.split('/')),
      O.filter((xs) => xs.length > 0),
      O.map((xs) => xs.reverse()[0]),
      O.map((x) => `Editing ${x}`),
      O.toUndefined,
    );

    const state: string = pipe(
      O.fromNullable(workspace.root),
      O.map((x) => x.split('/')),
      O.filter((xs) => xs.length > 0),
      O.map((xs) => xs.reverse()[0]),
      O.map((x) => `On ${x}`),
      O.toUndefined,
    );

    const fileIcon = getFileTypeIcon(details);

    let currentActivity: activity;

    if (fileIcon) {
      currentActivity = {
        state,
        details,
        startTimestamp,
        largeImageKey: fileIcon,
        smallImageKey: NeovimImageKey,
        instance: false,
      };
    } else {
      currentActivity = {
        state,
        details,
        startTimestamp,
        largeImageKey: NeovimImageKey,
        instance: false,
      };
    }
    return currentActivity;
  }
}
