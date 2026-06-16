import dotenv from 'dotenv';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import commands, { getCommandJSONs } from './commands';

dotenv.config();

const discordToken = process.env.DISCORD_TOKEN;
const guildId = process.env.GUILD_ID;

if (!discordToken) {
  console.error('❌ Falta DISCORD_TOKEN en el .env');
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// ─── UN SOLO handler de ClientReady ───────────────────────
client.once(Events.ClientReady, async (readyClient) => {
  console.log(`✅ Bot conectado como ${readyClient.user.username}`);

  try {
    const commandJSONs = getCommandJSONs();

    if (guildId) {
      // GUILD commands → instantáneos, para desarrollo
      const guild = readyClient.guilds.cache.get(guildId);
      if (!guild) {
        console.error(`❌ No encontré la guild con ID ${guildId}`);
        return;
      }
      await guild.commands.set(commandJSONs);
      console.log(`📦 Comandos registrados en la guild "${guild.name}"`);
    } else {
      // GLOBAL commands → hasta 1 hora en propagarse
      await readyClient.application?.commands.set(commandJSONs);
      console.log('🌍 Comandos registrados globalmente');
    }
  } catch (error) {
    console.error('Error registrando comandos:', error);
  }
});

// ─── ENRUTADOR de interacciones ──────────────────────────
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) {
    console.error(`Comando no encontrado: ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error ejecutando /${interaction.commandName}:`, error);

    const replyContent = 'Hubo un error al ejecutar el comando.';
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: replyContent, ephemeral: true });
    } else {
      await interaction.reply({ content: replyContent, ephemeral: true });
    }
  }
});

// ─── Conexión ─────────────────────────────────────────────
client.login(discordToken).catch((error) => {
  console.error('❌ Error al iniciar sesión:', error);
  process.exit(1);
});
