import { Client, Message, Collection } from "discord.js";

import config from "../config.json";
import PermissionsList from "../config/PermissionsList";
import { CommandExecute as CommandEmbed } from "../embeds";

export default class CommandExecute {
    type: string;

    constructor() {
        this.type = "messageCreate";
    };

    async execute(client: Client<true>, message: Message<true>) {
        const commandEmbed = new CommandEmbed(client);

        if (message.author.bot) return;
        if (!message.content.startsWith(config.client.prefix)) return;

        const args = message.content.slice(config.client.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;

        if (command.guild_only && message.channel.type !== "GUILD_TEXT") {
            return message.channel.send({
                content: message.author.toString(),
                embeds: [commandEmbed.guildOnly()]
            }).then(msg => setTimeout(() => msg.delete(), 5000))
                .catch(() => null);
        };

        if (command.member_perm && !message.member.permissions.has(command.member_perm)) {
            const permissions_map = command.member_perm.map(perm => PermissionsList[perm]).join("`, `");

            return message.channel.send({
                content: message.author.toString(),
                embeds: [commandEmbed.memberHasPerm(permissions_map)]
            }).then(msg => setTimeout(() => msg.delete(), 5000))
                .catch(() => null);
        };

        if (command.client_perm && !message.guild.me.permissions.has(command.client_perm)) {
            const permissions_map = command.client_perm.map(perm => PermissionsList[perm]).join("`, `");

            return message.channel.send({
                content: message.author.toString(),
                embeds: [commandEmbed.clientHasPerm(permissions_map)]
            }).then(msg => setTimeout(() => msg.delete(), 5000))
                .catch(() => null);
        };

        if (command.is_developer && !config.client.developers.includes(message.author.id)) {
            return message.channel.send({
                content: message.author.toString(),
                embeds: [commandEmbed.isNotDeveloper()]
            }).then(msg => setTimeout(() => msg.delete(), 5000))
                .catch(() => null);
        };

        if (!client.cooldowns.has(command.name)) {
            client.cooldowns.set(command.name, new Collection());
        };

        const now = Date.now();
        const timestamps = client.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                message.delete().catch(() => null);

                return message.channel.send({
                    content: `**Menções:** ${message.author}`,
                    embeds: [commandEmbed.cooldownDeny(command, timeLeft)]
                }).then(msg => setTimeout(() => msg.delete(), 5000))
                    .catch(() => null);
            };
        };

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
            await command.execute(client, message, args);
        } catch (error) {
            message.delete().catch(() => null);

            return message.channel.send({
                content: message.author.toString(),
                embeds: [commandEmbed.errorCommand(error)]
            }).then(msg => setTimeout(() => msg.delete(), 5000))
                .catch(() => null);
        };
    };
};