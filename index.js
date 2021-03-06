// Imports
const rpc = require('discord-rpc');
const config = require('./config.json');
const client = new rpc.Client({
	transport: 'ipc'
})

// Console Presets
const spacer = `   `;

// Enabled / Disabled

Buttons = Boolean(config['Buttons?']);
if (config['Buttons?'] == 'Disable') {
	var x = 0
} else if (config['Buttons?'] == 'Enable') {
	var x = 1;
}

ElaspedTime = Boolean(config['TimeElapsed?']);
if (config['TimeElapsed?'] == "Disable") {
	var t = 0;
} else if (config["TimeElapsed?"] == "Enable") {
	var t = 1;
}

// External Stuff
time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

// Startup Output
console.log("Starting up ..");
console.log(spacer + "Gathering Login & Authentication ..");

// On-ready Function
client.on('ready', () => {
	console.log(
		spacer + spacer + "Authorized via",
		client.user.username + "#" + client.user.discriminator
	);
	console.log(spacer + "Presence ..");

	if (x === 0) {
		if (t === 0) {
			client.clearActivity;
			client.request("SET_ACTIVITY", {
				pid: process.pid,
				activity: {
					// Client Config
					details: config.Description,
					state: config.State,
					assets: {
						large_image: config.LargeImage.Asset,
						large_text: config.LargeImage.Tooltip,
						small_image: config.SmallImage.Asset,
						small_text: config.SmallImage.Tooltip,
					},
				},
			});
		} else if (t === 1) {
			client.clearActivity;
			client.request("SET_ACTIVITY", {
				pid: process.pid,
				activity: {
					// Client Config
					details: config.Description,
					state: config.State,
					timestamps: {
						start: Date.now() + 5 * 60,
					},
					assets: {
						large_image: config.LargeImage.Asset,
						large_text: config.LargeImage.Tooltip,
						small_image: config.SmallImage.Asset,
						small_text: config.SmallImage.Tooltip,
					},
				},
			});
		}
	} else if (x === 1) {
		if (t === 0) {
			client.clearActivity;
			client.request("SET_ACTIVITY", {
				pid: process.pid,
				activity: {
					// Client Config
					details: config.Description,
					state: config.State,
					assets: {
						large_image: config.LargeImage.Asset,
						large_text: config.LargeImage.Tooltip,
						small_image: config.SmallImage.Asset,
						small_text: config.SmallImage.Tooltip,
					},
					// Button Config
					buttons: [
						{
							label: config.Button1.Text,
							url: config.Button1.Redirect,
						},
						{
							label: config.Button2.Text,
							url: config.Button2.Redirect,
						},
					],
				},
			});
		}
		if (t === 1) {
			client.clearActivity;
			client.request("SET_ACTIVITY", {
				pid: process.pid,
				activity: {
					// Client Config
					details: config.Description,
					state: config.State,
					timestamps: {
						start: Date.now() + 5 * 60,
					},
					assets: {
						large_image: config.LargeImage.Asset,
						large_text: config.LargeImage.Tooltip,
						small_image: config.SmallImage.Asset,
						small_text: config.SmallImage.Tooltip,
					},
					// Button Config
					buttons: [
						{
							label: config.Button1.Text,
							url: config.Button1.Redirect,
						},
						{
							label: config.Button2.Text,
							url: config.Button2.Redirect,
						},
					],
				},
			});
		}
	} else {
		console.log(
			spacer +
				spacer +
				"*  Invalid toggle value in config. This error appeared due to [Enable/Disable] not appearing properly under [Buttons?] / [TimeElapsed?]."
		);
	}
	console.log(spacer + spacer + "*  Loaded [/ Dependencies]"); // Presence
	console.log(spacer + spacer + "*  Loaded [/ Required Assets]"); // Assets
	if (t !== 0) {
		console.log(spacer + spacer + "*  Loaded [/ Time Elapsed]"); // Time Elapsed
	}
	if (x !== 0) {
		console.log(spacer + spacer + "*  Loaded [/ Buttons]"); // Buttons
		console.log(spacer + spacer + spacer + "^  Verified Redirects"); // Buttons
	}
	console.log("*  Presence Ready!");
	console.log(spacer + "*  Running since " + `[${time}]`); // Runtime
});

// Starts the presence
client.login({
	clientId: config.ClientID
}).catch(console.error); // Error Squsher - catches errors and outputs them