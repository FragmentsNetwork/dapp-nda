import {h, Component} from 'preact';
import AbstractPrintedContract, {AbstractPrintedContractProps, AbstractPrintedContractState} from '../AbstractPrintedContract';
import {web3, solidityTester} from '../../web3Loader';


export interface MultiOriginDocumentProps extends AbstractPrintedContractProps {

}

export interface MultiOriginDocumentState extends AbstractPrintedContractState {

}

export default class MultiOriginDocument extends AbstractPrintedContract<MultiOriginDocumentProps, MultiOriginDocumentState> {

    protected contractTitle: string = "Multi Origin Document";
    protected contractName: string = "treaty/documentStorage/MultiOriginDocument:MultiOriginDocument";

    public constructor(props) {
        super(props);
        this.state = {

        } as MultiOriginDocumentState;

    }

    public renderContract() {
        return <div>

        </div>;
    }
}
