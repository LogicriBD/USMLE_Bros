import fs from "fs";
import path from "path";

class Logger {
  private path: string;

  constructor() {
    this.path = path.join(__dirname, "../", "logs");
  }

  log(...args: any[]) {
    if (!this.isProductionEnvironment()) {
      console.log(args);
    } else {
      args.push("log:: ");
      fs.writeFileSync(this.path, args.join(" "), { flag: "a+" });
    }
  }

  error(...args: any[]) {
    if (!this.isProductionEnvironment()) {
      console.error(args);
    } else {
      args.push("error:: ");
      fs.writeFileSync(this.path, args.join(" "), { flag: "a+" });
    }
  }

  warn(...args: any[]) {
    if (!this.isProductionEnvironment()) {
      console.warn(args);
    } else {
      args.push("warn:: ");
      fs.writeFileSync(this.path, args.join(" "), { flag: "a+" });
    }
  }

  info(...args: any[]) {
    if (!this.isProductionEnvironment()) {
      console.info(args);
    } else {
      args.push("info:: ");
      fs.writeFileSync(this.path, args.join(" "), { flag: "a+" });
    }
  }

  debug(...args: any[]) {
    if (!this.isProductionEnvironment()) {
      console.debug(args);
    } else {
      args.push("debug:: ");
      fs.writeFileSync(this.path, args.join(" "), { flag: "a+" });
    }
  }

  isProductionEnvironment() {
    return process.env.NODE_ENV === "production";
  }
}

export const logger = new Logger();
