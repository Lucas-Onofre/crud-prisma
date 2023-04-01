type ErrorType = {
  message: string;
  code: number;
  action: string;
  key: string;
};

export class BaseError extends Error {
  public readonly code: number;
  public readonly action: string;
  public readonly key: string;

  constructor({ message, code, action, key }: ErrorType) {
    super(message);
    this.code = code;
    this.action = action;
    this.key = key;
  }
}
