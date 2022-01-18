import { Client, Message, PermissionString } from "discord.js";

export type Command = {
    name: string;
    aliases?: string[];
    description: string;
    guild_only?: boolean;
    member_perm?: PermissionString[];
    client_perm?: PermissionString[];
    is_developer?: boolean;
    cooldown?: number;
    execute: (client: Client<true>, message: Message<true>, args: string[]) => any | Promise<any>; 
};