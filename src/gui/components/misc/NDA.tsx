import {h, Component} from 'preact';
import AbstractPrintedContract, {AbstractPrintedContractProps, AbstractPrintedContractState} from '../AbstractPrintedContract';
import {web3, solidityTester} from '../../web3Loader';

//import * as styles from './NDA.css';


export interface DNAProps extends AbstractPrintedContractProps {

}

export interface DNAState extends AbstractPrintedContractState {

}

export default class DNA extends AbstractPrintedContract<DNAProps, DNAState> {

    protected contractTitle: string = "NDA";
    protected contractName: string = "treaty/NDA:NDA";

    public constructor(props) {
        super(props);
        this.state = {

        } as DNAState;

        this.call_isValid = this.call_isValid.bind(this);
    }

    // TODO: create generic call
    private async call_isValid() {
        this.setState({
            lastCallResult: "isValid: " + await this.targetContract.methods.isValid().call()
        });
    }

    public renderContract() {
        return <div>
            <div className="btn btn-primary" onClick={this.call_isValid}>
                isValid
            </div>
        </div>;
    }
}
