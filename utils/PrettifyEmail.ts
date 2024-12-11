class PrettifyEmailImpl {
  linebreak: string = "<br>";
  tabSpace: string = "<br><br><br><br>";

  bold(text: string) {
    return `<b>${text}</b>`;
  }

  italic(text: string) {
    return `<i>${text}</i>`;
  }

  underline(text: string) {
    return `<u>${text}</u>`;
  }

  otp(text: string) {
    return `<div style="max-width:100%; margin: 20px; padding: 20px;">
    ${text
      .split("")
      .map(
        (t) => `
      <span style="
        display: inline-block;
        padding: 8px;
        margin: 0 4px;
        border: 2px solid #438796;
        border-radius: 4px;
        font-weight: bold;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        font-size: 1.175em;
        color: #438796;
      ">${t}</span>`
      )
      .join("")}
    </div>`;
  }

  template(subject: string, message: string) {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>USMLE Bros</title>
  </head>
  <body style="font-family: sans-serif; background: linear-gradient(#438796, #ffffff); color: #4D9BA9; margin: 0; padding: 0; width: 100%; text-align: center;">
    <div style="max-width: 90%; margin: 20px auto; padding: 20px; background-color: #ffffff; box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); border: 2px solid #4D9BA9;">
      <h1 style="color: #438796; font-size: 2.5em; margin: 20px 0;">${subject}</h1>
      <div style="text-align: left;">
        <p style="color: #4D9BA9; font-weight: bold;">Greetings,</p>
        <p style="color: #4D9BA9; font-weight: bold;">${message}</p>
        <p style="color: #4D9BA9;">Kind Regards,</p>
        <p style="color: #4D9BA9;">Admin, USMLE Bros</p>
      </div>
    </div>
  </body>
</html>`;
  }

  insertLink = (url: string) => {
    return `<a href="${url}" style="color: #438796; text-decoration: underline;">${url}</a>`;
  };
}

export const PrettifyEmail = new PrettifyEmailImpl();
