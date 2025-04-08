exports.contactUsConfirmation = (name) => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Contact Form Submission Received</title>
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
        </style>
    </head>
    
    <body>
        <div class="container">
            <a href="https://studynotion-mi17.vercel.app/">
                <img class="logo" src="https://res.cloudinary.com/deru8rihm/image/upload/v1739174882/StudyNotion/b6rfxe54rmjn9anoewqk.png" 
                    alt="StudyNotion Logo">
            </a>
            <div class="message">Thank You for Contacting Us!</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>We have received your message and our support team will get back to you as soon as possible.</p>
                <p>If your inquiry is urgent, please feel free to reach out to us directly at <a href="mailto:info@studynotion.com">info@studynotion.com</a>.</p>
                <p>We appreciate your patience and will get back to you shortly.</p>
            </div>
            <div class="support">
                If you have any further questions, feel free to email us at <a href="mailto:info@studynotion.com">info@studynotion.com</a>.
            </div>
        </div>
    </body>
    </html>`;
};
