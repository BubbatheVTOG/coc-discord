import { workspace } from 'coc.nvim';
import { Client } from 'discord-rpc';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';

const clientId = '721172077033553950';
const largeImageKey = 'neovim-512';

const output = workspace.createOutputChannel('discord');

const getFileIcon = (fileName: string): string => {
  const ext = fileName.split('.').pop() || '';
  switch (ext) {
    case 'ts':
      return 'typescript-512';
    default:
      return null;
  }
};

const setActivity = (client: Client, startTimestamp: number): void => {
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

  client.setActivity({
    state,
    details,
    startTimestamp,
    largeImageKey,
    smallImageKey: getFileIcon(details) || ' ',
    instance: false,
  });
};

const activate = (): void => {
  const discordRpcClient = new Client({ transport: 'ipc' });

  discordRpcClient.connect(clientId);
  discordRpcClient
    .login({ clientId })
    .catch(() => output.appendLine('Could not connect coc-discord client to Discord.'));

  const startTimestamp = Date.now();

  discordRpcClient.on('ready', () => {
    setActivity(discordRpcClient, startTimestamp);
    setInterval(() => setActivity(discordRpcClient, startTimestamp), 10000);
  });
};

export { activate };
