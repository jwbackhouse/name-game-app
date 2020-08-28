# Name Game App

This is an online version of 'The Name Game'.

In the offline version, players write down a selection of famous people's names (each on a separate piece of paper) and put them into a hat. The players are divided into two teams. Each player then has a certain amount of time to get their team to guess as many names as possible - they can use any words or actions other than what's actually written on the paper. When a name is successfully guessed it's taken out of the hat and added to that team's score. If time runs out then any unguessed names are put back into the hat. The game continues until all names have been guessed, and the team with the highest score wins.

This version replicates this game online, allowing people to play remotely over video calls. It just needs hosting and the URL given to the players.


### Things to note
- There is an admin page at /admin that allows you to set the number of passes allowed per turn and the timer length. The page requires the password 'namegame' to access.
- Players need to login with email/password


### To do
- Check for duplicate names upon entry
