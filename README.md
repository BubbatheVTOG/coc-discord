# coc-discord(-neovim?)

This is a fork of upstream `coc-discord` with refactorings and added features.

![example-image](https://i.imgur.com/uCRF1fB.png)

## What Features are Implemented Here

- Rich presences reports that the application being used is Neovim
- Large and small image assets in the rich presence based on open file.
 - Languages reported:
 - c, c++, java, typescript, javascript, python, yaml, html, css, php, ruby
- Ability to change runtime behaviors based on environment variables.
 - Environment variables:
 - `CLIENT_ID`
 - `ELAPSE_UPDATE_DURATION`
- Logging output to `:CocInfo`

## What Other Features are Planned

- Deriving the project root from `coc`'s built-in api.
- The ability to ignore showing sensitive projects.
 - Thoughts on implementing this, neither solution has obvious merits:
 - This can be implemented by having the users edit the `coc-config`. This is
not optimal as it is not obvious.
 - This could also be implemented by importing all of neovim and grabbing global
configuration variables from vimrc. This is more user friendly, but makes the install
quite a bit larger for a relatively small utilization of the neovim api.
- Setting logging levels (for development purposes).
- Adding a `:h` file?

## Running this Repository

Currently, this repository is not published on npm and must be installed
manually in a somewhat hacky way. Maybe..someday..I'll publish this on npm to
stop this nonsense.

0. Run neovim.
1. Clone this repository.
2. Install `coc` via a plugin manager.
3. `CocInstall coc-discord`
4. Navigate to and delete: `$HOME/.cache/coc/node_modules/coc-discord`
5. `ln -s <location to this repo> $HOME/.cache/coc/node_modules/coc-discord`
6. Open or restart Discord.
7. Open neovim in the root of a project directory.

<!-- vim:tw=80:fo+=t
-->
