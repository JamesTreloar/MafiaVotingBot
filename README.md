# Discord Mafia Voting Bot

A bot to assist voting when running mafia games on discord.

Based on discordjs with nodejs.

Note nodejs must be of at least verstion 16.6.0

## Commands

| command | argument |  description| caveat |
| --- | --- | --- | --- | 
| get_players| | Will retrieve all players that can be voted for | Players need to have messaged since the bot has been activated to be recorded |
| vote | @player| Votes for the player specified in the option | |

## How to use
1. Ensure nodejs is at least of version ``16.6.0``
2. Initilise the bot with ``npm i``
3. Set up the correct values in config.json AND gameconfig.json
4. Run ``node deploy_commmands.js``
5. Run ``node index.js``