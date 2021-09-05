/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 **/
const fs = require('fs')
import { contextBridge, ipcMain } from 'electron'
import path from 'path'
import { app } from '@electron/remote'
 
contextBridge.exposeInMainWorld('myAPI', {
  wrireData: (data) => {
    var fs = require('fs');
    const publicFolder = path.resolve(__dirname, process.env.QUASAR_PUBLIC_FOLDER);
    const dataPath = `${publicFolder}/data.json`;
    fs.writeFileSync(dataPath, data, 'utf-8');
  },
  readData: () => {
    var fs = require('fs');
    const publicFolder = path.resolve(__dirname, process.env.QUASAR_PUBLIC_FOLDER);
    const dataPath = `${publicFolder}/data.json`;
    var obj = JSON.parse(fs.readFileSync(dataPath, 'utf8')) ;
    // console.log(obj.color);
    return obj;
  }
})
 