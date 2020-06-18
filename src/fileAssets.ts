const fileExts = {
  ts: 'ts',
  js: 'js',
  java: 'java',
  cpp: 'cpp',
  c: 'c',
  h: 'c',
  hpp: 'cpp',
  yml: 'yaml',
  html: 'html',
  htm: 'html',
  css: 'css',
  php: 'php',
  rb: 'ruby',
  py: 'python',
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
