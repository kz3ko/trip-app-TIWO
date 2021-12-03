// eslint-disable-next-line import/prefer-default-export
export class FatalError extends Error {
  constructor(message: string) {
    super(`Fatal error: ${message}`);
  }
}
