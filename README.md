# anonymous-chat
https://anonymous-chat-lj0w.onrender.com
## Description


### Project configuration:

### Client
- Typescript
- React
- React-Router
- Webpack
- Mobx
- Bootstrap
- Ant design
- Socket.io
### Server
- Node.js v19.9.0
- Express
- MySql
- Sequelize
- Socket.io

### Build && Launch

<ol>

<li> Clone the repository to your local machine: </li>

```bash
    git clone https://github.com/KirillSDev/anonymous-chat
```

<li>  Install dependencies using yarn: </li>

```bash
    yarn
    cd client 
    yarn
```

<li>   To run the project, you will need to create a .env file at the root of the project and add the following variables:  </li>

```bash
   DB_DATABASE=yourdb
   DB_HOST=yourhost
   DB_PASSWORD=root
   DB_USER=root
   PORT=3000
   SOCKET_SERVER_URL=http://localhost:3000
```

If you do not have these credentials, please contact the project owner to obtain them.

<li> Start the development server: </li>

```bash
   yarn client
   yarn dev
```

