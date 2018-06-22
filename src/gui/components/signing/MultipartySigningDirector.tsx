import {h, Component} from 'preact';
import AbstractPrintedContract, {AbstractPrintedContractProps, AbstractPrintedContractState} from '../AbstractPrintedContract';
import {web3, solidityTester} from '../../web3Loader';

//import * as styles from './MultipartySigningDirector.css';

export interface MultipartySigningDirectorProps extends AbstractPrintedContractProps {

}

export interface MultipartySigningDirectorState extends AbstractPrintedContractState {
}

export default class MultipartySigningDirector extends AbstractPrintedContract<MultipartySigningDirectorProps, MultipartySigningDirectorState> {

    protected contractTitle = "Signing director";
    protected contractName = "treaty/signing/MultipartySigningDirector:MultipartySigningDirector";

    public constructor(props) {
        super(props);
        this.state = {

        } as MultipartySigningDirectorState;

        this.call_isSignedByAll = this.call_isSignedByAll.bind(this);
        this.call_isSignedByParty = this.call_isSignedByParty.bind(this);
        this.call_signTreaty = this.call_signTreaty.bind(this);
    }

    private async call_isSignedByAll() {
        let isSignedByAll = await this.targetContract.methods.isSignedByAllParties.call().call();

        this.setState({
            lastCallResult: "isSignedByAll: " + isSignedByAll
        });
    }

    private async call_isSignedByParty() {
        let isSignedByParty = await this.targetContract.methods.isSignedByParty(await this.getAccountAddress()).call();

        this.setState({
            lastCallResult: "isSignedByParty: " + isSignedByParty
        });
    }

    private async call_signTreaty() {
        let transactionHash = await this.targetContract.methods.signTreaty().send({from: await this.getAccountAddress()});

        this.setState({
            lastCallResult: "call_signTreaty: ok"
        });
    }

    public renderContract() {
        return <div>
            <div className="btn btn-primary" onClick={this.call_isSignedByAll}>
                isSignedByAll
            </div>

            <div className="btn btn-primary" onClick={this.call_isSignedByParty}>
                isSignedByParty (current account)
            </div>

            <div className="btn btn-primary" onClick={this.call_signTreaty}>
                signTreaty
            </div>
        </div>;
    }
}
