# Tucana dependency inspector

This repo was created to understand the flow of imports and exports in Tucana, to determine the impact range of a file modification, to spot circular dependencies, to assert whether or not folders fit a desired dependency graph, and more.

It is based on [a shell script](./deps.csv.sh) that computes all imports and requires of tucana and does [a csv build](./deps.csv) of them. The line `src/a.js,src/b.js` means that `src/a.js` does an import or a require of `src/b.js`. Data files, images, and external libraries are ignored.

Fun things can be directly done with a bit of bash-fu, but the [Snowpack](https://www.snowpack.dev/) + [Vue 3](https://v3.vuejs.org/) app of this repo can do much more. Set up:

```sh
git clone THIS_REPO
npm install
source deps.csv.sh PATH_TO_TUCANA > deps.csv
node deps.json.js
npm run start
```

## [io](http://localhost:8080/#/io)

Inspect the dependencies across folders. Useful to answer questions like *"does my UI component folder only export stuff, or should I worry about it importing stuff too?"*.

`Click` to select a folder, `Ctrl+Click` to unfold a folder (eg split `src/a` in `src/a/x` and `src/a/y`), `Alt+Click` to fold it back.

`i` means inward dependency: some file in this folder is imported by some file in the selected folder. `I` means deep inward dependency: same, but imports can be indirect. `o` and `O` are for outward outward dependencies: same but the import direction is reversed.

## [inspect](http://localhost:8080/#/inspect)

Inspect the dependencies across two folders. Useful to answer questions like *"where is my UI component folder importing from my API folder?"*.
