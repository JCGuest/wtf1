![Heroku app beta](https://imgur.com/bccROtL.gif)

# WTF1 Race-Results-Bot

I'm a huge Formula One fan. Like many fans of the sport; I often find myself looking up stats and race results. The tool available on the official website, useful though it may be, is a little unwieldy and slow. This application is a quick and convenient method of getting race and championship statistics.

This application was built with **React**, **Node**, and **Express**.

Using some clever algorithms; it takes input from the user via text or speech-to-text, translates that query into a request to the [Ergast Developer API](https://ergast.com/mrd/), and returns the results.

### Demo

The "master" branch is optimized for production as it is hosted [here](https://wtf1raceresults.herokuapp.com/). That is the beta but basic functionality should be available. The production build can be found in `./views/build`.

### To Deploy

The production build is included in this repo for testing purposes but to deploy locally there is one very simple method. From the parent directory; enter the command `npm run dev`. This will start both the Express and React servers and deploy the development version.

### TypeScript

The main model is written with TypeScript. To run the TypeScript compiler, enter the command `tsc`. This will start the compiler in watch mode (auto-updates after file changes are made) as per the `tsconfig.json` file.
