
export const extractDocuments = async (contract) => {
    let documentCount = await contract.methods.treatyDocumentCount().call();
    documentCount = parseInt(documentCount); // needed for Array.from... to work

console.log(documentCount, [...Array.from(Array(parseInt(documentCount)).keys())], [...Array.from(Array(3).keys())])
    let documentPromises = [...Array.from(Array(documentCount).keys())].map(async(dummy, index) => {
        return await contract.methods.treatyDocuments(index).call();
    });
console.log(documentPromises);
    let results = await Promise.all(documentPromises);
    console.log(results);

    return results;
    //return [];

    //let documentAddresses = await contract.methods.treatyDocuments(0).call();
    //return [];
/*
    let documentPromises = documentAddresses.map(async (address, index) => {
        let documentContract = await solidityTester.createContract(contractNameDictionary['minimalDocument']);

        let result = {
            uri: await documentContract.methods.uri().call(),
            hash: await documentContract.methods.hash().call()
        };

        return result;
    });


    return Promise.all(documentPromises);
*/
};
