# SR Direkt

**SR Direkt** is an iPhone-optimized Web client for [Sveriges Radio][1] stations. It lets you listen to P1, P2, P3, and any local version of P4.

## Why not use the SR app?
The SR app has one major defect: it currently does not use the proper multitasking type. It currently uses task completion backgrounding, which means the app can stay open in the background for ten minutes and then it will get killed. While this doesn't matter so much if all you listen to is [Klartext][2], it does get annoying if you're tuning in live or listening to a longer program.

## Features
* Simple, get-to-the-point interface. Pick a station, press play, and you're done.
* Background audio that lasts longer than 10 minutes.
* AirPlay.
* Remembers what your preferred P4 local station is.

## What this is lacking
* Now playing information. The API used by the header of sr.se doesn't allow cross-domain XHR, and accessing an iframe's document via JavaScript is no longer allowed. (You *could* have a server-side script do the cross-domain request for you, I suppose.)

## Powered by
* [Zepto][3] for DOM manipulation
* [Route.js][4] for routing
* [Store.js][5] for preference-keeping
* HTML5 audio tag

[1]: http://sr.se
[2]: http://sverigesradio.se/sida/default.aspx?programid=493
[3]: http://zeptojs.com/
[4]: http://maraksquires.com/route.js/
[5]: https://github.com/marcuswestin/store.js
