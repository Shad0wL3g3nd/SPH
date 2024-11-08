# S.P.H.
Shadows's Privacy Hub

Imagine your every day hacked client for a video game, now imagine all of the cheats there are privacy focused tools. This JavaScript based client brings together both of those things together and just looks super cool. Also, the current toggle key is RSHIFT.

# Injector Installation

Copy the code below, and rclick your bookmarks bar and click the 'Add page...' button. After so, paste the code you just copied, and paste it in where it says 'URL'. Where it says 'Name' type in 'SPH' or whatever you want to call it.
```
javascript:(function()%7Bfetch('https%3A%2F%2Fraw.githubusercontent.com%2FShad0wL3g3nd%2FSPH%2Fmain%2FResources%2FGUI.js').then((res)%20%3D%3E%20res.text()).then((js)%20%3D%3E%20eval(js))%3B%7D)()%3B
```

## Special thanks
```
Shad0wL3g3nd

```
## Fetch Code

### Nice
```
fetch('URL Here')
  .then((res) => res.text())
  .then((js) => eval(js));
```
### Compact

```
fetch('URL Here').then((res) => res.text()).then((js) => eval(js));
```

## Outdated Fetch Code
```
## Fetch code
\```
fetch('URL Here')  .then(response => response.text())  .then(data => {    eval(data);  })
\```
### Secondary
\```
let fetchRes = fetch('URL Here');fetchRes.then(res =>    res.json()).then(d => {        console.log(d)    })
\```
## Fetch code nicer
\```
fetch('URL Here')
  .then(response => response.text())
  .then(data => {
    eval(data);
  }
)
\```
```
## Useful Links

### Bookmarklet Compiler
```
https://caiorss.github.io/bookmarklet-maker/
```
### Bookmarklet Combiner
```
https://w-shadow.com/bookmarklet-combiner/
```
### Javascript Formatter
```
https://www.freeformatter.com/javascript-beautifier.html
```
### JS Inject
```
https://disnos9.github.io/jsinject/
```
