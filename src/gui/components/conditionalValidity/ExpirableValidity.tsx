import {h, Component} from 'preact';
import AbstractPrintedContract, {AbstractPrintedContractProps, AbstractPrintedContractState} from '../AbstractPrintedContract';
import {web3, solidityTester} from '../../web3Loader';
import promisify from '../../../../tests/promisify';


export interface ExpirableValidityProps extends AbstractPrintedContractProps {

}

export interface ExpirableValidityState extends AbstractPrintedContractState {

}

export default class ExpirableValidity extends AbstractPrintedContract<ExpirableValidityProps, ExpirableValidityState> {

    protected contractTitle: string = "Expirable validity";
    protected contractName: string = "treaty/conditionalValidity/ExpirableValidity:ExpirableValidity";

    public constructor(props) {
        super(props);
        this.state = {

        } as ExpirableValidityState;

        this.call_isTreatyValid = this.call_isTreatyValid.bind(this);
    }

    // TODO: create generic call
    private async call_isTreatyValid() {
        this.setState({
            lastCallResult: "isTreatyValid: " + await this.targetContract.methods.isTreatyValid().call()
        });
    }

    public renderContract() {
        return <div>
            <div class="btn btn-primary" onClick={this.call_isTreatyValid}>
                isTreatyValid
            </div>
        </div>;
    }
}
