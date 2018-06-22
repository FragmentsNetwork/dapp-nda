import {h, Component} from 'preact';
import {web3, solidityTester} from '../../web3Loader';
import promisify from '../../../../tests/promisify';
import contractNameDictionary from '../../../../tests/contractNameDictionary';
import {extractDocuments} from '../common';
import ipfsDownloader from '../ipfsDownloader';

//import * as styles from './annotatorDemo.css';

export type ethAddress = string;

export interface AnnotatorDemoProps {
    agreementAddress: ethAddress;
}

export interface AnnotatorDemoState {
    userAddress: ethAddress;
    invalidAddress: boolean;
    errorDuringSigning: boolean;
    printedAgreement: {
        contract: any;
        documents: any[];
        userIsSignParty: boolean;
        userAlreadySigned: boolean;
    };
}

export default class AnnotatorDemo extends Component<AnnotatorDemoProps, AnnotatorDemoState> {

    public constructor(props) {
        super(props);
        this.state = {
            invalidAddress: true,
        } as AnnotatorDemoState;

        this.renderSigningParty = this.renderSigningParty.bind(this);
        this.renderNotSigningParty = this.renderNotSigningParty.bind(this);
        this.renderInvalidAddress = this.renderInvalidAddress.bind(this);
        this.renderDeployedAgreement = this.renderDeployedAgreement.bind(this);
    }

    public async componentDidMount() {
        if (!web3.utils.isAddress(this.props.agreementAddress)) {
            return;
        }

        let treatyContract = await solidityTester.createContract(contractNameDictionary['oneClickTreaty'], this.props.agreementAddress);
        let documentCount = await treatyContract.methods.treatyDocumentCount().call();

        let userAddress = (await promisify((cb) => web3.eth.getAccounts(cb)))[0];

        this.setState({
            userAddress: userAddress,
            invalidAddress: false,
            printedAgreement: {
                contract: treatyContract,
                documents: await extractDocuments(treatyContract),
                userIsSignParty: await treatyContract.methods.isSignParty(userAddress).call(),
                userAlreadySigned: await treatyContract.methods.isSignedByParty(userAddress).call(),
            }
        });
    }

    public renderDeployedAgreement() {
        const listDocuments = (documents) => {
            const downloadIpfsFile = (hash) => (e) => {
                e.preventDefault();
                ipfsDownloader(hash);
            };

            // not sure why toString() is required but doesnt work anyway...
            const isIpfsLink = (uri) => uri.toString().startsWith('/ipfs/');
            const linkHttp = (uri) => <a href={uri}>{uri}</a>;
            const linkIpfs = (uri) => <a href={"https://ipfs.io" + uri} onClick={downloadIpfsFile(uri)}>{uri}</a>;



            let resultDocuments = documents.map((item, index) => {
                return <div class="mb-4">
                    <header>
                        <h3 class="mb-0">Document #{index + 1}</h3>
                        <p class="mb-0"><small>Hash: {item.hash}</small></p>
                    </header>
                    <p class="mb-0"><a href="">{isIpfsLink(item.uri) ? linkIpfs(item.uri) : linkHttp(item.uri)}</a></p>
                </div>;
            });

            return resultDocuments;

            //[...Array.from(Array(targetCount).keys())]
        }

        const link = window.location.href.replace('taskRequesterDemo.html', 'annotatorDemo.html?address=' + this.props.agreementAddress);

        const signingRender = this.state.printedAgreement.userIsSignParty ? this.renderSigningParty : this.renderNotSigningParty;

        return <div>

            <div class="py-2">
                <p class="mb-0">Contract have been deployed at address <br /><small>{this.props.agreementAddress}</small></p>
            </div>

            <hr />

            <div class="py-2">
                <header class="mb-3">
                    <h2>Documents</h2>
                </header>

                {listDocuments(this.state.printedAgreement.documents)}
            </div>

            <hr />

            <div class="py-2">
                <header class="mb-2">
                    <h2>Sign the agreement</h2>
                </header>

                <p class="mb-0">Contract can be signed by: <strong>anybody</strong>.</p>

                {signingRender()}
            </div>

        </div>;
    }

    public renderSigningParty() {
        const signTreaty = async () => {

            //await this.state.printedAgreement.contract.methods.signTreaty().send({from: this.state.userAddress});
            let tmp = this.state.printedAgreement.contract.methods.signTreaty().send({from: this.state.userAddress});
            tmp.then(() => {
                this.setState({
                    errorDuringSigning: false,
                    printedAgreement: {
                        ...this.state.printedAgreement,
                        userAlreadySigned: true
                    }
                });
            }).catch(() => {
                this.setState({
                    errorDuringSigning: true
                });
            });
        };

        const ableToSign = () => {
            let mbError;
            if (this.state.errorDuringSigning) {
                mbError = <p>
                    Error occured during singing the agreement. Please try again
                </p>
            }

            return <div class="py-2">
                <p>If you agree with relevant documents you can sign the agreement here.</p>

                <div class="btn btn-primary" onClick={signTreaty}>Sign the agreement</div>

                {mbError}
            </div>;
        };

        const alreadySigned = () => <div>
            You have already signed this contract.
        </div>;


        return <div>
            You are signing party of this contract.

            <hr />

            {this.state.printedAgreement.userAlreadySigned ? alreadySigned() : ableToSign()}
        </div>
    }

    public renderNotSigningParty() {
        return <div>You are <strong>not</strong> a signing party of this agreement.</div>;
    }

    public renderInvalidAddress() {
        return <div>
            <h2>Invalid contract address</h2>
            <p>
                <small>{this.props.agreementAddress}</small>
            </p>

            <p>
                Please check URL for typos.
            </p>
        </div>;
    }

    public render() {
        let innerRender = this.state.invalidAddress ? this.renderInvalidAddress : this.renderDeployedAgreement;

        return <main class="site-main" role="main">
            <section class="annotator pt-5">
                <div class="container">
                    <div class="row">

                        <div class="col-md-7">

                            <div class="card p-5">

                                <div class="pb-2">
                                    <header>
                                        <h1>Fragments NDA demo</h1>
                                    </header>

                                    <p>This demo shows details of NDA Agreement and enables signing party to sign the agreement.</p>
                                </div>

                                <hr />

                                {innerRender()}
                            </div>

                        </div>


                    </div>
                </div>
            </section>
        </main>;
    }
}
