# React & Mustache Extra Life Alerting System

## What is this?
ExtraLifeAlerts is a flexible alerting system which masks Extra Life's API.

It provides a runnable/ buildable and embeddable solution for displaying screens associated with extra life donations.

The software is designed to be as flexible as possible, providing the capibility to template the look and feel at will using mustache, custom CSS and JS functions. You can even have different looks for different streaming scenes by simply providing more templates.

## Setup
```
//to build and launch a hot-change react service:
npm install
npm run watch

//to build a standalone js/ html launcher (./build)
npm install
npm run build
```
## Configuring
In your build go to **config.js**

Before we start:
- Assume all timestamps are UTC milliseconds.
- Look at the existing file to see the default values.

The file is laid out as follows.
```
{
  main: {
    participantId: number //your extra life id
    teamId: number //your extra life team
    eventStartTimestamp: number //event start time
    soundVolume: number //volume of the application sounds (either synthetic speech or otherwise)
    speechLanguage: string //spoken language of the speaking tools,
    mockEnabled?: boolean //enables developer mode,
  }
  screens: {
    [key: string]: (
        data: { //screen data
            participant: //participant info, conveyed below
            team: //team info, conveyed below
            donations: //donations info, conveyed below
            timer: {
                DD: //days since/until
                hh: //hours since/until
                mm: //minutes since/until
                ss: //seconds since/until
            }
        }
        controller: {
            addToScreenQueue( //append a screen to the screen queue
                screenName //config.screens name
                timeOut //milliseconds the screen shows for
                customConfig //config to pass into the screen
            )
            refreshIdInCurrent( //re-render a specific element
                id: //id in screen to re-render
                dataOverrides: //data overrides to base screen
            )
            playSound( //play a sound
                soundUrl: //url of the sound to play
            )
            saySomething( //say something with Text-To-Speech
                speechText: //text to speak with TTS
            )
            muteAudio() //turn off audio/ TTS
            unmuteAudio() //turn on audio/ TTS
            getTimer() //gets the latest timer data (above)
            getPage() //gets the current screen URL
            getData() //gets updated scene data (above)
        }
    ) => Promise<string>
  }
  onStart: ( //callback when platform starts
    data:  //screen data (same as above)
    controller: //screen controller (same as above)
  ) => void
  onTimerTick: ( //callback when the timer ticks
    data:  //screen data (same as above)
    controller: //screen controller (same as above)
  ) => void
  onNewDonations: ( //callback when new donations are found
    data:  //screen data (same as above)
    controller: //screen controller (same as above)
  ) => void
}
```

In the above, 
- **main** is shared general configuration. 
- **screens** dictate screen functions that return screen content, configured by the params available on the screen. 
- **on[Name]** callback functions that react to platform events

An example config file has been provided to demonstrate the use cases of most of these. I recommend you check it out.

## Templating
This system allows utilisation of mustache templating. An example of which you can see below...

```
<div class="donationHead">
    New Donation!
</div>
<div class="donationFrom">
    Donation from {{donation.displayName}}
</div>
<div class="donationAmount">
    \${{donation.amount}}!
</div>
```
Templates are applied in real time based on context, inserted into whatever scene it is configured on top of. For instance, the below example will configure the formatting of the **donationMessagePopup** screen.

```javascript
{
    ...,
    screens: {
        donationMessagePopup: (data, controller) => {
            return `
            <div class="screen">
            <div class="donationMessageFrom">
                "{{donation.message}}"
            </div>
            <div class="donationMessageHead">
                {{#donation.displayName}}{{donation.displayName}}{{/donation.displayName}}{{^donation.displayName}}Anonymous{{/donation.displayName}}
            </div>
            </div>
            `
        }
    }
}
```

Within the above you can see an example mustache template using custom fields (in the **{{ }}**). 

These fields are also accessible by simply using the data parameter, such as the below.

```javascript
{
    ...,
    screens: {
        donationMessagePopup: (data, controller) => {
            return `
            <div class="screen">
                <div class="donationMessageFrom">
                    ${data.donation.message}
                </div>
                <div class="donationMessageHead">
                    ${data.donation.displayName || "Anonymous"}
                </div>
            </div>
            `
        }
    }
}
```


The available fields that are usable are below.

```typescript
{
    participant: {
        displayName: string
        fundraisingGoal: number
        eventName: string
        links: {
            donate: string
            stream: string
            page: string
        }
        eventID: number
        sumDonations: number
        createdDateUTC: string
        numAwardedBadges: number
        participantID: number
        numMilestones: number
        teamName: string
        streamIsLive: boolean
        avatarImageURL: string
        teamID: number
        numIncentives: number
        isTeamCaptain: boolean
        streamIsEnabled: boolean
        streamingPlatform: string
        sumPledges: number
        streamingChannel: string
        numDonations: number
    },
    team: {
        numParticipants: number
        fundraisingGoal: number
        eventName: string
        links: {
            stream: string
            page: string
        }
        eventID: number
        sumDonations: number
        createdDateUTC: string
        name: string
        numAwardedBadges: number
        captainDisplayName: string
        hasTeamOnlyDonations: false
        streamIsLive: boolean
        avatarImageURL: string
        teamID: number
        streamIsEnabled: boolean
        streamingPlatform: string
        sumPledges: number
        streamingChannel: string
        numDonations: number
    },
    donation: {
        displayName: string
        donorID: string
        links: {
            recipient: string
        }
        eventID: number
        createdDateUTC: string
        recipientName: string
        participantID: number
        amount: number
        avatarImageURL: string
        teamID: number
        donationID: string
        message: string
    }
    donations: [donation above]
    timer: {
        DD: string
        hh: string
        mm: string
        ss: string
    }
}
```
For example:
- {{participant.displayName}} For participant name
- {{team.fundraisingGoal}} For teams fundraising goal
- {{donation.amount}} For the donation amount 

## Styling
This app builds with an external output css file. Simply modify the supplied .css file with whatever you want. As noted in **Templates**, the templates support custom html, so feel free to add you own classes to style these as needed reflecting your output requirements.