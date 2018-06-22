import {h, Component} from 'preact';
import {web3, solidityTester} from '../web3Loader';
import promisify from '../../../tests/promisify';
import contractNameDictionary from '../../../tests/contractNameDictionary';

//import * as styles from './GenericContractPrinter.css';

export interface PrinterBuilder {
    title: string;
    //class: typeof Component
    guiClass: any;
    builderClass: any;
    compiledContractName: string;
}

export interface PrinterProps {
    name: string;
    onContractPrint(contractAddress: string, guiClass: string): void;
    builders: PrinterBuilder[];
}

export interface PrinterState {
    selectedBuilder: number;
    constructorParameters: any[];
}

export default class GenericContractPrinter extends Component<PrinterProps, PrinterState> {

    constructor(props) {
        super(props);
        this.state = {
            //...this.state,
            selectedBuilder: 0,
            constructorParameters: []
        } as PrinterState;


        this.onConstructorChange = this.onConstructorChange.bind(this);
        this.onBuilderSelect = this.onBuilderSelect.bind(this);
        this.buildContract = this.buildContract.bind(this);
    }

    private getSelectedBuilder() {
        return this.props.builders[this.state.selectedBuilder];
    }

    private onBuilderSelect(event) {
        this.setState({
            selectedBuilder: event.target.value as number,
            constructorParameters: []
        });
    }

    private onConstructorChange(newConstructorParameters: any[]) {
        this.setState({
            constructorParameters: newConstructorParameters
        });
    }

    private async buildContract() {
        let selectedBuilder = this.getSelectedBuilder();
//return this.props.onContractPrint("0x627306090abaB3A6e1400e9345bC60c78a8BEf57", this.getSelectedBuilder().guiClass);
        let creatorAddress = (await promisify((cb) => web3.eth.getAccounts(cb)))[0];
        console.log(creatorAddress, this.state.constructorParameters)
        let directorAddress = await solidityTester.easyDeploy(creatorAddress, contractNameDictionary[selectedBuilder.compiledContractName], this.state.constructorParameters)
            .catch((e) => {
                if (("" + e).includes('User denied transaction signature')) {
                    return;
                }
                throw e;
            })

        if (directorAddress) {
            this.props.onContractPrint(directorAddress, selectedBuilder.guiClass);
        }
        //TODO: fail handeling?
    }

    render() {
        const selectBoxOption = (item, index) => <option value={index}>{item.title}</option>;
        const selectBoxOptions = (options) => options.map(selectBoxOption).reduce((accumulator, item) => [accumulator, item]);

        let BUILDER = this.getSelectedBuilder().builderClass;

        return <div class="col-md-4 mb-3">
            <div class="card p-3">
                <header class="mb-2">
                    <h2>{this.props.name}</h2>
                </header>
                <div>
                    <div class="form-group">
                        <label for="">Select type:</label>
                        <select class="custom-select" onChange={this.onBuilderSelect}>
                            {selectBoxOptions(this.props.builders)}
                        </select>
                    </div>

                    <BUILDER onConstructorChange={this.onConstructorChange} />

                    {/*
                    <div class="form-group">
                        <label for="">Contructor Parameters</label>
                        <input type="text" class="form-control" id="" placeholder="0x627306090abaB3A6e1400e9345bC60c78a8BEf57" />
                    </div>
                    */}
                    <div class="form-group">
                        <div class="btn btn-primary mt-3" onClick={this.buildContract}>Create and sign transaction</div>
                    </div>
                </div>
            </div>
        </div>;
    }
}
