# Calendar app
This app is a self contained app with a express API and nextjs frontend. 

## TODO
- Improve oauth with framework
- Add tests for the api and frontend
- Add stats
- Many to many relationship between reservation and tag
- Move API to web3

## Getting Started

First, run the API server: 
```bash
cd api
node index.js
```

Temporary: run the proxy to make oauth github authentication: 
```bash
npm install -g --save local-cors-proxy
 lcp --proxyUrl https://api.github.com/
```

Complete the .env files (.env and api/.env) with your values. 
In particular the set the NEXT_PUBLIC_ADMIN to your github login. 

Second, run the development server:

```bash
npm run dev
```


Open [http://localhost:3002](http://localhost:3002) with your browser to see the result.

## Play
![Alt text](public/app/signin.png?raw=true "Signin")
![Alt text](public/app/github.png?raw=true "Github")
![Alt text](public/app/calendar.png?raw=true "Calendar")
![Alt text](public/app/stats.png?raw=true "stats")
![Alt text](public/app/createslot.png?raw=true "slot")
![Alt text](public/app/createresa.png?raw=true "createresa")
![Alt text](public/app/deleteresa.png?raw=true "deleteresa")

