
# Fantasy Football

[Read about what I’m trying to do here](http://mattborn.github.io/fantasy)

## Requirements

[node + npm](https://github.com/creationix/nvm)

## Usage

In terminal,

```
git clone git@github.com:mattborn/fantasy.git && cd fantasy && npm install
```

To fire up the server,

```
node app.js
```

The app will be available at [http://localhost:1985](http://localhost:1985). Feel free to change the port in `app.js`.

## Endpoints

Will generate a `.json` file in `/public` containing scraped and parsed data.

* `/rankings/espn` — be sure to change league ID on line 12 of `espn_rankings.js`
* `/rankings/fantasypros`
