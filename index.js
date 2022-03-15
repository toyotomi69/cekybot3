const fetch = require('node-fetch')
const tmi = require('tmi.js')
const { channel, username, password } = require('./settings.json')

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
	client.say(channel, username + ' kristova noho, dík za sub <3')
})
//client.on('resub', function (channel, username, methods) {
//	client.say(channel, username + ' ty kráso, tolik měsíců zaludW')
//})

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

		// StreamElements reaction
		if (username.toLocaleLowerCase() === 'streamelements') {
			if (message.includes(' dono ')) {
				const regex = /([0-9])*\.([0-9])* Kč/
				const amountMatch = regex.exec(message)

				if (!amountMatch || !amountMatch[0]) return

				const amount = parseInt(amountMatch[0])

				if (!amount || isNaN(amount)) return

				const amountInGas = amount / 50

				var litr = ''

				if (amountInGas === 1) litr = 'litr'
				else if (amountInGas % 1 !== 0) litr = 'litru'
				else if (amountInGas > 1 && amountInGas <= 4) litr = 'litry'
				else litr = 'litrů'

				client.say(
					channel,
					`Vojta právě dostal ${amountInGas} litrů benzínu :)`
				)
			}
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
		if (message.includes(' !ááá')) {
			var jmeno = message.split(' ')[0]
			client.say(
				channel,
				`agrKUK ááá ty debílku ${jmeno} , nojo zmrde já tě vidim`
			)
		}

		if (message.includes(' !mlady')) {
			var jmeno = message.split(' ')[0]
			client.say(channel, `MLADY 🌹 ${jmeno}`)
		}
		if (message.includes('!mlady ')) {
			var jmeno = message.split(' ')[1]
			client.say(channel, `MLADY 🌹 ${jmeno}`)
		}
		if (message == '!cojezaden') {
			;(function () {
				var days = [
					'Neděle',
					'Pondělí',
					'Úterý',
					'Středa',
					'Čtvrtek',
					'Pátek',
					'Sobota',
				]

				Date.prototype.getDayName = function () {
					return days[this.getDay()]
				}
			})()

			var now = new Date()

			var day = now.getDayName()
			client.say(channel, `Dneska je ${day} :)`)
		}
		if (message.includes(' !gn')) {
			var jmeno = message.split(' ')[0]
			client.say(channel, `zaludBedge ${jmeno} Dobrou noc 🌃`)
		}
	} catch (err) {
		console.warn(err)
	}
})

// Constants
const jokes = [
	'Servis hudebních nástrojů, odpovědný vedoucí: Ing. Prokop Buben',
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
	'Víte, kdy je muž naivní? Při sexu – jedná se totiž o situaci, při které je na i v ní.',
	'Nanosekunda = dámské přirození na čichovém orgánu?',
	'Když se natáčel Kameňák, bylo na place zakázáno kouřit… A když už, tak JENOM TROŠKU.',
	'Kdy je muž NAIVNÍ? Při souloži - když je NA I V NÍ.',
	'Proč ženy během milostné předehry ani nemrknou? Protože to nestihnou.',
	'Příjde cápek do baru',
]

