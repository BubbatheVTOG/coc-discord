import { OutputChannel, workspace } from 'coc.nvim';

export enum LogLevel {
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
}

export type LoggerOptions = {
  logLevelDefined: boolean;
  logLevel: LogLevel;
};

export const LoggerConfigText: string = 'coc_discord_neovim_log_level';
export const LoggerEvalText: string = `eval("${LoggerConfigText}")`;

export class Logger {
  private output: OutputChannel;

  private loggerOptions: LoggerOptions;

  /**
   * @public
   * @param {workspaceName} The name of the logger instance.
   */
  public constructor(workspaceName: string, loggerOptions?: LoggerOptions) {
    this.output = workspace.createOutputChannel(workspaceName);

    // Figure out our logging level if one in injected.
    if (!loggerOptions || !loggerOptions.logLevelDefined) {
      const logLevelDefined = true;
      const logLevel = LogLevel.INFO;
      this.loggerOptions = {
        logLevelDefined,
        logLevel,
      };
    }
  }

  /**
   * Convert data of various types to a string.
   *
   * @private
   * @param {data:any} Various types of data types that will be printed.
   * @returns {string} The data as a string.
   */
  // eslint throws a hissy-fit becasue there is no use of the word "this" in the next block. smh.
  // eslint-disable-next-line class-methods-use-this
  private dataToString(...args: any[]): string {
    return args.map((x) => (typeof x === 'object' ? JSON.stringify(x) : x)).join(' ');
  }

  /**
   * @public
   * @param {message:string} A message to print.
   * @param {data?:any} Optional additional data.
   */
  public info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  /**
   * @public
   * @param {message:string} A message to print.
   * @param {data?:any} Optional additional data.
   */
  public warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  /**
   * @public
   * @param {message:string} A message to print.
   * @param {data?:any} Optional additional data.
   */
  public error(message: string, data?: any): void {
    this.log(LogLevel.ERROR, message, data);
  }

  /**
   * @private
   * @param {logLevel:string} The logging level.
   * @param {message:string} A message to print.
   * @param {data?:any} Optional additional data.
   */
  private log(logLevel: LogLevel, message: string, data?: any): void {
    if (this.loggerOptions.logLevel >= logLevel) {
      this.output.appendLine(`[${logLevel}  - ${new Date().toLocaleTimeString()}] - ${message}`);

      if (data) {
        this.output.appendLine(this.dataToString(data));
      }
    }
  }
}
