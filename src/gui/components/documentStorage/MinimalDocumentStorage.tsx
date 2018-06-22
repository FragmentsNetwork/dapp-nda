import {h, Component} from 'preact';
import AbstractPrintedContract, {AbstractPrintedContractProps, AbstractPrintedContractState} from '../AbstractPrintedContract';
import {web3, solidityTester} from '../../web3Loader';


export interface MinimalDocumentStorageProps extends AbstractPrintedContractProps {

}

export interface MinimalDocumentStorageState extends AbstractPrintedContractState {

}

export default class MinimalDocumentStorage extends AbstractPrintedContract<MinimalDocumentStorageProps, MinimalDocumentStorageState> {

    protected contractTitle: string = "Minimal document storage";
    protected contractName: string = "treaty/documentStorage/MinimalDocumentStorage:MinimalDocumentStorage";

    public constructor(props) {
        super(props);
        this.state = {

        } as MinimalDocumentStorageState;

    }

    public renderContract() {
        return <div>

        </div>;
    }
}
