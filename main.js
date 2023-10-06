const { app, BrowserWindow, Menu ,shell} = require('electron')

const path = require("path");
const createWindow = () => {
    const win = new BrowserWindow({
        width: 1220,
        height: 800,
        title:"win12",
        icon:"./windows12.png",
        webPreferences: {
            nodeIntegration: true,
            webSecurity: true,
            partition: String(+new Date())
        }
    })
    win.setFullScreen(true)
    win.loadFile(path.join(__dirname, "desktop.html"))
    var menuTemplate = [
        {
            label: "菜单",
            submenu: [
                // accelerator 配置快捷键
                { label: '退出', click: () => { app.quit() } },
                { label: '全屏', click: () => {if(win.isFullScreen()){win.setFullScreen(false)}else{win.setFullScreen(true)}} 
            
            },
                { label: '此项目', click: () => { shell.openExternal("https://github.com/xiaowumin-mark/win12-client"); } }
            ]
        }
        
    ];
    // 固定写法
    var menuBuilder = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menuBuilder);
    
}



app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})