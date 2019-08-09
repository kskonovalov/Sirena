# Sirena

Demo: [kskonovalov.me/samples/sirena/](http://kskonovalov.me/samples/sirena/)

This app was created to help view and count money of sold tickets for accounting.

It uses api to get data, i used [MockApi](https://www.mockapi.io) to get some sample data.

The app create a request to api when changing **date** or **count** of entries to load.

It can count total sum of money, or count total sum of **highlighted** items money. **Highlighted** is just a flag, or can be computed depends of current data item.

App allow to **show** or **hide** table's columns.

**Limit**, **date**, **visible table columns** values stored in cookies, and when you refresh the page, they applies.

##

**Tech stack used:** CRA, Bootstrap, react-cookie, react-datepicker.

**I also used**: eslint with airbnb rules, prettier

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.