// base cooldown is 30 seconds, if specific needed add 'cooldown: <!SECONDS!>' to the command object
const commands = {
	zaludcommands: {
		fnc: ({ client, channel }) => {
			client.say(
				channel,
				`!zalud <tvrzení>, !hodnoceni, !madmonq, !velkyagrLULE, !gn <jmeno>, !mlady <jmeno>, !vtip, !cas, !cojezaden, !kdoudelalcekybota, !btc, !eth, !benzin <kč> :)`
			)
		},
	},
	zalud: {
		fnc: ({ client, channel, rest }) => {
			const num = rollDice()
			client.say(channel, `Tvrzení, že ${rest}, je na ${num}% správné zaludE`)
		},
		cooldown: 600,
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
	madmong: {
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
	eth: {
		fnc: async ({ client, channel }) => {
			const price = await getCrypto('ETH')
			client.say(channel, `Cena etherea je $${price.toLocaleString()}`)
		},
	},
	btc: {
		fnc: async ({ client, channel }) => {
			const price = await getCrypto('BTC')
			client.say(channel, `Cena bitcoinu je $${price.toLocaleString()}`)
		},
	},
	vkorunach: {
		fnc: async ({ client, channel, rest }) => {
			const amount = parseFloat(rest)

			if (isNaN(amount)) {
				client.say(channel, `${rest} neni validní číslo zaludWeird`)
				return
			}

			const amountInCzk = await getEurToCzk(amount)

			if (amountInCzk) {
				client.say(channel, `${amount} eur je ${amountInCzk} korun`)
			}
		},
	},
	benzin: {
		fnc: async ({ client, channel, rest }) => {
			const amount = parseFloat(rest)

			if (isNaN(amount)) {
				client.say(channel, `${rest} neni validní číslo zaludWeird`)
				return
			}

			const amountInCzk = amount / 50

			if (amountInCzk) {
				client.say(
					channel,
					`${amount}Kč je ${amountInCzk.toLocaleString()} litrů benzínu`
				)
			}
		},
	},
	veurech: {
		fnc: async ({ client, channel, rest }) => {
			const amount = parseFloat(rest)

			if (isNaN(amount)) {
				client.say(channel, `${rest} neni validní číslo zaludWeird`)
				return
			}

			const amountInEur = await getCzkToEur(amount)

			if (amountInEur) {
				client.say(channel, `${amount} korun je ${amountInEur} euro`)
			}
		},
	},
	vtip: {
		fnc: ({ client, channel }) => {
			client.say(channel, getRandomItemFromArray(jokes))
		},
		cooldown: 300,
	},
	cas: {
		fnc: ({ client, channel }) => {
			Date.prototype.timeNow = function () {
				return (
					(this.getHours() < 10 ? '0' : '') +
					this.getHours() +
					':' +
					(this.getMinutes() < 10 ? '0' : '') +
					this.getMinutes() +
					':' +
					(this.getSeconds() < 10 ? '0' : '') +
					this.getSeconds()
				)
			}
			var datetimet = new Date().timeNow()
			var res = datetimet.substring(0, 5)
			client.say(channel, `Kristova noho, ono už je ${res}`)
		},
	},
	čas: {
		fnc: ({ client, channel }) => {
			Date.prototype.timeNow = function () {
				return (
					(this.getHours() < 10 ? '0' : '') +
					this.getHours() +
					':' +
					(this.getMinutes() < 10 ? '0' : '') +
					this.getMinutes() +
					':' +
					(this.getSeconds() < 10 ? '0' : '') +
					this.getSeconds()
				)
			}
			var datetimet = new Date().timeNow()
			var res = datetimet.substring(0, 5)
			client.say(channel, `Kristova noho, ono už je ${res}`)
		},
	},
	kdoudelalcekybota: {
		fnc: ({ client, channel, user }) => {
			client.say(
				channel,
				`@${user.username} ctrlv.cz/NeXE toyotomi s @trollyal agrLULE`
			)
		},
	},
}

const messageCategoriesMatcher = {
	greeting: /(ahoj)|(čau)|(čus)|(zdar)|(nazdar)/,
	offensive: /(zabij se)|(mrdko)|(chc[í|i]pni)/,
	hug: /(dankHug)|(, dankHug)/,
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

async function getCrypto(cryptoTag) {
	try {
		const crypto = await fetch(
			`https://api.blockchain.com/v3/exchange/tickers/${cryptoTag}-USD`
		)

		const response = await crypto.json()

		const price = response.last_trade_price

		return price
	} catch (err) {
		console.warn(err)
	}
}

async function getEurToCzk(value = 1) {
	try {
		const response = await fetch('https://api.exchangerate.host/latest')
		const rates = await response.json()

		const czk = rates?.rates?.CZK | 0

		const price = czk * value

		return price.toFixed(2)
	} catch (err) {
		console.warn(error)
	}
}

async function getCzkToEur(value = 1) {
	try {
		const response = await fetch('https://api.exchangerate.host/latest')
		const rates = await response.json()

		const czk = rates?.rates?.CZK | 0

		const price = value / czk

		return price.toFixed(2)
	} catch (err) {
		console.warn(error)
	}
}
