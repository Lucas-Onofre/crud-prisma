type ErrorType = {
  message: string;
  statusCode: number;
  action: string;
  key: string;
};

export class BaseError extends Error {
  public readonly statusCode: number;
  public readonly action: string;
  public readonly key: string;

  constructor({ message, statusCode, action, key }: ErrorType) {
    super(message);
    this.statusCode = statusCode;
    this.action = action;
    this.key = key;
  }
}
