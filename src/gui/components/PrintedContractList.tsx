import {h, Component} from 'preact';
import AbstractPrintedContract from './AbstractPrintedContract';


export interface PrintedContractListProps {
    //printedContracts: AbstractPrintedContract<any, any>[];
    printedContracts: any[];
}

export interface PrintedContractListState {

}

export default class PrintedContractList extends Component<PrintedContractListProps, PrintedContractListState> {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }


    render() {
        return <div>
            {this.props.printedContracts.map((printedContract, index) =>
                printedContract
            )}
        </div>;
    }
}
