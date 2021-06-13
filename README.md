# HOMEPANORAMA

The aim of this project is to create a delightful, intiutive home dashbarod rich of information.

![March 2021](/doc/current_status_may_2021.png?)

![Build](https://github.com/raikm/homepanorama/actions/workflows/main.yml/badge.svg)
![Unit Tests](https://github.com/raikm/homepanorama/actions/workflows/unit_tests.yml/badge.svg)
---

### 🛫 Next Up
```
 📦 Bugfixes - Plant Page
 📦 Bugfixes - Music Player
 📦 Plant Settings: show nearby sensors
 📦 Unit Testing
 📦 Ready to use: Light Page V1
 📦 First tests with health data export from the iPhone
```
---

### 🛬 Latest Updates (Status: 03.05.2021)
```
 🎉 Dashboard Page V1 completly done without mockup data
 🎉 Migration to Vue3 and Typescript

```

### 🏛 Past Major Updates
```
 🎉 Plant Dashboard Page V1
 🎉 Websocket-connection to back-end (homeassistant)
 🎉 Calendar Data (Google API) V1
 🎉 Public Transport (Hafas API) V1 
 🎉 Music Player (Sonos API) V1
 🎉 Implementing Shortcut Buttons (homeassistant)
```
---

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

```
config.json example in wiki!
```

## Intention
Home automation plus tidy and clean design is not often going hand in hand. When you lookup at [Google](https://www.google.com/search?q=home+dashboard&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjf4JDPxrrpAhUHyaQKHaLNCPAQ_AUoAXoECAwQAw&biw=1309&bih=717) for “home dashboards”, the solutions and ideas look overwhelming, crowded or not thoughtfully designed (personal opinion).

With [openhab](https://www.openhab.org/) for example, you can merge devices and services from different companies. The backend provides a lot of functionally. But the frontend [solutions](https://www.openhab.org/docs/configuration/habpanel.html) are not attractive to the eye (again, personal opinion) but very customisable in terms of home automation control.

The [Apple Homekit App](https://support.apple.com/library/content/dam/edam/applecare/images/de_DE/macos/macos-mojave-ios12-macbook-iphone-x-home-app-notifications-hero-crop.jpg), for example, provides a thoughtful interface but only allows you to control devices and see their information. If you considering to hang it on your wall as a control-center, you would have to buy a very expensive “screen” (iPad).

SmartMirrors handle the overview context but are limited with controls (e.g. via Amazon Alexa)

This project should provide a platform independent solution. I found inspiration on [dribble](https://dribbble.com/9raik/collections/2054777-HomeApp), [medium](https://onezero.medium.com/the-morning-paper-revisited-35b407822494) or in interesting [talks](https://www.youtube.com/watch?v=aZZCZpc0AcY) about dashboard design. The problem is that they are often just design-concepts or limited in there features.

To sum up, the motivation is to create an application that extends the functionally beyond controlling. So integrate as many services (e.g. weather, public-transport, calendar infos) as possible without setting back on the design.

## History
##### Plant Dashboard January 2021
![Jan 2021](doc/current_statues_plant_dashboard.png?)

##### December 2020
![](/doc/current_status_december_2020.png?)

##### August 2020
![Aug 2020](/doc/current_statues.png?)
