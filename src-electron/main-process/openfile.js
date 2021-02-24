import electron, { app, BrowserWindow, nativeTheme } from 'electron'

export function openfile(event, file, type) {
    console.log(file)

    const window = new BrowserWindow({
        width: 1000,
        height: 600,
        useContentSize: true,
        webPreferences: {
            nodeIntegration: true
        }
      })
      
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    window.loadURL(process.env.APP_URL + '/#/file')
    window.setMenu(null)

    electron.ipcMain.once('getfile', () => {
        window.webContents.send('openfile', file, type)
    })
}