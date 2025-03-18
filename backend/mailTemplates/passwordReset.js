exports.passwordResetConfirmation = (email, name) => {
  return `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>Password Reset Confirmation</title>
          <style>
              body {
                  background-color: #ffffff;
                  font-family: Arial, sans-serif;
                  font-size: 16px;
                  line-height: 1.4;
                  color: #333333;
                  margin: 0;
                  padding: 0;
              }
      
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  text-align: center;
              }
      
              .logo {
                  max-width: 200px;
                  margin-bottom: 20px;
              }
      
              .message {
                  font-size: 18px;
                  font-weight: bold;
                  margin-bottom: 20px;
              }
      
              .body {
                  font-size: 16px;
                  margin-bottom: 20px;
              }
      
              .support {
                  font-size: 14px;
                  color: #999999;
                  margin-top: 20px;
              }
      
              .highlight {
                  font-weight: bold;
              }
          </style>
      
      </head>
      
      <body>
          <div class="container">
              <a href="https://studynotion-edtech-project.vercel.app">
                  <img class="logo" src="https://res.cloudinary.com/deru8rihm/image/upload/v1739174882/StudyNotion/b6rfxe54rmjn9anoewqk.png" 
                      alt="StudyNotion Logo">
              </a>
              <div class="message">Password Reset Successful</div>
              <div class="body">
                  <p>Hey ${name},</p>
                  <p>Your password has been successfully reset for the email <span class="highlight">${email}</span>.</p>
                  <p>If you did not request this reset, please change your password immediately and contact support.</p>
                  <p>For enhanced security, ensure your new password is strong and unique.</p>
              </div>
              <div class="support">
                  If you have any questions or need assistance, reach out to us at
                  <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We're here to help!
              </div>
          </div>
      </body>
      
      </html>`;
};
