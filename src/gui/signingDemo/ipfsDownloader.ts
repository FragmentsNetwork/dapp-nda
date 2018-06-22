import ipfs from './ipfsConnection';

export default function ipfsDownloader(hash) {
    let downloadPromise = new Promise(function(resolve, reject) {
        /*
        ipfs.files.get(hash, (error, result) => {
            console.log(error, result)
        })
        ipfs.ls(hash, (error, result) => {
            console.log(error, result)
        })
        */
        ipfs.files.cat(hash, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });

    downloadPromise.then((result: any[]) => {
        var a = window.document.createElement('a');
        //a.href = window.URL.createObjectURL(new Blob(['Test,Text'], {type: 'text/csv'}));
        a.href = window.URL.createObjectURL(new Blob([result.toString()]));
        a.download = hash + '.md';

        // Append anchor to body.
        document.body.appendChild(a);
        a.click();

        // Remove anchor from body
        document.body.removeChild(a);

    });

    return downloadPromise;
}
