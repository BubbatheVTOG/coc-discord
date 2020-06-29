import { OutputChannel, workspace } from 'coc.nvim';

export enum LogLevel {
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
}

export type LoggerOptions = {
  logLevel: LogLevel;
};

export class Logger {
  private static output: OutputChannel;

  private static loggerConfig: LoggerOptions = {
    logLevel: LogLevel.ERROR,
  };

  /**
   * @public
   * @param {workspaceName} The name of the logger instance.
   */
  public constructor(workspaceName: string, loggerConfig?: LoggerOptions) {
    Logger.output = workspace.createOutputChannel(workspaceName);
    if (loggerConfig) {
      Logger.loggerConfig = loggerConfig;
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
  private static dataToString(...args: any[]): string {
    return args.map((x) => (typeof x === 'object' ? JSON.stringify(x) : x)).join(' ');
  }

  /**
   * @public
   * @param {message:string} A message to print.
   * @param {data?:any} Optional additional data.
   */
  public static info(message: string, data?: any): void {
    Logger.log(LogLevel.INFO, message, data);
  }

  /**
   * @public
   * @param {message:string} A message to print.
   * @param {data?:any} Optional additional data.
   */
  public static warn(message: string, data?: any): void {
    Logger.log(LogLevel.WARN, message, data);
  }

  /**
   * @public
   * @param {message:string} A message to print.
   * @param {data?:any} Optional additional data.
   */
  public static error(message: string, data?: any): void {
    Logger.log(LogLevel.ERROR, message, data);
  }

  /**
   * @private
   * @param {logLevel:string} The logging level.
   * @param {message:string} A message to print.
   * @param {data?:any} Optional additional data.
   */
  private static log(logLevel: LogLevel, message: string, data?: any): void {
    if (Logger.loggerConfig.logLevel >= logLevel) {
      Logger.output.appendLine(`[${logLevel} - ${new Date().toLocaleTimeString()}] - ${message}`);

      if (data) {
        Logger.output.appendLine(this.dataToString(data));
      }
    }
  }
}
