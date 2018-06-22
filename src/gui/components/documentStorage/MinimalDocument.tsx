import {h, Component} from 'preact';
import AbstractPrintedContract, {AbstractPrintedContractProps, AbstractPrintedContractState} from '../AbstractPrintedContract';
import {web3, solidityTester} from '../../web3Loader';


export interface MinimalDocumentProps extends AbstractPrintedContractProps {

}

export interface MinimalDocumentState extends AbstractPrintedContractState {

}

export default class MinimalDocument extends AbstractPrintedContract<MinimalDocumentProps, MinimalDocumentState> {

    protected contractTitle: string = "Minimal Document";
    protected contractName: string = "treaty/documentStorage/MinimalDocument:MinimalDocument";

    public constructor(props) {
        super(props);
        this.state = {

        } as MinimalDocumentState;

    }

    public renderContract() {
        return <div>

        </div>;
    }
}
