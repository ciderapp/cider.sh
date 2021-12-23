| ⚠️ | **Compiling the application is only for advanced users. Cider in a compiled state MAY include issues. If you experience these issues and have not modified the code, open an issue. But any issues originated by your own code, are not our responsibility. Any bugs you do encounter do not reflect the applications state in any way. If you are looking for a stable version download the latest [release](https://github.com/ciderapp/cider/releases), but please refrain from using incomplete version bugs as the face of the application. If you experience issues whilst compiling, please refer to the [Compiling Support](https://github.com/https://github.com/ciderapp/cider/wiki/Support-Disclaimer#support-compiling) for more information** | ⚠️ |
|-------------  |-------------  |-------------  |


# How to compile Cider
For most platforms, this is extremely straightforward as it only requires **1** simple CLI command to get it up and running.
Run the command associated with your platform below to compile but if that doesn't work continue reading.

# Requirements (**PLEASE READ**):
* [Node.js](https://nodejs.org/) (13+ preferably.)
* [Yarn](https://yarnpkg.com/) (_Not entirely necessary, `npm` can be used if you prefer_)
* [Git](https://git-scm.com/) (_Needed for clone the repository_)
* [windows-build-tools](https://github.com/nodejs/node-gyp#on-windows) (_If on Windows. Should be installed with Node.js install but install this if you are having errors saying you do not have Visual Studio or VS19_)
* Simple Command Line Knowledge
* Code Editor/IDE (_optional but recommended if you intend on editing files_)
* [RPM tools](https://github.com/csdms/rpm_tools) ( for building on arch)

Once you have those items on your machine, enter the command below. If you run into any compilation issues, please create an [issue](https://github.com/ciderapp/Apple-Music-Electron/issues/new?assignees=&labels=compiling+bug&template=bug_report.md&title=[BUG]+).
<br />

# Instructions

<details>
  <summary>macOS / Linux</summary>
Please run the commands below via your terminal:

```
git clone --recursive https://github.com/ciderapp/cider.git
cd Cider
yarn install
yarn dist
```

After you compile your app, it should be in the source directory inside the `dist` folder.

> _If using `npm` only, replace the yarn commands with `npm i` and `npm run dist`_

> _Please also note that the **macOS build currently will be unable to play Music**. This is a result of the application not being signed._

***
</details>

<details>
  <summary>Windows 10/11</summary>

Please run the command below via Powershell:

```
git clone https://github.com/ciderapp/cider.git; && cd cider; && yarn; && yarn dist;
```

Some users may have their ExecutionPolicy blocking the previous command. In which case run the following:
```
git clone https://github.com/ciderapp/cider.git; cd cider; npx yarn; npx yarn dist;
```

After you compile your app, it should be in the source directory inside the `dist` folder.

***

</details>





