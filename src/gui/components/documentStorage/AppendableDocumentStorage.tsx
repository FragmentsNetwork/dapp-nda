import {h, Component} from 'preact';
import AbstractPrintedContract, {AbstractPrintedContractProps, AbstractPrintedContractState} from '../AbstractPrintedContract';
import {web3, solidityTester} from '../../web3Loader';


export interface AppendableDocumentStorageProps extends AbstractPrintedContractProps {

}

export interface AppendableDocumentStorageState extends AbstractPrintedContractState {

}

export default class AppendableDocumentStorage extends AbstractPrintedContract<AppendableDocumentStorageProps, AppendableDocumentStorageState> {

    protected contractTitle: string = "Appendable Document Storage";
    protected contractName: string = "treaty/documentStorage/AppendableDocumentStorage:AppendableDocumentStorage";

    public constructor(props) {
        super(props);
        this.state = {

        } as AppendableDocumentStorageState;
    }

    public renderContract() {
        return <div>

        </div>;
    }
}
