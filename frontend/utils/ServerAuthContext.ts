class ServerAuthContextImpl {
  private static loggedIn: boolean = false;

  public isLoggedIn(): boolean {
    return ServerAuthContextImpl.loggedIn;
  }

  public setLoggedIn(loggedIn: boolean): void {
    ServerAuthContextImpl.loggedIn = loggedIn;
  }
}

export const ServerAuthContext = new ServerAuthContextImpl();
