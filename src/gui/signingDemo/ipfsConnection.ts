const IpfsApi = require('ipfs-api');

const ipfs = new IpfsApi({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export default ipfs;
