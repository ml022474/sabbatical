const { app, BrowserWindow } = require('electron')
const path = require('path')

app.on("window-all-closed", () =>
{
    app.quit();
});

app.whenReady().then(() =>
{
    createWindow();
});


const createWindow = () =>
{
    const browserWindowOptions =
    {
        width: 800,
        height: 600,
        webPreferences:
        {
            preload: path.join(__dirname, 'preload.js')
        }
    };

    const window = new BrowserWindow(browserWindowOptions);

    window.loadFile('./index.html');
};