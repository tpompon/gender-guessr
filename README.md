# Gender Guessr!

This is a React/Node web application using [Genderize.io API](https://genderize.io/).

Also, this is a game where you have to guess the gender of the firstname given.

You start with 10 points, when you're wrong you loose 1 point and when you're right you get 1 point.
When you reach 0 points you loose the game but if you reach 20 points you win.

## How to run it ?

`git clone https://github.com/tpompon/gender-guessr.git`  
`cd gender-guessr && npm start`

__Before:__ Don't forget to edit in `gender-guessr/server/config.js` the database informations with your MySQL credentials/informations

## Developement

This app took me about 3 days (with some hours each day), I didn't create a Store but it could be an option to have better access on some variables (like points/status) accross the React components

## Possible improvements

- Create sessions to store the activity of a user, add the possibility to register with username  
___How:___ Create a MySQL Table users, create a view on client side to send informations to the server via the Express API and store the user with a query

- Create a timer for 'scoring'  
___How:___ Add a column in user database to register the best time, on client side tell the user what is his best time and if he beat it or not at the end of the game

- Create a Leaderboard  
___How:___ Create a Leaderboard page that retrieves the scores data of all users to make a list asc/desc of the users best scores
