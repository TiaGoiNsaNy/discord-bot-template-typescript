import { Collection } from "discord.js";

import { Command } from "../TypeCommands";

declare module "discord.js" {
    export interface Client {
        commands: Collection<string, Command>;
        cooldowns: Collection<string, Collection<string, number>>;
    };
};