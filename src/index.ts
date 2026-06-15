import dotenv from 'dotenv';
import { Client, Events, GatewayIntentBits, Message } from 'discord.js';
dotenv.config();

const discordToken = process.env.DISCORD_TOKEN;
const names = ['javito', 'cirujaa', 'moro', 'gorditaaaa'];
const client = new Client({
  intents: Object.keys(GatewayIntentBits) as Array<
    keyof typeof GatewayIntentBits
  >,
});
client.once(Events.ClientReady, async () => {
  console.log('Solicitud del user ' + client.user?.username);
});

client.on(Events.MessageCreate, async (message: Message) => {
  if (message.content == 'hola laucha') {
    message.reply(`como anda ${message.author}, aguante el piti!!`);
  }
  if (message.content == '!tecojo') {
    let randomItem: string = names[Math.floor(Math.random() * names.length)];
    message.reply(`le estoy rompiendo el queso al ${randomItem}`);
  }
  if (message.content == 'me escuchan?') {
    message.reply(`ola si amigoooo${message.author}`);
  }
});

client.login(discordToken);
