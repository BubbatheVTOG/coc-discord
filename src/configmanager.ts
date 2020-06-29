import * as dotenv from 'dotenv';
import { NvimPlugin } from 'neovim';
import { LoggerOptions, LogLevel } from './logger';
import { ClientOptions } from './coc-discord-client';

dotenv.config();

// Logger vimrc text declarations.
const LogLevelText: string = 'coc_discord_neovim_log_level';
const LogLevelEvalText: string = `eval("${LogLevelText}")`;

// Client vimrc text declarations.
const ClientIDText: string = 'coc_discord_neovim_client_id';
const ClientIDEvalText: string = `eval("${ClientIDText}")`;
const ClientElapseTimeText: string = 'coc_discord_neovim_client_elapse_time';
const ClientElapseTimeEvalText: string = `eval("${ClientElapseTimeText}")`;

export class ConfigManager {
  private plugin:NvimPlugin;

  loggingConfig:LoggerOptions = {
    logLevel: LogLevel.WARN,
  };

  clientConfig:ClientOptions = {
    clientId: process.env.CLIENT_ID || '721172077033553950',
    elapseUpdateDuration: parseInt(process.env.ELAPSE_UPDATE_DURATION, 10) || 10000,
  };

  constructor() {
    this.plugin.setOptions({
      dev: true,
      alwaysInit: true,
    });
    this.buildLoggerConfig();
    this.buildClientConfig();
  }

  /**
   * Builds the configuration for the logger if one is present.
   *
   * @private
   * @returns {Promise<void>}
   */
  private async buildLoggerConfig(): Promise<void> {
    const isLogLevelDefined = Boolean(await this.plugin.nvim.eval(LogLevelEvalText)) || false;

    if (isLogLevelDefined) {
      const logLevel:LogLevel = Number(await this.plugin.nvim.getVar(LogLevelText));
      this.loggingConfig = {
        logLevel,
      };
    }
  }

  /**
   * Builds the configuration for the logger if one is present.
   *
   * @private
   * @returns {Promise<void>}
   */
  private async buildClientConfig(): Promise<void> {
    const isClientIdDefined = Boolean(await this.plugin.nvim.eval(ClientIDEvalText)) || false;

    if (isClientIdDefined) {
      const clientId = String(await this.plugin.nvim.getVar(ClientIDText));
      this.clientConfig = {
        clientId,
        elapseUpdateDuration: this.clientConfig.elapseUpdateDuration,
      };
    }

    const isElapseUpdateDurationDefined = Boolean(await this.plugin.nvim.eval(ClientElapseTimeEvalText)) || false;

    if (isElapseUpdateDurationDefined) {
      const elapseUpdateDuration = Number(await this.plugin.nvim.getVar(ClientElapseTimeText));
      this.clientConfig = {
        clientId: this.clientConfig.clientId,
        elapseUpdateDuration,
      };
    }
  }
}
