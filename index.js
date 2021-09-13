/**
 * Simple automessage bot with status change
 *
 * Requirements: node 16+
 *
 *
 * Using discord.js library
 * Author: Isigar <info@rcore.cz>
 */

const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

/**
 * Room where your bot will send messages
 * @type {string}
 */
const ROOM = 'YOUR_ROOM_ID';

const MINUTE = 1000 * 60
const HOUR = 60 * MINUTE

/**
 * Interval between bot will change status to random one
 * @type {number}
 */
const CHANGE_STATUS_INTERVAL = 1 * MINUTE;
/**
 * Interval to send messages into your specific room
 * @type {number}
 */
const SEND_MESSAGE_INTERVAL = 3 * HOUR;
/**
 * Bot can send message after count of messages from users
 * how many message need to be send to force bot to send message
 * @type {number}
 */
const SEND_MESSAGE_AFTER_MESSAGES = 120;

const messages = [
    "🤨 Seeking new message to send!",
    "Or not?",
];

const chatMessages = [
    "Some messages here",
    "Some other cool message",
    "I am simple automessage bot",
];

function changeStatus() {
    client.user.setActivity(messages[Math.floor(Math.random() * messages.length)], {type: 'WATCHING'});
}

function sendMessage() {
    client.channels.fetch(ROOM).then((channel) => {
        channel.send(chatMessages[Math.floor(Math.random() * chatMessages.length)])
    });
}

setInterval(() => {
    if (client.isReady()) {
        changeStatus()
    }
}, CHANGE_STATUS_INTERVAL)

setInterval(() => {
    if (client.isReady()) {
        sendMessage();
    }
}, SEND_MESSAGE_INTERVAL)

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.user.setActivity(messages[Math.floor(Math.random() * messages.length)], {type: 'WATCHING'});
});

let messageCounter = 0;

client.on('messageCreate', async message => {
    if(message.channelId !== ROOM) return;

    messageCounter ++;

    if(messageCounter > SEND_MESSAGE_AFTER_MESSAGES){
        sendMessage();
        messageCounter = 0;
    }
});

client.login('YOUR_BOT_TOKEN');
