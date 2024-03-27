function generateMailContent(userName, verificationLink) {
  const mailContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            /* Reset styles */
            body, h1, p {
                margin: 0;
                padding: 0;
            }
            
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                background-color: #f7f7f7;
                color: #333333;
            }
            
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            h1 {
                font-size: 24px;
                margin-bottom: 20px;
            }
            
            p {
                margin-bottom: 20px;
            }
            
            a {
                color: #007bff;
                text-decoration: none;
                color:white;
            }
            
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #ffffff;
                border-radius: 4px;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Verify Your Email Address</h1>
            <p>Dear ${userName}</p>
            <p>Welcome to our platform! We're thrilled to have you join us.</p>
            <p>To ensure the security of your account and complete your registration, we need to verify your email address.</p>
            <p>Please click the following link to verify your email:</p>
            <p><a class="button" style="color:white;" href="${verificationLink}">Verify Email</a></p>
            <p>If you're unable to click the link, you can copy and paste it into your browser's address bar.</p>
            <p>Once your email is verified, you'll have full access to our platform. </p>
            <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team at https://digiexcel.in .</p>
            <p>Thank you for joining us!</p>
            <p>Best regards,<br>Digi Excel</p>
        </div>
    </body>
    </html>
    `;

  return mailContent;
}

export { generateMailContent };
