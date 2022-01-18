import fs from "fs";
import path from "path";
import colors from "colors";
import Discord from "discord.js";

import { ApplicationConfig } from "./config/ApplicationConfig";
import { Command } from "./@types/TypeCommands";

export default class ClientApplication {
    client: Discord.Client<true>;

    constructor() {
        this.client = new Discord.Client(ApplicationConfig);
        this.client.commands = new Discord.Collection();
        this.client.cooldowns = new Discord.Collection();

        this.events();
        this.commands();
        this.client.login();
    };

    private events() {
        fs.readdirSync(path.resolve(__dirname, "events")).forEach(async file => {
            const EventFile = await import(path.resolve(__dirname, "events", file));
            const event = new EventFile.default();

            this.client.on(event.type, event.execute.bind(null, this.client));
            console.log(colors.yellow("[EVENT]") + " Evento " + colors.gray(event.type) + " foi Carregado com Sucesso;");
        });
    };

    private commands() {
        fs.readdirSync(path.resolve(__dirname, "commands")).forEach(dirs => {
            const commandFiles = fs.readdirSync(path.resolve(__dirname, "commands", dirs));

            commandFiles.forEach(async file => {
                const CommandFile = await import(path.resolve(__dirname, "commands", dirs, file));
                const command: Command = new CommandFile.default();

                this.client.commands.set(command.name, command);
                console.log(colors.yellow("[COMMAND]") + " Comando " + colors.gray(command.name) + " foi Carregado com Sucesso;");
            });
        });
    };
};