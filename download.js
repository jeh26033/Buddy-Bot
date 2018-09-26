const fs = require('fs');
const https = require('https');
const async = require('async');

//list of heroes to download reponses for, as they appear in the dota 2 gamepedia urls
const heroes = ["Zeus", "Witch_Doctor", "Windranger", "Vengeful_Spirit", "Tidehunter", "Sven", "Storm_Spirit", "Shadow_Shaman", "Sand_King", "Razor", "Pudge", "Puck", "Necrophos", "Morphling", "Mirana", "Lion", "Lina", "Lich", "Earthshaker", "Drow_Ranger", "Dazzle", "Crystal_Maiden", "Axe", "Anti-Mage", "Slardar", "Enigma", "Viper", "Tiny", "Faceless_Void", "Venomancer", "Nature's_Prophet", "Clockwerk", "Sniper", "Dark_Seer", "Pugna", "Beastmaster", "Shadow_Fiend", "Leshrac", "Enchantress", "Tinker", "Weaver", "Night_Stalker", "Spectre", "Ancient_Apparition", "Doom", "Chen", "Juggernaut", "Kunkka", "Bloodseeker", "Riki", "Wraith_King", "Queen_of_Pain", "Broodmother", "Jakiro", "Huskar", "Batrider", "Omniknight", "Dragon_Knight", "Warlock", "Alchemist", "Lifestealer", "Death_Prophet", "Ursa", "Bounty_Hunter", "Spirit_Breaker", "Silencer", "Invoker", "Clinkz", "Outworld_Devourer", "Bane", "Shadow_Demon", "Lycan", "Lone_Druid", "Brewmaster", "Phantom_Lancer", "Treant_Protector", "Ogre_Magi", "Phantom_Assassin", "Gyrocopter", "Chaos_Knight", "Rubick", "Luna", "Undying", "Disruptor", "Templar_Assassin", "Naga_Siren", "Visage", "Nyx_Assassin", "Keeper_of_the_Light", "Meepo", "Magnus", "Centaur_Warrunner", "Slark", "Timbersaw", "Medusa", "Troll_Warlord", "Tusk", "Bristleback", "Skywrath_Mage", "Elder_Titan", "Abaddon", "Ember_Spirit", "Earth_Spirit", "Legion_Commander", "Terrorblade", "Phoenix", "Techies", "Oracle", "Winter_Wyvern", "Arc_Warden", "Underlord", "Monkey_King", "Pangolier", "Dark_Willow"]

//gets the base name of a file from its path
function getBaseName(path) {
	return path.split("/").pop()
}

//downloads a file from an URL and resolves when the file is saved to the relativePath
function downloadPromise(url, relativePath) {
	return new Promise((resolve, reject) => {
		let file = fs.createWriteStream(relativePath)

		let request = https.get(url, function(response) {
			downloadSteam = response.pipe(file)

			downloadSteam.on('finish', () => {
				console.log("Finished: ", url)
				resolve("success")
			})

			downloadSteam.on('error', (err) => {
				reject(err)
			})
		}).on('error', (err) => {
		  reject(err)
		})
	})
}

//async function wrapper for downloadPromise() to be used with async module.
//also checks if file already exists and if url is valid
async function downloadAsync(url) {
	if(url !== "" && url !== undefined) {
		let relativePath = './responseData/mp3s/' + getBaseName(url)

		if(fs.existsSync(relativePath) == false) {
			return await downloadPromise(url, relativePath)
		} else {
			return 
		}
	} else {
		return
	}
}

//downloads files from a listOfUrls into a specified directory. maxDownloads specifies the maximum number of concurrent downloads
function downloadUrls(listOfUrls, directory, maxDownloads = 10) {
	async.forEachOfLimit(listOfUrls, maxDownloads, downloadAsync, () => {
		console.log("done")
	})
}

//generate list of urls to download from
urls = []
for (let i = heroes.length - 1; i >= 0; i--) {
	let heroResponses = JSON.parse(fs.readFileSync("./responseData/library/" + heroes[i] + '.json','utf8'))
	console.log(heroes[i])

	urls = urls.concat(heroResponses.URLs)
}


downloadUrls(urls)
