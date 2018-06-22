import {h, Component} from 'preact';
import {web3, solidityTester} from '../../web3Loader';
import promisify from '../../../../tests/promisify';
import contractNameDictionary from '../../../../tests/contractNameDictionary';
import {extractDocuments} from '../common';
import IpfsUploader from './IpfsUploader';

//import * as styles from './taskRequester.css';

export interface TaskRequesterDemoProps {

}

export interface FormDocument {
    uri: string,
    hash: string
}

export interface TaskRequesterDemoState {
    formDocuments: FormDocument[];
    printedAgreement: {
        address: string;
        documents: any[];
    };
}

export default class TaskRequesterDemo extends Component<TaskRequesterDemoProps, TaskRequesterDemoState> {

    // this is part of workaround for not (yet) working features of web3/solidity
    private documentMax = 3;

    public constructor(props) {
        super(props);
        this.state = {
            formDocuments: [],
            printedAgreement: {}
        } as TaskRequesterDemoState;

        this.deployAgreement = this.deployAgreement.bind(this);
        this.onDocumentChange = this.onDocumentChange.bind(this);
        this.onDocumentUpload = this.onDocumentUpload.bind(this);
    }

    private async deployAgreement() {
        let creatorAddress = (await promisify((cb) => web3.eth.getAccounts(cb)))[0];


        let constructorParameters:any = [this.state.formDocuments];

        constructorParameters = [
            "", "",
            "", "",
            "", "",
        ];
        this.state.formDocuments.map((item, index) => {
            constructorParameters[index * 2] = item.uri;
            constructorParameters[index * 2 + 1] = item.hash;
        });


        let agreementAddress = await solidityTester.easyDeploy(creatorAddress, contractNameDictionary['oneClickTreaty'], constructorParameters)
            .catch((e) => {
                if (("" + e).includes('User denied transaction signature')) {
                    return;
                }
                throw e;
            })

        if (agreementAddress) {
            this.onContractPrint(agreementAddress);
        }
    }

    private async onContractPrint(agreementAddress) {
        let treatyContract = await solidityTester.createContract(contractNameDictionary['oneClickTreaty'], agreementAddress);

        this.setState({
            printedAgreement: {
                address: agreementAddress,
                documents: await extractDocuments(treatyContract)
            }
        });
    }

    public renderDeployedAgreement(agreementAddress) {
        /*
        const listDocuments = (documents) => {

            return documents.map((item, index) => {
                return <div>
                    Document #{index} <br />
                    {item.uri}<br />
                    {item.hash}
                </div>;
            });

            //[...Array.from(Array(targetCount).keys())]
        }

        <br />
        Contract can be signed by anybody and contains following documents:

        {listDocuments(this.state.printedAgreement.documents)}
        */

        const link = window.location.href.replace('taskRequesterDemo.html', 'annotatorDemo.html?address=' + agreementAddress);



        return <div>
            <div class="mt-4">
                <p>Your contract have been deployed at address <br /> <span class="text-small">{agreementAddress}</span></p>

                <p class="mb-0">It can be reviewed and signed at <a href={link}>{link}</a></p>
            </div>

            <hr />
        </div>;
    }

    private onDocumentChange = (documentProperty, inputIndex) => (e) => {
        const getNewDocuments = (newValue) => {
            if (inputIndex >= this.state.formDocuments.length) {
                let tmp = {
                    uri: "",
                    hash: ""
                };
                tmp[documentProperty] = newValue;

                return this.state.formDocuments.concat([tmp]);
            }

            let newDocuments = this.state.formDocuments.map((item, index) => {
                if (index != inputIndex) {
                    return item;
                }

                return {...item, [documentProperty]: newValue}
            });

            if (newValue) {
                return newDocuments;
            }

            // !newValue
            if (!newDocuments[inputIndex].uri && !newDocuments[inputIndex].hash) {
                newDocuments = newDocuments.filter((dummy, index) => index != inputIndex);
            }

            return newDocuments;
        };

        this.setState({
            formDocuments: getNewDocuments(e.target.value.trim())
        });
    }

    private onDocumentUpload(documentUrl, hash) {
        if (this.state.formDocuments.length >= this.documentMax) {
            return;
        }

        let tmp = {
            uri: documentUrl,
            hash: hash
        };

        this.setState({
            formDocuments: this.state.formDocuments.concat([tmp])
        });
    }

    public render() {
        const documentInputs = (targetCount) => {
            return [...Array.from(Array(targetCount).keys())].map((dummy, index) => {
                let tmpDocument = (this.state.formDocuments[index] || {} as FormDocument)
                return <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for={"uri-" + index}>URI</label>
                            <input type="text" class="form-control" id={"uri-" + index} onChange={this.onDocumentChange("uri", index)} value={tmpDocument.uri} />
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for={"document-hash-" + index}>Document hash</label>
                            <input type="text" class="form-control" id={"document-hash-" + index} onChange={this.onDocumentChange("hash", index)} value={tmpDocument.hash} />
                        </div>
                    </div>
                </div>;
            });
        };

        const inputCount = Math.min(this.state.formDocuments.length + 1, this.documentMax);
        const maximumWarning = () => {
            if (inputCount != this.documentMax) {
                return;
            }

            return <small class="form-text text-muted">
                Due to current limitations of Web3js project we only support three documents maximum in this demo.
            </small>;
        }

        const IPFS_UPLOADER = IpfsUploader;

        return <main class="site-main" role="main">
            <section class="task-requester pt-5">
                <div class="container">
                    <div class="row">

                        <div class="col-md-7">

                            <div class="card p-5">
                                <form action="">

                                    <div class="pb-3">
                                        <header>
                                            <h1>Fragments NDA demo</h1>
                                        </header>

                                        <p class="mb-0">This demo creates an NDA Agreement that can include several documents and can be signed by any party. Validity can be checked for each individual party.</p>
                                    </div>

                                    <hr />

                                    <div class="py-3">
                                        <header class="mb-3">
                                            <h2>Upload documents to IPFS: (optional)</h2>
                                        </header>

                                        <IPFS_UPLOADER onDocumentUpload={this.onDocumentUpload} />
                                    </div>

                                    <hr />

                                    <div class="py-3">
                                        <header class="mb-3">
                                            <h2>Documents</h2>
                                        </header>

                                        {documentInputs(inputCount)}

                                        {maximumWarning()}
                                    </div>

                                    <hr />

                                    <div class="py-3">
                                        <div class="row">
                                            <div class="col">
                                                <header>
                                                    <h2>Signing Parties</h2>
                                                </header>
                                                <p class="text-muted mb-0">Anybody can sign.</p>
                                            </div>
                                            <div class="col">
                                                <header>
                                                    <h2>Conditional Validity</h2>
                                                </header>
                                                <p class="text-muted mb-0">Unconditioned Validity.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <hr />

                                    <div class="py-3">
                                        <div class="btn btn-primary" onClick={this.deployAgreement}>Create agreement</div>

                                        {this.state.printedAgreement.address ? this.renderDeployedAgreement(this.state.printedAgreement.address) : ''}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>;
    }
}
