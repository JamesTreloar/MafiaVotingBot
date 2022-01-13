const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json"); //Bot token and command prefix
let gameConfig = require("./gameconfg.json");

const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.on("ready", () => {
    console.log("Running");
});

client.login(config.token);

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) { return; }

    const command = client.commands.get(interaction.commandName);
    
    
    if (!command) { return; }
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });

    }
});