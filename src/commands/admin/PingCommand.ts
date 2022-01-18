import { Client, Message } from "discord.js";

export default class PingCommand {
    name: string;
    description: string;
    guild_only?: boolean;
    cooldown?: number;

    constructor() {
        this.name = "ping";
        this.description = "Comando para testar a comunicação do seu Bot.";
        this.guild_only = true;
        this.cooldown = 5;
    };

    async execute(client: Client<true>, message: Message<true>, args: string[]) {
        await message.channel.send({
            content: `🏓 **|** ${message.author.toString()}, Pong!`
        });
    };
};