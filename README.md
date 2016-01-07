# Job Scheduler

Front-end clone of [Heroku Scheduler][1]. To start the server locally, clone this repo and run
```
npm install
npm start
```
and then go to http://localhost:8000/app/.

## Running tests
To run the unit tests, run ```npm test```.

To run the end-to-end tests, make sure the server is running, then in another tab, run
```
npm run update-webdriver
npm run protractor
```

[1]: https://scheduler.heroku.com/dashboard
