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
 //   client.say(channel, `${username} nojo zmrde už jsem tady.`);
//});

client.on('message', (channel, user, message, self) => {
    if(self) return;
    if(message.includes(" žalud ")) {
        client.say(channel, `@${user.username} zaludWeird`);
    }
    if(message.includes("žalud")) {
        client.say(channel, `@${user.username} zaludWeird`);
    }

    if(message.includes('@cekybot ahoj'||'@cekybot čus'||'@cekybot čau'||'@cekybot zdar'||'@cekybot nazdar'||'@cekybot ahojda'||'@cekybot DatSheffy /')) 
    {
        client.say(channel, `@${user.username}, čau! zaludKamo`);
    }
    if(message == '@cekybot zabij se') {
        client.say(channel, `PoroSad`);
    }

    if(message == 'zaludE') {
        client.say(channel, `@${user.username} zaludE`);
    }
    if(message == '!zaludcommands') {
        client.say(channel, `!zalud, !hodnoceni, !madmong, !velkyagrLULE, <jmeno> !gn, <jmeno> !mlady, !vtip, !cas, !kdoudelalcekybota :) , některé funkce lze použít jen jednou za určený časový usek`);
    }
    
    if((message.startsWith('!zalud') && message.includes('Tvrzení, že')==false)) {
        const num = rollDice();
        var vec = message.substr(6);
        client.say(channel, `Tvrzení, že ${vec}, je na ${num}% správné zaludE`);
        setTimeout(() => {client.say(channel, ``)}, 200000);
        
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
    if(message == '@cekybot dankHug') {
        client.say(channel, `@${user.username} dankHug`);
     }
    client.on("subscription", function (channel, username, methods ) {

        client.say(channel, username + " kristova noho, dík za sub" )

    });
    //client.on("resub", function (channel, username, months, message, userstate, methods) {

     //   client.say(channel, username + " kristova noho, dík za resub <3 " )

    //});
    
    if(message == '!vtip') {
    vtipXD();
    }
        function vtipXD(){
        var things =['Servis hudebních nástrojů, dpovědný vedoucí: Ing. Prokop Buben', 'Víte jak se jmenuje had, který vypráví vtipy? Hahad', 'Víš, jak se kouzelník utírá na záchodě? Normálně – trikem.', 'Pepíček dostal k narozeninám granát a je z toho celý pryč.', 'Víš, proč nechodí jogurt na procházku? Protože se bojí, že byl byl prošlý.', 'Jak se nazývá koronavirusová liška? Liška Byst-rouška', 'Víte, proč voda nežije? Protože skapala!', 'Víte, jaký je rozdíl mezi tavičem a babičkou? Tavič taví železo, zatímco babička, ta ví všechno.', 'Příjde kůn do banky a říká: „Dobrý den, chtěl bych si založit koňto.“', 
                   'Ta ironie, když se z veganství stane masová záležitost.', '„Proč je ti tak nevolno?“ „Bo loňské špagety.“', 'Vletí moucha do hospody a táže se: „Promiňte, je tahle stolice volná?“', 'Dva zloději ukradli kalendář. Každý dostal šest měsíců.', '„Pane průvodčí, jede ten vlak na Písek?“ „Ne, na naftu!“', 'Přijde Hertz do baru a říká: „Jedno pivo, ať to kmitá!“', '„Jaký je váš nejoblíbenější typ fotoaparátu, pane Slepičko?“ „Ko-ko-Kodak!“', 'Víte, jak se smějou dřevorubci? Řežou se smíchy.', '„Máš dneska čas?“ „Ne, jdu si koupit brýle.“ „A potom?“ „Potom uvidím.“', '„Chcete slyšet vtip o České poště?“ „Jojo, klidně.“ „Tak dobře, ale nevím, jestli vám to dojde...“',
                    'Kdy je muž NAIVNÍ? Při souloži - když je NA I V NÍ.','Víte, jak si z černocha vytvoříte léčivou bylinu? Uříznete mu ho a máte ČERNEJ BEZ.','Víte proč ženy během milostné předehry ani nemrknou? Protože to nestihnou.','Nanosekunda = dámské přirození na čichovém orgánu?','Pes: Já svému páníčkovi jím úkoly. Já ty jeho úkoly žeru.'];
        var thing = things[Math.floor(Math.random()*things.length)];
        client.say(channel, `${thing}`);
        setTimeout(() => {client.say(channel, ``)}, 600000);
    }
    
    if(message == '!cas') {
        let options = {
            timeZone: 'Europe/Prague',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          },
    formatter = new Intl.DateTimeFormat([], options);
        const currentdate = formatter.format(new Date());
                
                Date.prototype.timeNow = function () {
                    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
               }
               var datetimet =  new Date().timeNow();
               var res = datetimet.substring(0, 5);
        client.say(channel, `kristova noho🦶, ono už je ${res}`); 
    }
    if(message == '!kdoudelalcekybota') {
        client.say(channel, `@${user.username} ctrlv.cz/NeXE`);  
    }
    
    
});
