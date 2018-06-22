import contractNameDictionary from '../contractNameDictionary';

const assert = require('assert');

export default function testNDA(web3, tester, globals) {

    describe('Multiparty Signing Director', async () => {
        let createDirector = async (signParties) => {
            let constructorParameters = [signParties];
            let signingDirectorAddress = await tester.easyDeploy(globals.existingAccounts[0], contractNameDictionary.multipartySigningDirector, constructorParameters);

            assert(web3.utils.isAddress(signingDirectorAddress));

            return signingDirectorAddress;
        };

        it('can be deployed', async () => {
            await createDirector([globals.existingAccounts[0]]);
        });

        it('can be signed (1 party)', async () => {
            let signParties = [globals.existingAccounts[0]];
            let signingDirectorAddress = await createDirector(signParties);
            let contract = await tester.createContract(contractNameDictionary.multipartySigningDirector, signingDirectorAddress);

            assert(!await contract.methods.isSignedByAllParties().call());
            await contract.methods.signTreaty().send({from: globals.existingAccounts[0]});
            assert(await contract.methods.isSignedByAllParties().call());
        });

        it('can be signed (2 parties)', async () => {
            let signParties = [globals.existingAccounts[0], globals.existingAccounts[1]];
            let signingDirectorAddress = await createDirector(signParties);
            let contract = await tester.createContract(contractNameDictionary.multipartySigningDirector, signingDirectorAddress);

            assert(!await contract.methods.isSignedByAllParties().call());
            await contract.methods.signTreaty().send({from: globals.existingAccounts[0]});
            assert(!await contract.methods.isSignedByAllParties().call());
            await contract.methods.signTreaty().send({from: globals.existingAccounts[1]});
            assert(await contract.methods.isSignedByAllParties().call());
        });

        it('can\'t be signed repetively by the same party', async () => {
            let signParties = [globals.existingAccounts[0], globals.existingAccounts[1]];
            let signingDirectorAddress = await createDirector(signParties);
            let contract = await tester.createContract(contractNameDictionary.multipartySigningDirector, signingDirectorAddress);

            assert(!await contract.methods.isSignedByAllParties().call());
            await contract.methods.signTreaty().send({from: globals.existingAccounts[0]});
            let tmpPromise = await contract.methods.signTreaty().send({from: globals.existingAccounts[0]})
                .catch(() => {}); // suppress the error and let promise return undefined when await(ed)
            assert(!await tmpPromise);
        });

        it('can\'t be signed by alien party', async () => {
            let signParties = [globals.existingAccounts[0]];
            let signingDirectorAddress = await createDirector(signParties);
            let contract = await tester.createContract(contractNameDictionary.multipartySigningDirector, signingDirectorAddress);

            assert(!await contract.methods.isSignedByAllParties().call());
            let tmpPromise = contract.methods.signTreaty().send({from: globals.existingAccounts[1]})
                .catch(() => {}); // suppress the error and let promise return undefined when await(ed)
            assert(!await tmpPromise);
            assert(!await contract.methods.isSignedByAllParties().call());
        });
    });

    describe('Inclusive Signing Director', async () => {
        let createDirector = async () => {
            let signingDirectorAddress = await tester.easyDeploy(globals.existingAccounts[0], contractNameDictionary.inclusiveSigningDirector);

            assert(web3.utils.isAddress(signingDirectorAddress));

            return signingDirectorAddress;
        };

        it('can be deployed', async () => {
            await createDirector();
        });

        it('can be signed', async () => {
            let signingDirectorAddress = await createDirector();
            let contract = await tester.createContract(contractNameDictionary.inclusiveSigningDirector, signingDirectorAddress);

            assert(!await contract.methods.isSignedByParty(globals.existingAccounts[0]).call());
            await contract.methods.signTreaty().send({from: globals.existingAccounts[0]});
            assert(await contract.methods.isSignedByParty(globals.existingAccounts[0]).call());
        });

        it('can\'t be signed repetively by the same party', async () => {
            let signingDirectorAddress = await createDirector();
            let contract = await tester.createContract(contractNameDictionary.multipartySigningDirector, signingDirectorAddress);

            await contract.methods.signTreaty().send({from: globals.existingAccounts[0]});
            let tmpPromise = await contract.methods.signTreaty().send({from: globals.existingAccounts[0]})
                .catch(() => {}); // suppress the error and let promise return undefined when await(ed)
            assert(!await tmpPromise);
        });
    });

    let createDocument = async (uri, hash) => {
        let constructorParameters = [uri, hash];
        let documentAddress = await tester.easyDeploy(globals.existingAccounts[0], contractNameDictionary.minimalDocument, constructorParameters);

        return documentAddress;
    };

    describe('Minimal Document', async () => {
        it('can be deployed', async () => {
            const uri = 'http://somedocument.com';
            const hash = 'a5a6r78e9';

            let documentAddress = await createDocument(uri, hash);
            assert(web3.utils.isAddress(documentAddress));

            let contract = await tester.createContract(contractNameDictionary.minimalDocument, documentAddress);
            assert(await contract.methods.uri().call() == uri);
            assert(await contract.methods.hash().call() == hash);
        });
    });

    describe('Multi Origin Document', async () => {
        it('can be deployed', async () => {
            //const uris = ['http://firstLinkToDocument.com', 'http://secondLinkToDocument.com',  'eth://someEthLink'];
            const uri = 'http://somedocument.com';
            const hash = 'a5a6r78e9';

            let documentAddress = await tester.easyDeploy(globals.existingAccounts[0], contractNameDictionary.multiOriginDocument, [uri, hash]);

            assert(web3.utils.isAddress(documentAddress));

            let contract = await tester.createContract(contractNameDictionary.multiOriginDocument, documentAddress);
            assert(await contract.methods.uri().call() == uri);
            assert(await contract.methods.hash().call() == hash);
            assert(await contract.methods.getOriginCount().call() == 1);
        });

        it('can have new origin added', async () => {
            const uri = 'http://somedocument.com';
            const uri2 = 'http://secondlink.com';
            const hash = 'a5a6r78e9';

            let documentAddress = await tester.easyDeploy(globals.existingAccounts[0], contractNameDictionary.multiOriginDocument, [uri, hash]);
            assert(web3.utils.isAddress(documentAddress));
            let contract = await tester.createContract(contractNameDictionary.multiOriginDocument, documentAddress);

            assert(await contract.methods.getOriginCount().call() == 1);
            assert(await contract.methods.origins(0).call() == [uri]);

            await contract.methods.addOrigin(uri2).send({from: globals.existingAccounts[0]});

            assert(await contract.methods.getOriginCount().call() == 2);
            assert(await contract.methods.origins(0).call() == uri);
            assert(await contract.methods.origins(1).call() == uri2);
        });
    });

    describe('Minimal Document Storage', async () => {
        let createStorage = async () => {
            let constructorParameters = [[
                await createDocument('http://somedocument.com', 'a5a6r78e9'),
                await createDocument('http://somedocument2.com', 'b56c51a23')
            ]];
            let storageAddress = await tester.easyDeploy(globals.existingAccounts[0], contractNameDictionary.minimalDocumentStorage, constructorParameters);

            assert(web3.utils.isAddress(storageAddress));

            return storageAddress;
        };

        it('can be deployed', async () => {
            let storageAddress = await createStorage();

            let contract = await tester.createContract(contractNameDictionary.minimalDocumentStorage, storageAddress);

            let documents  = await contract.methods.getTreatyDocuments().call();
            assert(documents.length == 2);
            assert(await contract.methods.isStorageLocked().call());
        });
    });

    describe('Appendable Document Storage', async () => {
        let createStorage = async () => {
            let constructorParameters = [[
                await createDocument('http://somedocument.com', 'a5a6r78e9'),
                await createDocument('http://somedocument2.com', 'b56c51a23')
            ]];
            let storageAddress = await tester.easyDeploy(globals.existingAccounts[0], contractNameDictionary.appendableDocumentStorage, constructorParameters);

            assert(web3.utils.isAddress(storageAddress));

            return storageAddress;
        };

        it('can be deployed', async () => {
            let storageAddress = await createStorage();

            let contract = await tester.createContract(contractNameDictionary.appendableDocumentStorage, storageAddress);

            let documents  = await contract.methods.getTreatyDocuments().call();
            assert(documents.length == 2);
            assert(!await contract.methods.isStorageLocked().call());
        });

        it('documents can be appended', async () => {
            let storageAddress = await createStorage();
            let contract = await tester.createContract(contractNameDictionary.appendableDocumentStorage, storageAddress);
            let tmpDocument = await createDocument('http://appendedDocument.com', '5caf623b2');


            //await c;
            assert((await contract.methods.getTreatyDocuments().call()).length == 2);
            await contract.methods.appendTreatyDocument(tmpDocument).send({from: globals.existingAccounts[0]});
            assert((await contract.methods.getTreatyDocuments().call()).length == 3);
        });

        it('has working lock', async () => {
            let storageAddress = await createStorage();
            let contract = await tester.createContract(contractNameDictionary.appendableDocumentStorage, storageAddress);
            let tmpDocument = await createDocument('http://appendedDocument.com', '5caf623b2');

            assert(!await contract.methods.isStorageLocked().call());
            await contract.methods.appendTreatyDocument(tmpDocument).send({from: globals.existingAccounts[0]});
            assert(!await contract.methods.isStorageLocked().call());
            await contract.methods.lock().send({from: globals.existingAccounts[0]});
            assert(await contract.methods.isStorageLocked().call());
        });
    });

    describe('Experimental Document Storage', async () => {
        let createStorage = async () => {
            let constructorParameters = [
                //['http://somedocument.com', 'http://somedocument2.com'],
                //['http://somedocument.com'],
                //['a5a6r78e9', 'b56c51a23']
                //[]
                //[], []
                //[1], [2]
                //[web3.utils.toHex('http://somedocument.com')], [web3.utils.toHex('someHash')]
                //['http://somedocument.com', 'http://somedocument2.com', '', '', '', '', '', '', '', ''],
                //['a5a6r78e9', 'b56c51a23', '', '', '', '', '', '', '', '']

                'http://somedocument.com', 'hash1',
                'http://somedocument2.com', 'hash2',
                'http://somedocument3.com', 'hash3',
            ];
            let storageAddress = await tester.easyDeploy(globals.existingAccounts[0], contractNameDictionary.experimentalDocumentStorage, constructorParameters);

            assert(web3.utils.isAddress(storageAddress));

            return storageAddress;
        };

        it('can be deployed', async () => {
            let storageAddress = await createStorage();

            let contract = await tester.createContract(contractNameDictionary.experimentalDocumentStorage, storageAddress);
/*
            let documents  = await contract.methods.treatyDocuments().call();
            assert(documents.length == 2);
            assert(!await contract.methods.isStorageLocked().call());
            */
        });
    });

    describe('UnconditionedValidity', async () => {
        let createUnconditionedValidity = async () => {

            let conditionalValidityAddress = await tester.easyDeploy(globals.existingAccounts[0], contractNameDictionary.unconditionedValidity);

            assert(web3.utils.isAddress(conditionalValidityAddress));

            return conditionalValidityAddress;
        };


        it('can be deployed', async () => {
            let conditionalValidityAddress = await createUnconditionedValidity();

            let contract = await tester.createContract(contractNameDictionary.unconditionedValidity, conditionalValidityAddress);
            assert(await contract.methods.isTreatyValid().call());
        });
    });

    describe('ExpirableValidity', async () => {
        let createExpirableValidity = async (expireAt) => {
            let constructorParameters = [expireAt];
            let conditionalValidityAddress = await tester.easyDeploy(globals.existingAccounts[0], contractNameDictionary.expirableValidity, constructorParameters);

            assert(web3.utils.isAddress(conditionalValidityAddress));

            return conditionalValidityAddress;
        };

        // wait for next block
        let dummyMineBlock = async () => {
            await web3.eth.sendTransaction({
                from: globals.existingAccounts[0],
                to: globals.existingAccounts[1],
                value: web3.utils.toWei("0.01", "ether")
            });
        }

        let getBlockNumber = () => web3.eth.getBlockNumber();

        it('can be deployed', async () => {
            await createExpirableValidity(await getBlockNumber() + 1);
        });

        it('can expire', async () => {
            let conditionalValidityAddress = await createExpirableValidity(await getBlockNumber() + 1);

            let contract = await tester.createContract(contractNameDictionary.expirableValidity, conditionalValidityAddress);
            assert(await contract.methods.isTreatyValid().call());
            await dummyMineBlock();
            assert(!await contract.methods.isTreatyValid().call());
            await dummyMineBlock();
            assert(!await contract.methods.isTreatyValid().call());
        });
    });

    describe('NDA', async () => {
        let createNDA = async () => {
            let createDirector = async (signParties) => {
                let constructorParameters = [signParties];
                return await tester.easyDeploy(globals.existingAccounts[0], contractNameDictionary.multipartySigningDirector, constructorParameters);
            };

            let createStorage = async () => {
                let constructorParameters = [[
                    await createDocument('http://somedocument.com', 'a5a6r78e9'),
                    await createDocument('http://somedocument2.com', 'b56c51a23')
                ]];
                return await tester.easyDeploy(globals.existingAccounts[0], contractNameDictionary.minimalDocumentStorage, constructorParameters);
            };

            let createUnconditionedValidity = async () => {
                return await tester.easyDeploy(globals.existingAccounts[0], contractNameDictionary.unconditionedValidity);
            };

            let signParties = [globals.existingAccounts[0]];

            let constructorParameters = [await createDirector(signParties), await createStorage(), await createUnconditionedValidity()];

            return await tester.easyDeploy(globals.existingAccounts[0], contractNameDictionary.treaty, constructorParameters);
        };

        it('can be deployed', async () => {
            let ndaAddress = await createNDA();
            assert(web3.utils.isAddress(ndaAddress));
        });

        it('has working validation', async () => {
            let ndaAddress = await createNDA();

            let contract = await tester.createContract(contractNameDictionary.treaty, ndaAddress);
            assert(!await contract.methods.isValid().call());

            // TODO: clarify why call() has to be called twice (unregular)
            let signingDirectorAddress = await contract.methods.signingDirector.call().call();
            let directorContract = await tester.createContract(contractNameDictionary.multipartySigningDirector, signingDirectorAddress);
            await directorContract.methods.signTreaty().send({from: globals.existingAccounts[0]});

            assert(await contract.methods.isValid().call());
            assert(await contract.methods.isPartiallyValid(globals.existingAccounts[0]).call());
        });
    });
}
