# coc-discord-neovim

This is a fork of upstream `coc-discord` with refactorings and added features.

![example-image](https://i.imgur.com/uCRF1fB.png)

## What Features are Implemented Here

- Rich presences reports that the application being used is Neovim
- Large and small image assets in the rich presence based on the file in the
    current buffer.
  - Languages reported:
    - c, c++, java, typescript, javascript, python, yaml, html, css, php, ruby
- Ability to change runtime behaviors based on environment variables.
  - Environment variables:
    - `CLIENT_ID`
    - `ELAPSE_UPDATE_DURATION`
- Logging output to `:CocInfo`

## What Other Features are Planned

- [x] Publish to npm.
- [ ] Deriving the project root from `coc`'s built-in api.
- [ ] The ability to ignore showing sensitive projects.
  - Thoughts on implementing this, neither solution has obvious merits:
    - This can be implemented by having the users edit the `coc-config`. This is
not optimal as it is not obvious.
    - This could also be implemented by importing all of neovim and grabbing global
configuration variables from vimrc. This is more user friendly, but makes the install
quite a bit larger for a relatively small utilization of the neovim api.
- [ ] Setting logging levels (for development purposes).
- [ ] Update activity time based on project change or file change.
- [ ] Adding a `:h` file?

## Running this Repository

0. Run neovim.
1. Install `coc` via a plugin manager.
2. From inside of neovim run, `:CocInstall coc-discord-neovim`.

## Debugging and Reporting Issues

Code breaks, report issues by opening up a PR with the output of `:CocInfo`.

## How to Help Development

I will accept most...if not all...PR's. But I do expect your code to run and be
bug free. The steps below outline how to setup a development environment.

0. Run neovim.
1. Clone this repository.
2. Build the software by navigating into the repository root and build it with
   `yarn install` and `yarn build` (note:`npm install`,`npm run build` also works).
3. Install `coc` via a plugin manager.
4. From inside of neovim run, `CocInstall coc-discord-neovim`.
5. Navigate to and delete: `$HOME/.cache/coc/node_modules/coc-discord-neovim`.
5a. If on MacOS, this is located at
`$HOME/.config/coc/node_modules/coc-discord-neovim`.
6. `ln -s <location to this repo>
   $HOME/.cache/coc/node_modules/coc-discord-neovim`.
6a. If on MacOS, `ln -s <location to this repo> $HOME/.config/coc/node_modules/coc-discord-neovim`.
7. Open or restart Discord.
8. Open neovim in the root of the project directory. You are going to use neovim
   to help develop this plugin right?

`Coc` Plugins that Help with Development:

- `coc-eslint`
- `coc-prettier`
- `coc-tsserver`

<!-- vim:tw=80:fo+=t
-->
