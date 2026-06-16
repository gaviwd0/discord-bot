import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('lemide')
  .setDescription('Responde que talla es el burro')
  .addUserOption((option) =>
    option
      .setName('usuario')
      .setDescription('El usuario al que se le va a medir')
      .setRequired(true),
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const usuario = interaction.options.getUser('usuario', true);

  let cm = Math.round(Math.random() * 7);
  if (cm > 2) {
    cm = cm * 3;
  }

  let mensaje: string;
  if (cm <= 5) {
    mensaje = `Traigan sus microscopios, a ${usuario} le está midiendo ${cm}cm`;
  } else {
    mensaje = `ayyy mi madreee, a ${usuario} le está midiendo ${cm}cm, ostia puta`;
  }

  await interaction.reply(mensaje);
}
