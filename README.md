![Heroku app beta](https://imgur.com/uXkx1BM.gif)

# WTF1 Race-Results-Bot

I'm a huge Formula One fan and I often find myself looking up statistics and race results. The tool available on the official website works but it's a little unwieldy and slow. This application is a quick and convenient method of getting race and championship statistics.

This application was built with **React**, **Node**, and **Express**.

It takes input from the user via text or speech-to-text, translates that query into a request to the [Ergast Developer API](https://ergast.com/mrd/), and returns the results as text.

---

### Demo

The production build is hosted on Heroku [here](https://wtf1raceresults.herokuapp.com/). That is the beta but basic functionality should be available. Speech-to-text only functions on Chrome.

---

### To Deploy

1. From the parent directory; enter the command `npm install`
2. From the `/views` directory; enter the command `npm install`
3. From the parent directory; enter the command `npm run dev`. This will start both the Express and React servers and deploy the development version.

---

### TypeScript

The main model is written with TypeScript. To run the TypeScript compiler, enter the command `tsc`. This will start the compiler in watch mode (auto-updates after file changes are made) as per the `tsconfig.json` file.
