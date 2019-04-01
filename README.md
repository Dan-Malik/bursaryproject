# Adding Trainees

As a prerequiste Node.js needs to be installed

# Deployment
## Setup Database

- Install MongoDB from: https://www.mongodb.com/download-center/community
- Add install directory to your environment variables (default is "C:\Program Files\MongoDB\Server\4.0\bin")
- Open command window and run:
```
mongod
mongo
use trainees
```

## Start Express/Node App

- Navigate to <Local_Git_Folder>/NodeExpress and and run:
```
npm install
node server.js
```

## Start React App

- Navigate to <Local_Git_Folder>/React and and run:
```
npm install
npm start
```

Navigate to localhost:3000 and click "Add Trainee" from the Nav bar, fill and submit the form. Navigate to localhost:4000/trainee and your added trainee should be displayed.
