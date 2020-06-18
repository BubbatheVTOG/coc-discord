import { Logger } from './logger';

const logger = new Logger('discord-neovim');

const fileExts = {
  ts: 'typescript-512',
  js: 'javascript-512',
  java: 'java-512',
  cpp: 'cpp-512',
  c: 'c-512',
  h: 'c-512',
  hpp: 'cpp-512',
  yml: 'yaml-512',
  html: 'html-512',
  htm: 'html-512',
  css: 'css-512',
  php: 'php-512',
  rb: 'ruby-512',
  py: 'python-512',
};

export const NeovimImageKey = 'neovim-512';

export function getFileTypeIcon(fileName: string): string | null {
  let retVal: string | null;
  if (!fileName || fileName.length === 0) {
    retVal = null;
  } else {
    retVal = fileExts[fileName.split('.').pop()];
  }
  return retVal;
}
