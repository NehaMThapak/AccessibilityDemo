[Accessibility](https://www.reaccessible.com) Front-end build instructions
=======================================

Prequisites:
------------
1. [visual studio code](https://code.visualstudio.com/Download) or equivalent IDE. Install appropriate plugin for EditorConfig (http://editorconfig.org/#download)

2. [git (latest version)](https://git-scm.com/downloads)
after installing base git you may want to install a gui client for git, this is up to you - as all things git can be done from CLI.
Visual Studio Code has a built gui for git. For windows users, I prefer [Git Extensions](https://gitextensions.github.io/) 

3. [nodejs and npm (both included in 'installers')](https://nodejs.org/en/download/)

4. [java JDK 8 (jdk1.8.0_74)](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
This is required for the HTML5 linter.
Download the version: Java SE Development Kit 8u74.
On a Mac, after installing, remove the symbolic link /Library/Java/Home
```
sudo rm /Library/Java/Home
```
Create a symlink
```
ln -s JavaVirtualMachines/jdk1.8.0_74.jdk/Contents/Home /Library/Java/Home
```

One time setup:
---------------

From command line where you want to clone the repo:

clone repo
```
git clone https://mxm.visualstudio.com/DefaultCollection/_git/reaccessible```
From command line in repo root directory:

Bower
``` 
npm install -g bower
```
Node packages
```
npm install
```
Grunt CLI
```
npm install -g grunt-cli
```

Build:
------
```
grunt dev
```
```
grunt server
```
