Partial frontend code for dopracenakole.cz
-----------------------------------------

This includes some of the `less`, `ts`, and `html` used by [dopracenakole.cz](https://dopracenakole.cz)'s interactive website ([https://dpnk.dopracenakole.cz](https://dpnk.dopracenakole.cz))

For development install using

Tested with Node.js [LTS Gallium](https://nodejs.org/en/download/releases) version.

Installing and activating [Node Version Manager](https://github.com/nvm-sh/nvm/blob/master/README.md#installing-and-updating) `nvm`:

Installing `nvm`:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

Activating `nvm` (add these lines to your `~/.bashrc`, `~/.profile`, or `~/.zshrc` file)
or run interactively from a terminal emulator:

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

Using `nvm`:

```bash
nmv list
nvm install lts/gallium
nvm use lts/gallium
```

Install app packages dependencies

```
npm install
```

Build and run using

```
npm run-script watch
./server
```

Or

```
npm run-script build
./server
```
