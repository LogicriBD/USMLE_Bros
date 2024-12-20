class Logger {
  log(...args: any[]) {
    if (!this.isProductionEnvironment()) {
      console.log(args);
    }
  }

  error(...args: any[]) {
    if (!this.isProductionEnvironment()) {
      console.error(args);
    }
  }

  warn(...args: any[]) {
    if (!this.isProductionEnvironment()) {
      console.warn(args);
    }
  }

  info(...args: any[]) {
    if (!this.isProductionEnvironment()) {
      console.info(args);
    }
  }

  debug(...args: any[]) {
    if (!this.isProductionEnvironment()) {
      console.debug(args);
    }
  }

  isProductionEnvironment() {
    return (
      process.env.NODE_ENV === "production" ||
      process.env.NEXT_PUBLIC_ENVIRONMENT === "production"
    );
  }
}

export const logger = new Logger();
