import { Client, MessageEmbed } from "discord.js";

import { Command } from "../@types/TypeCommands";

export default class CommandEvent {
    client: Client<true>;

    constructor(client: Client<true>) {
        this.client = client;
    };

    guildOnly() {
        return new MessageEmbed()
            .setColor("RED")
            .setAuthor(`• Comando apenas dentro de Servidores!`, this.client.user.displayAvatarURL())
            .setDescription("😟 **|** Infelizmente você não pode executar esse comando dentro do meu privado, a execução desse comando está liberada apenas dentro de servidores!")
    };

    memberHasPerm(permissions: string) {
        return new MessageEmbed()
            .setColor("RED")
            .setAuthor(`• Você não tem Permissão!`, this.client.user.displayAvatarURL())
            .setDescription(`❌ **|** Você não tem permissão para executar esse comando! Pois você precisa ter as permissões necessárias abaixo:` +
                `\n:shield: Permissões: \`${permissions}\``);
    };

    clientHasPerm(permissions: string) {
        return new MessageEmbed()
            .setColor("RED")
            .setAuthor(`• Estou sem Permissão!`, this.client.user.displayAvatarURL())
            .setDescription(`❌ **|** Infelizmente eu não posso executar esse comando! Pois não tenho as devidas permissões necessárias para executar o comando essa função!` +
                `\n:shield: Permissões: \`${permissions}\``);
    };

    isNotDeveloper() {
        return new MessageEmbed()
            .setColor("RED")
            .setAuthor(`• Apenas para Desenvolvedores!`, this.client.user.displayAvatarURL())
            .setDescription("🛠 **|** Você não pode executar esse comando, pois apenas os meus desenvolvedores podem utilizados para desenvolvimento de novos sistemas.");
    };

    cooldownDeny(command: Command, time: number) {
        return new MessageEmbed()
            .setColor("YELLOW")
            .setAuthor(`• Ops! Calme ai Amigo.`, this.client.user.displayAvatarURL())
            .setDescription(`⏱ **|** Você precisa esperar **${time.toFixed(1)} Segundo(s)** para executar o comando \`${command.name}\` novamente!`);
    };

    errorCommand(error: any) {
        return new MessageEmbed()
            .setColor("RED")
            .setDescription(`⚙ **|** Ocorreu um erro ao executar esse comando! Reporte para o meu desenvolvedor rapidamente!` +
                `\n\n**📡 • Erro Recebido:**\`\`\`prolog\n${error}\`\`\``);
    };
};