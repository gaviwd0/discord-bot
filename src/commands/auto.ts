import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('auto')
  .setDescription('Responde con un color del auto');

export async function execute(interaction: ChatInputCommandInteraction) {
  let num = Math.random() * 2;
  let colorAuto: string;
  if (num > 1) {
    colorAuto = 'rojo';
  } else {
    colorAuto = 'azul ';
  }
  await interaction.reply(colorAuto);
}
