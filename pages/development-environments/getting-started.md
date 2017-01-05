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
1. Make sure the hosts entries below are inside your hosts file, without duplicates (C:\Windows\System32\drivers\etc):

```text
127.0.0.20	dev.howtoplaypianos.com
127.0.0.20	dev.iplaypiano.com
127.0.0.20	dev.jaredfalk.com
127.0.0.20	dev.keyboardlessons.com
127.0.0.20	dev.learnchurchsound.com
127.0.0.20	dev.learningdrums.com
127.0.0.20	dev.learntoplaydrums.com
127.0.0.20	dev.lionelduperron.com
127.0.0.20	dev.bassdrumsecrets.com
127.0.0.20	dev.breaksticks.com
127.0.0.20	dev.cobus.com
127.0.0.20	dev.cobusmethod.com
127.0.0.20	dev.drumeoedge.com
127.0.0.20	dev.drumfillsystem.com
127.0.0.20	dev.druminstructiondvds.com
127.0.0.20	dev.drumlessons.net
127.0.0.20	dev.drummerlessons.com
127.0.0.20	dev.drummerplayalongs.com
127.0.0.20	dev.drummersgameplan.com
127.0.0.20	dev.drummingsystem.com
127.0.0.20	dev.drummingtuition.com
127.0.0.20	dev.drumsolosystem.com
127.0.0.20	dev.howtodrum.com
127.0.0.20	dev.howtoplaydrums.com
127.0.0.20	dev.learntoplaypianos.com
127.0.0.20	dev.maximummeytal.com
127.0.0.20	dev.moellermethod.com
127.0.0.20	dev.musiciansrecommend.com
127.0.0.20	dev.musicianstechniques.com
127.0.0.20	dev.natebosch.com
127.0.0.20	dev.onehandedroll.com
127.0.0.20	dev.pianobyear.net
127.0.0.20	dev.pianolessons.com
127.0.0.20	dev.pianolessons.net
127.0.0.20	dev.pianolessonsbyear.com
127.0.0.20	dev.pianosystem.com
127.0.0.20	dev.pianotutorial.com
127.0.0.20	dev.railroadmedia.com
127.0.0.20	dev.rockdrummingsystem.com
127.0.0.20	dev.successfuldrumming.com
127.0.0.20	dev.totaldrummingsuccess.com
127.0.0.20	dev.13drumrudiments.com
127.0.0.20	dev.26drumrudiments.com
127.0.0.20	dev.40drumrudiments.com
127.0.0.20	dev.drum-videos.com
127.0.0.20	dev.drumeo-chef
127.0.0.20  dev.freedrumlessons.com
127.0.0.20  dev.drumlessons.com
127.0.0.10 dev.pianote.com
127.0.0.1  dev.drumeo.com
```