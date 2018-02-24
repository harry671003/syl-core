function ErrorHandler(logger) {
  this.logger = logger;
}

ErrorHandler.prototype.handleError = function handleError(error) {
  // eslint-disable-next-line no-console
  console.error(
    `[-] ${(new Date()).toUTCString()} uncaughtException: `,
    error.message,
  );
  // eslint-disable-next-line no-console
  console.error(error.stack);
};

module.exports = ErrorHandler;
