import {h, Component} from 'preact';
import AbstractPrintedContract, {AbstractPrintedContractProps, AbstractPrintedContractState} from '../AbstractPrintedContract';

export default abstract class EmptyComponent extends AbstractPrintedContract<AbstractPrintedContractProps, AbstractPrintedContractState> {

    public renderContract() {
        return <div></div>;
    }
}
