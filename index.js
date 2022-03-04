const tmi = require('tmi.js'),
	{ channel, username, password } = require('./settings.json')

const options = {
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true,
	},
	identity: {
		username,
		password,
	},
	channels: [channel],
}
//node index.js
const client = new tmi.Client(options)
client.connect().catch(console.error)

//client.on('connected', () => {
//   client.say(channel, `${username} nojo zmrde už jsem tady!`);
//});

client.on('message', (channel, user, message, self) => {
	if (self) return

	const { username } = user

	// Handling messages, that tag bot
	if (tagsBot(message)) {
		const messageCategory = Object.entries(messageCategoriesMatcher).find(
			([key, regex]) => regex.test(message)
		)[0]

		if (!responseDictionary[messageCategory]) return
		client.say(channel, responseDictionary[messageCategory](username))
	}

	// Command handling
	if (isCommand(message)) {
		executeCommand(message, user, client, channel)
	}

	// Special interactions
	if (message == 'zaludE') {
		client.say(channel, `@${username} zaludE`)
	}
	if (message == `agr1 agr2`) {
		client.say(channel, `agr3 agr4`)
	}
	if (message.includes(' žalud ')) {
		client.say(channel, `@${username} zaludWeird`)
	}
	if (message.includes('žalud')) {
		client.say(channel, `@${username} zaludWeird`)
	}
})

// Constants
const jokes = [
	'Servis hudebních nástrojů, dpovědný vedoucí: Ing. Prokop Buben',
	'Víte jak se jmenuje had, který vypráví vtipy? Hahad',
	'Víš, jak se kouzelník utírá na záchodě? Normálně – trikem.',
	'Pepíček dostal k narozeninám granát a je z toho celý pryč.',
	'Víš, proč nechodí jogurt na procházku? Protože se bojí, že byl byl prošlý.',
	'Jak se nazývá koronavirusová liška? Liška Byst-rouška',
	'Víte, proč voda nežije? Protože skapala!',
	'Víte, jaký je rozdíl mezi tavičem a babičkou? Tavič taví železo, zatímco babička, ta ví všechno.',
	'Příjde kůn do banky a říká: „Dobrý den, chtěl bych si založit koňto.“',
	'Ta ironie, když se z veganství stane masová záležitost.',
	'„Proč je ti tak nevolno?“ „Bo loňské špagety.“',
	'Vletí moucha do hospody a táže se: „Promiňte, je tahle stolice volná?“',
	'Dva zloději ukradli kalendář. Každý dostal šest měsíců.',
	'„Pane průvodčí, jede ten vlak na Písek?“ „Ne, na naftu!“',
	'Přijde Hertz do baru a říká: „Jedno pivo, ať to kmitá!“',
	'„Jaký je váš nejoblíbenější typ fotoaparátu, pane Slepičko?“ „Ko-ko-Kodak!“',
	'Víte, jak se smějou dřevorubci? Řežou se smíchy.',
	'„Máš dneska čas?“ „Ne, jdu si koupit brýle.“ „A potom?“ „Potom uvidím.“',
	'„Chcete slyšet vtip o České poště?“ „Jojo, klidně.“ „Tak dobře, ale nevím, jestli vám to dojde...“',
]

const commands = {
	zaludcommands: ({ client, channel }) => {
		client.say(
			channel,
			`!zalud, !hodnoceni, !madmong, !velkyagrLULE, !gn <jmeno>, !mlady <jmeno>, !vtip, !cas :)`
		)
	},
	zalud: ({ client, channel, rest }) => {
		const num = rollDice()
		client.say(channel, `Tvrzení, že ${rest}, je na ${num}% správné zaludE`)
	},
	hodnoceni: ({ client, channel }) => {
		const num = hraxd()
		client.say(channel, `Tato hra je ${num}/10 zalud5Head`)
	},
	madmonq: ({ client, channel }) => {
		client.say(
			channel,
			`zaludE Čau frajeři, tady Žalud 🌰, dneska jsem v lese 🌳🌳, a jsem teda zase zpátky, tentokrát s Madmongama FeelsAmazingMan 💊 madmonq.gg/agraelus`
		)
	},
	velkyagrLULE: ({ client, channel }) => {
		client.say(channel, `agr1 agr2`)
		setTimeout(() => {
			client.say(channel, `agr3 agr4`)
		}, 2500)
	},
	gn: ({ client, channel, rest }) => {
		client.say(channel, `${rest} zaludBedge Dobrou noc 🌃`)
	},
	mlady: ({ client, channel, rest }) => {
		client.say(channel, `MLADY 🌹 ${rest}`)
	},
	vtip: ({ client, channel }) => {
		client.say(channel, getRandomItemFromArray(jokes))
	},
	cas: ({ client, channel }) => {
		const clock = () => {
			let date = new Date()
			let hrs = date.getHours()
			let mins = date.getMinutes()
			let secs = date.getSeconds()
			let time = `${hrs}:${mins}`
			// log the time in console
			console.log(time)
		}
		client.say(channel, `Kristova noho🦶, ono už je ${clock()}`)
	},
}

const messageCategoriesMatcher = {
	greeting: /(ahoj)|(čau)|(čus)|(zdar)|(nazdar)/,
	offensive: /(zabij se)|(mrdko)|(chc[í|i]pni)/,
}

const responseDictionary = {
	greeting: (username) => `@${username}, čau! zaludKamo`,
	offensive: (username) => 'PoroSad',
}

// Helper functions
function rollDice() {
	const sides = 100
	return Math.floor(Math.random() * sides) + 1
}

function hraxd() {
	const sides = 10
	return Math.floor(Math.random() * sides) + 1
}

function isCommand(message) {
	return message.startsWith('!')
}

function tagsBot(message) {
	return message.includes('@cekybot')
}

function getRandomItemFromArray(array) {
	const randomIndex = Math.floow(Math.random() * things.length)
	return array[randomIndex]
}

function executeCommand(command, user, client, channel) {
	const tokens = command.split(' ')
	const commandName = tokens[0].substr(1)
	const rest = tokens.slice(1).join(' ')

	commands[commandName]({ user, client, channel, rest })
}
