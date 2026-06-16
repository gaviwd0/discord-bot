import {
  Collection,
  ChatInputCommandInteraction,
  RESTPostAPIApplicationCommandsJSONBody,
} from 'discord.js';
import * as ping from './ping';
import * as lemide from './lemide';
import * as coolingbreak from './coolingbreak';

/** Mínimo común que necesitamos del data de un comando */
export interface CommandData {
  name: string;
  toJSON(): RESTPostAPIApplicationCommandsJSONBody;
}

export interface Command {
  data: CommandData;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

const commands = new Collection<string, Command>();

commands.set(ping.data.name, {
  data: ping.data,
  execute: ping.execute,
});

commands.set(lemide.data.name, {
  data: lemide.data,
  execute: lemide.execute,
});

commands.set(coolingbreak.data.name, {
  data: coolingbreak.data,
  execute: coolingbreak.execute,
});

export default commands;

/** Devuelve los JSON bodies para registrar los comandos en Discord */
export function getCommandJSONs(): RESTPostAPIApplicationCommandsJSONBody[] {
  return Array.from(commands.values()).map((cmd) => cmd.data.toJSON());
}
