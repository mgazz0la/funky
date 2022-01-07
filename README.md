# Funky

Funky is a Typescript Discord bot built on discord.js. It is a personal attempt to clone [Groovy](https://groovy.bot/), a popular music streaming bot.

## Commands

Commands listed in this table are *planned* to be implemented. If a command isn't listed here, then
I have no plans to implement it currently.

| Command     | Implemented? |
| ----------- | ------------ |
| /play       | Yes          |
| /queue      | No           |
| /skip       | No           |
| /back       | No           |
| /song       | No           |
| /clear      | No           |
| /pause      | Yes          |
| /unpause    | Yes          |
| /remove     | No           |
| /disconnect | No           |

## Installation

#### Dependencies

* [Node.js](https://nodejs.org/) v16.6+
* [FFmpeg](https://www.ffmpeg.org/) (ensure this is added to your PATH)

#### Running

1. `git clone https://github.com/mgazz0la/funky.git`
2. `cd funky`
3. `npm install`
4. Create `config.json` from `config.json.example` and fill in all fields
5. If you want to register slash commands for your server you'll need to run `npm run deploy-cmds`
6. `npm run serve` to run the bot
