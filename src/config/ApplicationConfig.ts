import { IntentsString, PartialTypes } from "discord.js";

const intents: IntentsString[] = [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_BANS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_INTEGRATIONS",
    "GUILD_WEBHOOKS",
    "GUILD_INVITES",
    "GUILD_VOICE_STATES",
    "GUILD_PRESENCES",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "DIRECT_MESSAGES",
    "DIRECT_MESSAGE_REACTIONS",
    "DIRECT_MESSAGE_TYPING"
];

const partials: PartialTypes[] = [
    "USER",
    "GUILD_MEMBER",
    "MESSAGE",
    "CHANNEL",
    "REACTION"
];

export const ApplicationConfig = {
    intents,
    partials
};