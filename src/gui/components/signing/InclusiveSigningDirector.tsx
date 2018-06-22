import {h, Component} from 'preact';
import AbstractPrintedContract, {AbstractPrintedContractProps, AbstractPrintedContractState} from '../AbstractPrintedContract';
import {web3, solidityTester} from '../../web3Loader';

//import * as styles from './MultipartySigningDirector.css';

export interface InclusiveSigningDirectorProps extends AbstractPrintedContractProps {

}

export interface InclusiveSigningDirectorState extends AbstractPrintedContractState {
}

export default class InclusiveSigningDirector extends AbstractPrintedContract<InclusiveSigningDirectorProps, InclusiveSigningDirectorState> {

    protected contractTitle = "Signing director";
    protected contractName = "treaty/signing/InclusiveSigningDirector:InclusiveSigningDirector";

    public constructor(props) {
        super(props);
        this.state = {

        } as InclusiveSigningDirectorState;

        this.call_isSignedByParty = this.call_isSignedByParty.bind(this);
        this.call_signTreaty = this.call_signTreaty.bind(this);
    }

    private async call_isSignedByParty() {
        let isSignedByAll = await this.targetContract.methods.isSignedByParty(await this.getAccountAddress()).call();

        this.setState({
            lastCallResult: "isSignedByParty: " + isSignedByAll
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
            <div className="btn btn-primary" onClick={this.call_isSignedByParty}>
                isSignedByParty (current account)
            </div>

            <div className="btn btn-primary" onClick={this.call_signTreaty}>
                signTreaty
            </div>
        </div>;
    }
}
