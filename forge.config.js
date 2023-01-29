
module.exports = {
  packagerConfig: {
    ignore: [
      "^\\/node_modules$",
  ]
  
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {

        setupExe:'try.exe',
        loadingGif:'Infinity-1s-200px.gif'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
    
  ],
};
