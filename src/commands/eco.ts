import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('eco')
  .setDescription('Repite lo que digas')
  .addStringOption((option) =>
    option
      .setName('texto')
      .setDescription('El texto a repetir')
      .setRequired(true),
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const texto = interaction.options.getString('texto', true);

  await interaction.reply(`📢 ${texto}`);
}
