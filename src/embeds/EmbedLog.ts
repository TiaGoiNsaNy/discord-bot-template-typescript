import { Client, MessageEmbed } from "discord.js";

export default class EmbedLog {
    client: Client<true>;

    constructor(client: Client<true>) {
        this.client = client;
    };

    readyEmbed() {
        const date = new Date();
        const day = date.getDay() < 10 ? "0" + date.getDay() : date.getDay();
        const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
        const year = date.getFullYear();

        return new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`\`[${day}-${month}-${year}]\` **|** Deploy de Aplicação Enviado com Sucesso.`)
            .setFooter("• Notifications - Github Actions", this.client.user.displayAvatarURL());
    };
};