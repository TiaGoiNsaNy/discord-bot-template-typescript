import { yellow, gray } from "colors";
import { Client, TextChannel } from "discord.js";

import { EmbedLog } from "../embeds";
import config from "../config.json";

export default class ReadyApplication {
    type: string;

    constructor() {
        this.type = "ready";
    };

    async execute(client: Client<true>) {
        const channel_log = client.channels.cache.get(config.client.channel_log);

        client.user.setActivity({
            name: "😎 • Template Bot - By: iNsaNy Developers",
            type: "LISTENING"
        });

        if (process.env.NODE_ENV === "production" && channel_log) {
            const embedLog = new EmbedLog(client);

            await (channel_log as TextChannel).send({
                embeds: [embedLog.readyEmbed()]
            });
        };

        console.log(yellow("[CLIENT]") + " Aplicação " + gray(client.user.tag) + "Iniciada com Sucesso;");
    };
};