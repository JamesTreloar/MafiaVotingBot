const { SlashCommandBuilder } = require("@discordjs/builders");
const { aliveID } = require("../config.json")
const gameFuncs = require("../game_functions.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("get_players")
        .setDescription("Get all alive players"),
    async execute(interaction) {
        let a = interaction.guild.roles.cache.get(aliveID).members.map(m => m.user.id);
        let b = [];
        for (let i = 0; i < a.length; i++) {
            b.push(interaction.guild.members.cache.get(a[i]).nickname);
        }
        gameFuncs.saveMembers(a, b);
        interaction.reply("Players retrieved");
    }
}