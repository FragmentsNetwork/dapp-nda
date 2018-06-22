# Fragment.Network Dapp NDA

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

# Install
This project requires nodejs environment with installed yarn.
```
yarn # install all dependencies
```

# Build & Use
```
yarn build # builds whole project

# development
yarn test # run tests on smart contract (build all first)
yarn watch # watch for changes in files and rebuilds project everytime
yarn guiServer # serves testing gui at localhost:8080
```

When running `guiServer` you should be able to access demos at http://localhost:8080/src/gui/
e.g. [taskRequesterDemo](http://localhost:8080/src/gui/taskRequesterDemo.html).

# Troubleshooting

## Development
Dependencies in alpha/beta versions might be unstable. When encountering any strange error after dependency update
try to set fixed version of *Web3js* to older one.
https://github.com/ethereum/web3.js/issues/966
