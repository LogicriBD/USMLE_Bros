class Logger {
  log(...args: any[]) {
    if (!this.isProductionEnvironment()) {
      console.log(args);
    } else {
      args.push("\n");
      fetch(`${process.env.API_URL}/api/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: args.join(" "), level: "log" }),
      });
    }
  }

  error(...args: any[]) {
    if (!this.isProductionEnvironment()) {
      console.error(args);
    } else {
      args.push("\n");
      fetch(`${process.env.API_URL}/api/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: args.join(" "), level: "log" }),
      });
    }
  }

  warn(...args: any[]) {
    if (!this.isProductionEnvironment()) {
      console.warn(args);
    } else {
      args.push("\n");
      fetch(`${process.env.API_URL}/api/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: args.join(" "), level: "log" }),
      });
    }
  }

  info(...args: any[]) {
    if (!this.isProductionEnvironment()) {
      console.info(args);
    } else {
      args.push("\n");
      fetch(`${process.env.API_URL}/api/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: args.join(" "), level: "log" }),
      });
    }
  }

  debug(...args: any[]) {
    if (!this.isProductionEnvironment()) {
      console.debug(args);
    } else {
      args.push("\n");
      fetch(`${process.env.API_URL}/api/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: args.join(" "), level: "log" }),
      });
    }
  }

  isProductionEnvironment() {
    return (
      process.env.NODE_ENV === "production" ||
      process.env.NEXT_PUBLIC_NODE_ENV === "production"
    );
  }
}

export const logger = new Logger();
