import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from 'discord.js';

export enum Person412 {
  Teo = 'Teo',
  Agusneta = 'Agusneta',
  LaCobra = 'La Cobra',
  Davo = 'Davo',
  Benito = 'Benito',
}
export interface ColingGifs {
  person: Person412;
  url: string;
  points: number; //del 1 al 10
}

export interface Message {
  message: string;
  person: Person412;
  points: number;
}

const messages: Message;
const gifts: Array<ColingGifs> = [
  {
    person: Person412.Agusneta,
    url: 'https://media.tenor.com/yFU1qiRYesMAAAAM/la-agusneta-412.gif',
    points: 4,
  },
  {
    person: Person412.Agusneta,
    url: 'https://media.tenor.com/gJnikdEEkzcAAAA1/como-toma.webp',
    points: 1,
  },
  {
    person: Person412.Agusneta,
    url: 'https://media.tenor.com/jyL9eFfgs84AAAA1/la-agusneta-cooling-break.webp',
    points: 4,
  },
  {
    person: Person412.Agusneta,
    url: 'https://media.tenor.com/o-SgnZRA1AoAAAA1/la-agusneta-cooling-break.webp',
    points: 5,
  },
  {
    person: Person412.Agusneta,
    url: 'https://media.tenor.com/o-SgnZRA1AoAAAA1/la-agusneta-cooling-break.webp',
    points: 5,
  },
];

export const data = new SlashCommandBuilder()
  .setName('coolingbreak')
  .setDescription('Manda un GIF de alguien tomando agua')
  .addUserOption((option) =>
    option
      .setName('usuario')
      .setDescription('El que se toma un break')
      .setRequired(true),
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const usuario = interaction.options.getUser('usuario', true);
  const gift = gifts[Math.floor(Math.random() * gifts.length)];

  const embed = new EmbedBuilder().setImage(gift.url);
  // elejir el mensaje dependiendo de los puntos

  await interaction.reply({
    content: `${usuario} `,
    embeds: [embed],
  });
}

//export messageForPoint(username: string  , gift:ColingGifs): string => {
//
// return message
//}
