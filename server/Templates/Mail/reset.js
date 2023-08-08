export default (name, reset) => {
  return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Password Template</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f2f2f2;
        margin: 0;
        padding: 0;
      }

      .header {
        position: relative;
        background-image: url("https://i.imgur.com/jvSDsi9.jpg");
        background-size: contain;
        padding: 20px;
        text-align: center;
        color: #000;
        font-size: 36px;
        font-weight: bold;
        letter-spacing: 5px;
        text-shadow: 0.5px 0.5px 5px #fff;
        margin-top: -20px;
        margin-left: -20px;
        margin-right: -20px;
        position: relative;
        z-index: 1;
      }

      .container {
        max-width: 800px;
        margin: 50px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .logo {
        text-align: center;
        margin-bottom: 20px;
        margin: 5px;
      }

      .logo img {
        max-width: 100px;
      }

      .reset-content {
        text-align: center;
      }

      .reset-text {
        font-size: 24px;
        color: #333;
        margin-bottom: 10px;
      }

      .reset-button {
        display: inline-block;
        outline: 0;
        cursor: pointer;
        border: none;
        padding: 0 56px;
        height: 45px;
        line-height: 45px;
        text-decoration: none;
        border-radius: 7px;
        background-color: #212b36;
        color: #fff;
        font-weight: 400;
        font-size: 16px;
        box-shadow: 0 4px 2px 0 #29313a;
        transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
      }

      .reset-link {
        display: block;
        padding-top: 15px;
        color: #0070f3;
        text-decoration: none;
      }

      .note {
        text-align: center;
        font-size: 14px;
        color: #777;
        margin-top: 20px;
      }

      .footer {
        text-align: center;
        width: 100%;
        margin-top: 30px;
      }

      .footer a {
        color: #007bff;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Welcome to TwinkChat</div>
      <div class="logo">
        <a href="https://twinkchat.netlify.app/">
          <img src="https://i.imgur.com/bteRwiD.jpg" alt="TwinkChat Logo" />
        </a>
      </div>
      <div class="reset-content">
        <div class="note">
          <p>Hey ${name},</p>
        </div>
        <div class="reset-text">Link To Reset Your Password:</div>
        <a class="reset-button" href="${reset}" target="_blank"
          >Reset Password</a
        >
        <a class="reset-link" href="${reset}" target="_blank">${reset}</a>
      </div>
      <div class="note">
        <p>Click on this button or Use this link to reset your password.</p>
      </div>
    </div>
    <div class="footer">
      <p>If you didn't request this Reset Link, please ignore this email.</p>
      <p>
        For any assistance, please contact
        <a href="mailto:twinkconnect@gmail.com">twinkconnect@gmail.com</a>.
      </p>
    </div>
  </body>
</html>

    `;
};
