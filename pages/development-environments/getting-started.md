# A Fresh Windows Development Environment

## Software Requirements

- Windows 10 Pro
- Hyper V Virtualization enabled in bios

## Pre Setup

1. Install Docker for Windows
1. Install Git (make sure its accessible from command line ("CMD") using `git` command)
1. Get you beanstalk login info and have it handy somewhere for copy/paste

## Setup
1. Inside main drive (probably `C:`), create this folder path: `C:\web-development-environment\railenvironment\`
1. Clone *railenvironment* repository in to `\web-development-environment\railenvironment\` folder using this url: https://railroad.git.beanstalkapp.com/railenvironment.git
1. Open elevated admin command prompt, navigate to `C:\web-development-environment\railenvironment\windows`
1. Next step **WILL** delete all your local docker containers, images, and volumes! Careful!
1. Run: `fresh-docker.bat`