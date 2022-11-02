const { app, BrowserWindow, Menu, MenuItem } = require("electron");
const path = require("path");
const mm = Menu.buildFromTemplate([]);
const env = Object.assign(process.env,require("./env"));
let pluginName;
switch (process.platform) {
	case "win32": {
		pluginName = "./extensions/pepflashplayer.dll";
		break;
	} case "darwin": {
		pluginName = "./extensions/PepperFlashPlayer.plugin";
		break;
	} case "linux": {
		pluginName = "./extensions/libpepflashplayer.so";
		app.commandLine.appendSwitch("no-sandbox");
		break;
	}
}
app.commandLine.appendSwitch("ppapi-flash-path", path.join(__dirname, pluginName));
app.commandLine.appendSwitch("ppapi-flash-version", "32.0.0.371");

let mainWindow;
const createMWindow = () => {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 700,
		title: "FGA v4",
		webPreferences: {
			plugins: true,
			contextIsolation: true
		}
	});
	Menu.setApplicationMenu(mm);
	env.win = mainWindow;
	
	mainWindow.loadFile("fga.html")
	mainWindow.on("closed", () => mainWindow = null);
	if (env.NODE_ENV == "dev") {
		mainWindow.webContents.openDevTools();
	};
};


app.whenReady().then(() => {
	createMWindow();
});
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
	if (mainWindow === null) createWindow();
});
Footer
© 2022 GitHub, Inc.
Footer navigation
Terms
