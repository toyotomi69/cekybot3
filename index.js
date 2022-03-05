const tmi = require('tmi.js'),
	{ channel, username, password } = require('./settings.json')

const tmiOptions = {
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
const dateFormatterOptions = {
	timeZone: 'Europe/Prague',
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
}

//node index.js
const client = new tmi.Client(tmiOptions)
client.connect().catch(console.error)

Date.prototype.timeNow = function (includeSeconds = true) {
	const hours = prependZeroToTime(this.getHours())
	const minutes = prependZeroToTime(this.getMinutes())
	const seconds = prependZeroToTime(this.getSeconds())

	return `${hours}:${minutes}${includeSeconds ? `:${seconds}` : ''}`
}

const dateFormatter = new Intl.DateTimeFormat([], dateFormatterOptions)

//client.on('connected', () => {
//   client.say(channel, `${username} nojo zmrde už jsem tady!`);
//});

client.on('subscription', function (channel, username, methods) {
	client.say(channel, username + 'kristova noho, dík za sub')
})

client.on('message', (channel, user, message, self) => {
	if (self) return

	try {
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
	} catch (err) {
		console.log(err)
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

// base cooldown is 30 seconds, if specific needed add 'cooldown: <!SECONDS!>' to the command object
const commands = {
	zaludcommands: {
		fnc: ({ client, channel }) => {
			client.say(
				channel,
				`!zalud <tvrzení>, !hodnoceni, !madmonq, !velkyagrLULE, !gn <jmeno>, !mlady <jmeno>, !vtip, !cas, !kdoudelalcekybota :)`
			)
		},
	},
	zalud: {
		fnc: ({ client, channel, rest }) => {
			const num = rollDice()
			client.say(channel, `Tvrzení, že ${rest}, je na ${num}% správné zaludE`)
		},
		cooldown: 1800,
	},
	hodnoceni: {
		fnc: ({ client, channel }) => {
			const num = hraxd()
			client.say(channel, `Tato hra je ${num}/10 zalud5Head`)
		},
	},
	madmonq: {
		fnc: ({ client, channel }) => {
			client.say(
				channel,
				`zaludE Čau frajeři, tady Žalud 🌰, dneska jsem v lese 🌳🌳, a jsem teda zase zpátky, tentokrát s Madmonqama FeelsAmazingMan 💊 madmonq.gg/agraelus`
			)
		},
	},
	velkyagrLULE: {
		fnc: ({ client, channel }) => {
			client.say(channel, `agr1 agr2`)
			setTimeout(() => {
				client.say(channel, `agr3 agr4`)
			}, 2000)
		},
	},
	gn: {
		fnc: ({ client, channel, rest }) => {
			client.say(channel, `${rest} zaludBedge Dobrou noc 🌃`)
		},
	},
	mlady: {
		fnc: ({ client, channel, rest }) => {
			client.say(channel, `MLADY 🌹 ${rest}`)
		},
	},
	vtip: {
		fnc: ({ client, channel }) => {
			client.say(channel, getRandomItemFromArray(jokes))
		},
		cooldown: 600,
	},
	cas: {
		fnc: ({ client, channel }) => {
			const currentdate = dateFormatter.format(new Date())
			const datetime = new Date().timeNow(false)

			client.say(channel, `Kristova noho🦶, ono už je ${datetime}`)
		},
	},
	kdoudelalcekybota: {
		fnc: ({ client, channel, user }) => {
			client.say(channel, `@${user.username} ctrlv.cz/NeXE`)
		},
	},
}

const messageCategoriesMatcher = {
	greeting: /(ahoj)|(čau)|(čus)|(zdar)|(nazdar)/,
	offensive: /(zabij se)|(mrdko)|(chc[í|i]pni)/,
	hug: /(dankHug)/,
}

const responseDictionary = {
	greeting: (username) => `@${username}, čau! zaludKamo`,
	offensive: (username) => 'PoroSad',
	hug: (username) => `@${username} dankHug`,
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
	const randomIndex = Math.floor(Math.random() * array.length)
	return array[randomIndex]
}

function prependZeroToTime(number) {
	return number >= 10 ? number.toString() : `0${number.toString()}`
}

function executeCommand(command, user, client, channel) {
	const tokens = command.split(' ')
	const commandName = tokens[0].substr(1)
	const rest = tokens.slice(1).join(' ')

	// check if command and it's exec fnc is defined
	if (!commands[commandName] || !commands[commandName].fnc) return

	// check if command is off cooldown
	if (!!cooldownMap[commandName]) return

	// define cooldown (default 30 seconds)
	const cd = (commands[commandName].cooldown || 30) * 1000

	// execute command function
	commands[commandName].fnc({ user, client, channel, rest })

	// set command on cooldown
	cooldownMap[commandName] = true

	// setup timeout to put command off cooldown after specified time
	setTimeout(() => {
		cooldownMap[commandName] = false
	}, cd)
}

// map for command cooldowns, leave empty!
const cooldownMap = {}
