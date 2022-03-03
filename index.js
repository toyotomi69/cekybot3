const tmi = require('tmi.js'),
    { channel, username, password } = require('./settings.json');

const options = {
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity : {
        username,
        password
    },
    channels: [channel]
};
//node index.js
const client = new tmi.Client(options);
client.connect().catch(console.error);

client.on('connected', () => {
    client.say(channel, `${username} nojo zmrde už jsem tady!`);
});

client.on('message', (channel, user, message, self) => {
    if(self) return;
    if(message.includes(" žalud ")) {
        client.say(channel, `@${user.username} zaludWeird`);
    }
    if(message.includes("žalud")) {
        client.say(channel, `@${user.username} zaludWeird`);
    }

    if(message == '@cekybot ahoj') {
        client.say(channel, `@${user.username}, čau! zaludKamo`);
    }
    if(message == '@cekybot čau') {
        client.say(channel, `@${user.username}, čau! zaludKamo`);
    }
    if(message == '@cekybot čus') {
        client.say(channel, `@${user.username}, čau! zaludKamo`);
    }
    if(message == '@cekybot zdar') {
        client.say(channel, `@${user.username}, čau! zaludKamo`);
    }
    if(message == '@cekybot nazdar') {
        client.say(channel, `@${user.username}, čau! zaludKamo`);
    }
    if(message == '@cekybot zabij se') {
        client.say(channel, `PoroSad`);
    }

    if(message == 'zaludE') {
        client.say(channel, `@${user.username} zaludE`);
    }
    if(message == '!zaludcommands') {
        client.say(channel, `!zalud, !hodnoceni, !madmong, !velkyagrLULE, !gn, !mlady :)`);
    }
    if (message.startsWith('!zalud')) {
        const num = rollDice();
        client.say(channel, `@${user.username} tvoje tvrzení je na  ${num}% správné zaludE`);
        
      } 
      if (message ==  '!hodnoceni') {
        const num = hraxd();
        client.say(channel, `Tato hra je ${num}/10 zalud5Head`);
        
      } 
      if (message ==  '!madmong') {
        client.say(channel, `zaludE Čau frajeři, tady Žalud 🌰, dneska jsem v lese 🌳🌳, a jsem teda zase zpátky, tentokrát s Madmongama FeelsAmazingMan 💊 madmonq.gg/agraelus`);
        
      }  
      if (message.includes(" !gn")) {
        var jmeno = message.split(" ")[0];
        client.say(channel, `${jmeno} zaludBedge Dobrou noc 🌃`);
        
      } 
    function rollDice () {
        const sides = 100;
        return Math.floor(Math.random() * sides) + 1;
      }
      function hraxd () {
        const sides = 10;
        return Math.floor(Math.random() * sides) + 1;
      }
    if(message == '!velkyagrLULE') {
    
       client.say(channel, `agr1 agr2`);
        setTimeout(() => {client.say(channel, `agr3 agr4`)}, 2500);
    }
    if(message == `agr1 agr2`) {

    client.say(channel, `agr3 agr4`);
    }
    if (message.includes(" !mlady")) {
        var jmeno = message.split(" ")[0];
        client.say(channel, `MLADY 🌹 ${jmeno}`);
     }
});