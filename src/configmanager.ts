import { NvimPlugin } from 'neovim';
import {
  LoggerOptions,
  LogLevel,
  LoggerConfigText,
  LoggerEvalText,
} from './logger';

export class ConfigManager {
  private plugin:NvimPlugin;

  private loggingConfig:LoggerOptions;

  constructor() {
    this.plugin.setOptions({
      dev: true,
      alwaysInit: true,
    });
    this.buildLoggerConfig();
  }

  /**
   * Builds the configuration for the logger if one is present.
   *
   * @private
   * @returns {Promise<void>}
   */
  private async buildLoggerConfig(): Promise<void> {
    const logLevelDefined = Boolean(await this.plugin.nvim.getVar(LoggerConfigText));
    const logLevel:LogLevel = LogLevel[String(await this.plugin.nvim.getVar(LoggerEvalText))];

    this.loggingConfig = {
      logLevelDefined,
      logLevel,
    };
  }

  /**
   * Returns the LoggerOptions.
   *
   * @public
   * @returns {LoggerOptions} The logger options.
   */
  get loggerConfig(): LoggerOptions {
    return this.loggingConfig;
  }
}
