import { OutputChannel, workspace } from 'coc.nvim';

export class Logger {
  private output: OutputChannel;

  /**
   * @public
   * @param {workspaceName} The name of the logger instance.
   */
  public constructor(workspaceName: string) {
    this.output = workspace.createOutputChannel(workspaceName);
  }

  /**
   * Convert data of various types to a string.
   *
   * @private
   * @param {data} Various types of data types that will be printed.
   * @returns {string} The data as a string.
   */
  // eslint throws a hissy-fit becasue there is no use of the word "this" in the next block. smh.
  // eslint-disable-next-line class-methods-use-this
  private dataToString(data: any): string {
    if (data instanceof Error) {
      return data.message;
    }
    if (data.success instanceof Boolean && !data.success && data.message instanceof String) {
      return data.message;
    }
    if (data instanceof String) {
      return data.toString();
    }
    return data.toString();
  }

  /**
   * @public
   * @param {message} A message to print.
   * @param {data?} Optional additional data.
   */
  public info(message: string, data?: any): void {
    this.log('Info', message, data);
  }

  /**
   * @public
   * @param {message} A message to print.
   * @param {data?} Optional additional data.
   */
  public warn(message: string, data?: any): void {
    this.log('Warn', message, data);
  }

  /**
   * @public
   * @param {message} A message to print.
   * @param {data?} Optional additional data.
   */
  public error(message: string, data?: any): void {
    this.log('Erro', message, data);
  }

  /**
   * @public
   * @param {logLevel} The logging level.
   * @param {message} A message to print.
   * @param {data?} Optional additional data.
   */
  public log(logLevel: string, message: string, data?: any): void {
    this.output.appendLine(`[${logLevel}  - ${new Date().toLocaleTimeString()}] - ${message}`);

    if (data) {
      this.output.appendLine(this.dataToString(data));
    }
  }
}
