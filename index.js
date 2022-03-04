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

//client.on('connected', () => {
 //   client.say(channel, `${username} nojo zmrde už jsem tady!`);
//});

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
        client.say(channel, `!zalud, !hodnoceni, !madmong, !velkyagrLULE, !gn, !mlady, !vtip, !cas :)`);
    }
    
    //if((message.startsWith('!zalud') && message.includes('Tvrzení, že')==false)) {
    //    const num = rollDice();
    //    var vec = message.substr(6);
    //    client.say(channel, `Tvrzení, že ${vec}, je na ${num}% správné zaludE`);
        
    //  } 
      if (message ==  '!hodnoceni') {
        const num = hraxd();
        client.say(channel, `Tato hra je ${num}/10 zalud5Head`);
        
      } 
      if (message ==  '!madmong') {
        client.say(channel, `zaludE Čau frajeři, tady Žalud 🌰, dneska jsem v lese 🌳🌳, a jsem teda zase zpátky, tentokrát s Madmongama FeelsAmazingMan 💊 madmonq.gg/agraelus`);
        
      }  
      if (message.includes(" !gn")) {
        var jmeno = message.split(" ")[0];
        client.say(channel, `zaludBedge ${jmeno} Dobrou noc 🌃`);
        
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
    client.on("subscription", function (channel, username, methods ) {

        client.say(channel, username + "kristova noho, dík za sub" )

    });
    //client.on("resub", function (channel, username, months, message, userstate, methods) {

     //   client.say(channel, username + " kristova noho, dík za resub <3 " )

    //});
    
    if(message == '!vtip') {
        var things =['Servis hudebních nástrojů, dpovědný vedoucí: Ing. Prokop Buben', 'Víte jak se jmenuje had, který vypráví vtipy? Hahad', 'Víš, jak se kouzelník utírá na záchodě? Normálně – trikem.', 'Pepíček dostal k narozeninám granát a je z toho celý pryč.', 'Víš, proč nechodí jogurt na procházku? Protože se bojí, že byl byl prošlý.', 'Jak se nazývá koronavirusová liška? Liška Byst-rouška', 'Víte, proč voda nežije? Protože skapala!', 'Víte, jaký je rozdíl mezi tavičem a babičkou? Tavič taví železo, zatímco babička, ta ví všechno.', 'Příjde kůn do banky a říká: „Dobrý den, chtěl bych si založit koňto.“', 
                   'Ta ironie, když se z veganství stane masová záležitost.', '„Proč je ti tak nevolno?“ „Bo loňské špagety.“', 'Vletí moucha do hospody a táže se: „Promiňte, je tahle stolice volná?“', 'Dva zloději ukradli kalendář. Každý dostal šest měsíců.', '„Pane průvodčí, jede ten vlak na Písek?“ „Ne, na naftu!“', 'Přijde Hertz do baru a říká: „Jedno pivo, ať to kmitá!“', '„Jaký je váš nejoblíbenější typ fotoaparátu, pane Slepičko?“ „Ko-ko-Kodak!“', 'Víte, jak se smějou dřevorubci? Řežou se smíchy.', '„Máš dneska čas?“ „Ne, jdu si koupit brýle.“ „A potom?“ „Potom uvidím.“', '„Chcete slyšet vtip o České poště?“ „Jojo, klidně.“ „Tak dobře, ale nevím, jestli vám to dojde...“'];
        var thing = things[Math.floor(Math.random()*things.length)];
        client.say(channel, `${thing}`);
        
    }
    if(message == '!cas') {
        let clock = () => {
          let date = new Date();
          let hrs = date.getHours();
          let mins = date.getMinutes();
          let secs = date.getSeconds();
          let time = `${hrs}:${mins}`
          // log the time in console
          console.log(time)
        }
        client.say(channel, `Kristova noho🦶, ono už je ${clock()}`);
        
    }
    
});
