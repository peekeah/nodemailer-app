
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


#### Create User
* `POST /signup`: signup
`Body`: 
```
{
    "name": "your name",
    "email": "yourname@example.com",
    "password": "your password"
}
```

#### Login
* `POST /login`: Login
`Body`: 
```
{
    "email": "yourname@example.com",
    "password": "your password"
}
```

#### Reset Password
* `PUT /forgetpassword`: Reset Password
`Body`: 
```
{
    "email": "yourname@example.com",
}
```

#### Send Mail
* `POST /mailsend`: Send Mail
`Body`: 
```
{
    "receiverEmail": "receiver_email@example.com",
    "subject": "nail subject",
    "text": "mail text"
}
```


` Headers`:
```
access-token: Auth key(JWT token)
```

