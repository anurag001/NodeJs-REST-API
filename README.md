# NodeJs-REST-API

1. Run -> npm install
2. Run -> node server.js
3. Use POST req to create user: http://localhost:8000/users/create
4. Use POST req for login with authentication:  http://localhost:8000/users/authenticate
It will generate jwt token which we have to use for the below requests
5. Use delete req to delete user: http://localhost:8000/users/60acb965df2178245befbfe3
6. Use Get req to fetch userList along with pagination; http://localhost:8000/users/1
