# Gender Guessr!

This is a React/Node web application using [Genderize.io API](https://genderize.io/).

Also, this is a game where you have to guess the gender of the firstname given.

You start with 10 points, when you're wrong you loose 1 point and when you're right you get 1 point.
When you reach 0 points you loose the game but if you reach 20 points you win.

## Requirements

- Node.js
- MySQL

## How to run it ?

`git clone https://github.com/tpompon/gender-guessr.git`

`cd gender-guessr`

`npm install`  
`npm install ./server`  
`npm install ./client`  

`npm start`

_Wait for React Client start on localhost:3000 by default_

__Before:__ Don't forget to edit in `gender-guessr/server/config.js` the database informations with your MySQL credentials/informations

## Developement

This app took me about 3 days (with some hours each day), I didn't create a Store but it could be an option to have better access on some variables (like points/status) accross the React components.

__Client:__

- App.js is the entry point of the client React App including the Header and Game component.
- Styles folder contains my CSS files.
- I used Hooks for the Game component, there is different states to handle game actions (status/points/firstname), when you land on the page, the game start and ask the server API for a firstname with a gender, when you click on Male or Female, React Game component treats the answer to add or remove point.

__Server:__

- _config.js:_ Configure the variables used in the server files
- _db.js:_ create the database with table firstnames if doesn't exist and fill it with 300 firstnames from the names.txt file
- _index.js:_ Express API with routes, /random give a random firstname with a query on the MySQL Database and gives the genre using the [Genderize.io API](https://genderize.io/)

## Possible improvements

- Create sessions to store the activity of a user, add the possibility to register with username  
___How:___ Create a MySQL Table users, create a view on client side to send informations to the server via the Express API and store the user with a query

- Create a timer for 'scoring'  
___How:___ Add a column in user database to register the best time, on client side tell the user what is his best time and if he beat it or not at the end of the game

- Create a Leaderboard  
___How:___ Create a Leaderboard page that retrieves the scores data of all users to make a list asc/desc of the users best scores
