
let {tsxBuild, tsxWatch, solBuild, solWatch, cssTypeBuild, cssTypeWatch} = require('soliditySapper');
//import {tsxBuild, tsxWatch, solBuild} from 'soliditySapper/tsxCompiler';

const solIndeces = [
    'src/contracts src/contracts/MainContract.sol dist'
];

const tsxIndeces = [
    'src/gui testingGui.tsx dist',
    'src/gui annotatorDemo.tsx dist',
    'src/gui taskRequesterDemo.tsx dist'
];

const cssTypeIndeces = [
    __dirname + '/src'
];

const tsxParameters = {
    tsconfig: __dirname + "/tsconfig.json"
};

let commands;
commands = {
    // main commands
    build: () => commands.buildContracts() && commands.buildCssType() && commands.buildGui(),
    watch: () => commands.watchContracts() && commands.watchCssType() && commands.watchGui(),

    // build subcommands
    buildContracts: () => solIndeces.map((item) => solBuild(...item.split(' ').filter((dummy, index) => index > 0))),
    buildGui: () => tsxIndeces.map((item) => tsxBuild(...item.split(' ').concat([tsxParameters]))),
    buildCssType: () => cssTypeBuild(cssTypeIndeces),

    // watch subcommands
    watchContracts: async () => solIndeces.map((item) => solWatch(...item.split(' '))),
    watchCssType: async () => cssTypeWatch(cssTypeIndeces),
    watchGui: async () => tsxIndeces.map((item) => tsxWatch(...item.split(' ').concat([tsxParameters])))

};

if (process.argv.length != 3 || !commands[process.argv[2]]) {
    console.log('invalid arguments');
    process.exit(1);
}

commands[process.argv[2]]();
