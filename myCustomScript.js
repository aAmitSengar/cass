const builder = require('electron-builder');

const { Platform } = builder;

builder
  .build({
    targets: Platform.MAC.createTarget(),
    config: {
      directories: {
        output: 'build'
      },
      appId: 'com.myCompany.myApp',
      productName: 'myAppName',
      copyright: 'Copyright © 2019 myCompany',

      mac: {
        target: 'mas',
        type: 'distribution',
        provisioningProfile: 'myApp.provisionprofile',
        identity: 'MyCompany (idNumber)'
      }
    }
  })
  .then(() => {
    // handle result
    console.log('Build OK!');
    return true;
  })
  .catch(error => {
    // handle error
    console.log(error);
  });
