let Discord;
let Database;
if (typeof window !== "undefined") {
    Discord = DiscordJS;
    Database = EasyDatabase;
} else {
    Discord = require("discord.js");
    Database = require("easy-json-database");
}
const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
const s4d = {
    Discord,
    client: null,
    tokenInvalid: false,
    reply: null,
    joiningMember: null,
    database: new Database("./db.json"),
    checkMessageExists() {
        if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
        if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
    }
};
s4d.client = new s4d.Discord.Client({
    fetchAllMembers: true
});
s4d.client.on('raw', async (packet) => {
    if (['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) {
        const guild = s4d.client.guilds.cache.get(packet.d.guild_id);
        if (!guild) return;
        const member = guild.members.cache.get(packet.d.user_id) || guild.members.fetch(d.user_id).catch(() => {});
        if (!member) return;
        const channel = s4d.client.channels.cache.get(packet.d.channel_id);
        if (!channel) return;
        const message = channel.messages.cache.get(packet.d.message_id) || await channel.messages.fetch(packet.d.message_id).catch(() => {});
        if (!message) return;
        s4d.client.emit(packet.t, guild, channel, message, member, packet.d.emoji.name);
    }
});
var Jokes, RandomJokes;

function listsGetRandomItem(list, remove) {
    var x = Math.floor(Math.random() * list.length);
    if (remove) {
        return list.splice(x, 1)[0];
    } else {
        return list[x];
    }
}


s4d.client.login('ODU1OTU1NjcyNzI1MzIzNzg1.YM6A1w.nex1mqyyejkQUpAL68QZg7XE1I4').catch((e) => {
    s4d.tokenInvalid = true;
    s4d.tokenError = e;
});

s4d.client.on('ready', async () => {
    s4d.client.user.setActivity(String('lol'));

});

s4d.client.on('message', async (s4dmessage) => {
    if ((s4dmessage.content) == ';help') {
        (s4dmessage.member).send({
            embed: {
                title: 'Help',
                color: null,
                image: {
                    url: null
                },
								fields: [
                      {
                        name: 'Links',
                        value: "Are you looking for ban appeals, User & Bug Reports, Partner Applications, our Twitter, Roblox group or any sort of link? Head over to #info and take a look at 'Links'.",
                      },
                      {
                        name: 'Moderation Action',
                        value: 'If you have been banned and you believe that the ban was unfair or false, please fill out the Ban Appeal. Please keep in mind that there is no guarantee that your ban will be lifted.',
                        inline: false,
                      },
                      {
                        name: 'Connections',
                        value: 'Have you switched Roblox Accounts, changed your username, or bought the VIP gamepass in KOville? Type !verify in #bot-commands.',
                      },
                      {
                        name: 'Ideas, Suggestions, and Creations',
                        value: 'Do you have a game idea, a suggestion for one of our games, or want to share one of your creations like a community sticker? Post them in #cool-creations!',
                      },
                      {
                        name: 'FAQ',
                        value: 'Some value here',
                      },
                      {
                        name: 'FAQ',
                        value: 'Have a common or simple question that you want to be answered? Type ;faq in #bot-commands.',
                      },
                    ],
                description: null,
                footer: {
                    text: 'Awesome Studios'
                },
                thumbnail: {
                    url: null
                }

            }
        });
    } else if ((s4dmessage.content) == '!jokes') {
        Jokes = ['Why do we ask actors to "break a leg"?', 'Hear new restaurant named Karma?', 'Did you hear about the claustrophobic astronaut?', "Why does scientist don't trust atoms?", 'A man tells his doctor, “Doc, help me. I’m addicted to Twitter!” What did the doc say?', 'What’s the different between a cat and a comma?', 'What did the left eye say to the right eye?', 'What do you call a fake noodle?', 'What did the shark say when he ate the clownfish?'];
        RandomJokes = listsGetRandomItem(Jokes, false);
        (s4dmessage.channel).send(RandomJokes);
        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
            time: (5 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
            if (RandomJokes == 'Why do we ask actors to "break a leg"?') {
                s4dmessage.channel.send(String('Because every play has a cast'));
            } else if (RandomJokes == 'Hear new restaurant named Karma?') {
                s4dmessage.channel.send(String('Theres no menu,you get what you deserve'));
            } else if (RandomJokes == 'Did you hear about the claustrophobic astronaut?') {
                s4dmessage.channel.send(String('He just needed a little space'));
            } else if (RandomJokes == "Why does scientist don't trust atoms?") {
                s4dmessage.channel.send(String('Because atoms make everything up! 🤣'));
            } else if (RandomJokes == 'A man tells his doctor, “Doc, help me. I’m addicted to Twitter!” What did the doc say?') {
                s4dmessage.channel.send(String("Sorry,I don't follow you"));
            } else if (RandomJokes == 'What’s the different between a cat and a comma?') {
                s4dmessage.channel.send(String('A cat has claws at the end of paws; A comma is a pause at the end of a clause.'));
            } else if (RandomJokes == 'What did the left eye say to the right eye?') {
                s4dmessage.channel.send(String('Between you and me, something smells.'));
            } else if (RandomJokes == 'What do you call a fake noodle?') {
                s4dmessage.channel.send(String('An Impasta!'));
            } else if (RandomJokes == 'What did the shark say when he ate the clownfish?') {
                s4dmessage.channel.send(String('This tastes funny!'));
            }

            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
            s4dmessage.channel.send(String('Hey,try again! You didnt reply me :( '));
        });
    }

});

s4d;
