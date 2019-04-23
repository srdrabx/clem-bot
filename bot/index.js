import Eris from 'eris'
import express from 'express'
import request from 'request'

import getHandler from './brain'

const { PORT, DISCORD_API_TOKEN, PROJECT_DOMAIN } = process.env

// Bot
const bot = new Eris(DISCORD_API_TOKEN)
const handleIncomingMessage = getHandler(bot)
const getReadyMessage = bot =>
  `[Eris]-Logged in as ${bot.user.username}#${bot.user.discriminator}`

bot.on('ready', () => console.info(getReadyMessage(bot)))
bot.on('messageCreate', handleIncomingMessage)
bot.connect()

// Web server
const webServer = express()
const keepalive = () => 
  PROJECT_DOMAIN &&
  request(
    { url: `https://${PROJECT_DOMAIN}.glitch.me/glitch-alive` },
    () => setTimeout(keepalive, 55000),
  )

webServer.use('/', express.static('public'))

if (PROJECT_DOMAIN)
  webServer.get('/glitch-alive', (req, res) => res.send(`I'm alive`))

webServer.listen(
  PORT,
  () => console.log(`[Express]-Listening on port ${PORT}!`) || keepalive(),
)
