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

export interface MessageGif {
  message: string;
  person: Person412;
  points: number;
}
//Array de mensajes, pasar a bd
const mesageGif: MessageGif[] = [
  {
    message: 'Bueno #… momento de cooling break',
    person: Person412.Davo,
    points: 3,
  },
  {
    message: '#, estamos muy arriba, necesitamos cooling break',
    person: Person412.LaCobra,
    points: 3,
  },
  {
    message: 'Paren un poco que # me está mareando',
    person: Person412.Agusneta,
    points: 3,
  },
  {
    message: 'Cooling break porque # se fue todo de tema',
    person: Person412.Davo,
    points: 4,
  },
  {
    message: '# nos vemos después del cooling break',
    person: Person412.Teo,
    points: 2,
  },
  {
    message: '# descansen, hidrátense y ya volvemos',
    person: Person412.LaCobra,
    points: 3,
  },
  {
    message: 'Necesitamos enfriar la situación con #',
    person: Person412.Benito,
    points: 3,
  },
  {
    message: '# no te muevas que volvemos enseguida',
    person: Person412.Davo,
    points: 2,
  },
  {
    message: 'Momento de bajar revoluciones #',
    person: Person412.Agusneta,
    points: 2,
  },
  {
    message: '# hay que recuperar aire muchachos',
    person: Person412.Teo,
    points: 3,
  },
  {
    message: 'Esto pide cooling break urgente por #',
    person: Person412.LaCobra,
    points: 4,
  },
  {
    message: 'Ya está #, entramos oficialmente en cooling break',
    person: Person412.Davo,
    points: 4,
  },
  {
    message: '# cinco minutos para recomponernos',
    person: Person412.Benito,
    points: 2,
  },
  {
    message: '# nos fuimos totalmente del programa',
    person: Person412.LaCobra,
    points: 3,
  },
  {
    message: 'Se terminó el debate #, cooling break',
    person: Person412.Teo,
    points: 4,
  },
  {
    message: '# me niego a seguir sin cooling break',
    person: Person412.Agusneta,
    points: 5,
  },
  {
    message: 'Esto necesita una pausa institucional por #',
    person: Person412.Davo,
    points: 5,
  },
  {
    message: '# hay demasiado quilombo, break',
    person: Person412.LaCobra,
    points: 4,
  },
  {
    message: '# volvemos cuando recuperemos la compostura',
    person: Person412.Benito,
    points: 5,
  },
  {
    message: 'Cooling break reglamentario para #',
    person: Person412.Teo,
    points: 4,
  },
  {
    message: '# nos pasamos de contenido otra vez',
    person: Person412.Davo,
    points: 4,
  },
  {
    message: 'Tiempo muerto para #',
    person: Person412.Agusneta,
    points: 2,
  },
  {
    message: '# momento de tomar agua y pensar',
    person: Person412.LaCobra,
    points: 3,
  },
  {
    message: '# nos vemos después de la cortina',
    person: Person412.Teo,
    points: 2,
  },
  {
    message: '# estamos completamente sobreestimulados',
    person: Person412.Benito,
    points: 5,
  },
];
//Array de gifts, pasasr a bd
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

  const mesage = GetMessage(usuario.username, gift);
  await interaction.reply({
    content: mesage + ' son *' + gift.points + ' los puntos de trolaso',
    embeds: [embed],
    allowedMentions: {
      users: [usuario.id],
      repliedUser: true,
    },
  });
}

export const GetMessage = (username: string, gif: ColingGifs): string => {
  const mesage: MessageGif[] = mesageGif.filter(
    (mesageGif) =>
      mesageGif.points == gif.points && mesageGif.person !== gif.person,
  );
  const defaultMessage: string = 'así toma agua # chicos??';

  const pickrandom: MessageGif | string =
    mesage[Math.floor(Math.random() * mesage.length)] ?? defaultMessage;
  return pickrandom.message.replace('#', '@' + username);
};
