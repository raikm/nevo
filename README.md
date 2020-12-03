# HOMEPANORAMA
## Intention
Home automation plus tidy and clean design is not often going hand in hand. When you lookup at [Google](https://www.google.com/search?q=home+dashboard&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjf4JDPxrrpAhUHyaQKHaLNCPAQ_AUoAXoECAwQAw&biw=1309&bih=717) for “home dashboards”, the solutions and ideas look overwhelming, crowded or not thoughtfully designed (personal opinion).

With [openhab](https://www.openhab.org/) for example, you can merge devices and services from different companies. The backend provides a lot of functionally. But the frontend [solutions](https://www.openhab.org/docs/configuration/habpanel.html) are not attractive to the eye (again, personal opinion) but very customisable in terms of home automation control.

The [Apple Homekit App](https://support.apple.com/library/content/dam/edam/applecare/images/de_DE/macos/macos-mojave-ios12-macbook-iphone-x-home-app-notifications-hero-crop.jpg), for example, provides a thoughtful interface but only allows you to control devices and see their information. If you considering to hang it on your wall as a control-center, you would have to buy a very expensive “screen” (iPad).

SmartMirrors handle the overview context but are limited with controls (e.g. via Amazon Alexa)

This project should provide a platform independent solution. I found inspiration on [dribble](https://dribbble.com/9raik/collections/2054777-HomeApp), [medium](https://onezero.medium.com/the-morning-paper-revisited-35b407822494) or in interesting [talks](https://www.youtube.com/watch?v=aZZCZpc0AcY) about dashboard design. The problem is that they are often just design-concepts or limited in there features.

To sum up, the motivation is to create an application that extends the functionally beyond controlling. So integrate as many services (e.g. weather, public-transport, calendar infos) as possible without setting back on the design.

## Goals

My goal and dream is to create a dashboard for which we develop together new functionally and integrate services to one platform.

### First concept

First of all the idea is to have a touchscreen mounted on the wall (for example in the entrance) to get a quick overview about information or control often use automations.

The advantage of a web-based solution would be to control and overview information on your computer or other device as well e.g. overview your plant sensors from the couch. Furthermore you could use it on a (not used) tablet, raspberry pi with screen etc..

I drafted a quick first concept to give you an idea about the structure planned.

![https://cdn-images-1.medium.com/max/720/1*x5obiQ9cIw6qRnNsWO56cw.png](https://cdn-images-1.medium.com/max/720/1*x5obiQ9cIw6qRnNsWO56cw.png)

### Current Statues

![Dec 2020](/doc/current_status_dec_2020.png?)

![Aug 2020](/doc/current_statues.png?)

### Some integration ideas

To just name a few for the dashboard:

- Integration of a package tracker: see upcoming deliveries and if “delivery today” show it in your *inbox* (tracking [api](https://extcall.17track.net/de))
- Integration of a plant-overview-board (works with [xiaomi plant sensors](https://de.gearbest.com/other-garden-supplies/pp_373947.html) to get current plant information)
- Integration of scene control: control common scenes like “coming home”, “start cleaning” (e.g. integrate with openhab)
- Integration of public transport information: show upcoming trains or buses: e.g.: create routines for mornings to see schedules (use public transport apis from local cities)

*see the [Kanbanboard](https://github.com/raikm/homepanorama/projects/2) for more ideas.*

Solutions of this examples exist for sure but they are mostly isolated solutions and are a good start.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### About me

Passionate and detailed oriented software engineer with background in the medical software industry looking to grow as a full stack developer.

Since more than one year I am passionated about python (writing automation scripts) and web developing. I started with vue.js at the beginning of 2020 and I love it. I am also using it in my current master-thesis to work on a recruitment tool, where medical staff can analyse patient-data to get an overview about potential patients.

Since one year I started to invest way more time in software developing in private projects and my learning curve rises steadily. The topics I am working on a daily basis are web developing (vue.js), [FHIR](https://hl7.org/FHIR/) (standard for health care data exchange) and Python (Django Server).

🔗 [Github](https://github.com/raikm) | ✉️ osproject@raik-mueller.com

Please feel also free to leave feedback or new ideas 😊
