# Tucana dependency inspector

This repo was created to understand the flow of imports and exports in Tucana, to determine the impact range of a file modification, to spot circular dependencies, to assert whether or not folders fit a desired dependency graph, and more.

It is based on [a shell script](./deps.csv.sh) that computes all imports and requires of tucana and does a csv build of them. The line `src/a.js,src/b.js` means that `src/a.js` does an import or a require of `src/b.js`. Data files, images, and external libraries are ignored.

Powerful things can be directly done with a bit of bash-fu, but the [Snowpack](https://www.snowpack.dev/) + [Vue 3](https://v3.vuejs.org/) app of this repo can do much more. Set up:

```sh
git clone THIS_REPO
cd tucana-deps-inspector
pnpm install
source build.sh TUCANA_PATH # this might take a while
pnpm run start
```

## [io](http://localhost:8080/#/io)

Inspect the dependencies across folders. Useful to answer questions like *"does my UI component folder only export stuff, or should I worry about it importing stuff too?"*.

`Click` to select a folder, `Ctrl+Click` to unfold a folder (eg split `src/a` in `src/a/x` and `src/a/y`), `Alt+Click` to fold it back.

`i` means inward dependency: some file in this folder is imported by some file in the selected folder. `I` means deep inward dependency: same, but imports can be indirect. `o` and `O` are for outward outward dependencies: same but the import direction is reversed.

## [inspect](http://localhost:8080/#/inspect)

Inspect the dependencies across two folders. Useful to answer questions like *"where is my UI component folder importing from my API folder?"*.

## [range](http://localhost:8080/#/range)

List the deep outward dependencies of files. Useful to answer questions like *"I have modified `src/a.js` and `src/b.js` in this PR, what files are going to be impacted?"*.

## [circular](http://localhost:8080/#/circular)

Exhaustive list of circular dependencies

## [unimported](http://localhost:8080/#/unimported)

Spot business files (=excludes media, css, test files, storybook) that are not imported by other files
