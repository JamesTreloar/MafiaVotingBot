const { SlashCommandBuilder } = require("@discordjs/builders");
const gameFuncs = require("../game_functions.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("vote")
        .setDescription("Vote for a player")
		.addUserOption(option => option.setName("target").setDescription("Vote")),
    async execute(interaction) {
        const voteeid = interaction.options.getUser("target").id;
        const voterid = interaction.user.id;
        let display = "";
        display = gameFuncs.recordVote(voteeid, voterid); 
        interaction.reply(display);
    }

}