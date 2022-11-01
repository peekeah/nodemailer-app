# Nodemailer App
### Environment Variables
| Name | Description |
| --- | --- |
| MONGO_URL | MongoDB Url |
| PORT | Server Port |
| JWT_SECRET | JWT secret key for encryption and decryption of token |
| JWT_EXPIRY | JWT token expiry time |
| MAIL_HOST | Smtp mail host |
| MAIL_USERNAME | Smtp mail username |
| MAIL_PASSWORD | Smtp mail password |


### API Endpoints
| HTTP Verbs | Endpoints | Action | Required Auth |
| --- | --- | --- | :---: |
| GET | api/| Home page | No |
| POST | api/signup | Create user | No |
| POST | api/login | Generate token | No |
| PUT | api/forgetpassword | Generate new password | No |
| POST | api/mailsend | To send mail to receiver | Yes |


### Headers
`access-token`: Auth key(JWT token)

