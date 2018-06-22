import {h, Component} from 'preact';
import {web3, solidityTester} from '../web3Loader';
import promisify from '../../../tests/promisify';

//import * as styles from './AbstractPrintedContract.css';

export interface AbstractPrintedContractProps {
    address: string;
}

export interface AbstractPrintedContractState {
    lastCallResult: any;
}

export default abstract class AbstractPrintedContract<T extends AbstractPrintedContractProps, U extends AbstractPrintedContractState> extends Component<T, U> {

    protected abstract contractTitle: string;
    protected abstract contractName: string;

    protected accountAdrress: string;
    protected targetContract; // contract representation via web3.eth.Contract

    public constructor(props) {
        super(props);
        this.state = {

        } as U;

        this.renderContract = this.renderContract.bind(this);
    }

    public async componentDidMount() {
        //await super.componentDidMount();

        this.targetContract = await solidityTester.createContract(this.contractName, this.props.address);
    }

    protected async getAccountAddress() {
        return (await promisify((cb) => web3.eth.getAccounts(cb)))[0];
    }

    abstract renderContract();

    render() {
        let tmpLastResult = this.state.lastCallResult ? <p>
            {this.state.lastCallResult}
        </p> : '';

        return <div class="col-md-4 mb-3 abstractPrintedContract">
            <div class="card p-3">
                <header class="mb-2">
                    <h2>{this.contractTitle}</h2>
                </header>
                <div>
                    <p>
                        <small>{this.props.address}</small>
                    </p>

                    {this.renderContract()}
                    {tmpLastResult}

                </div>
            </div>
        </div>;
        /*
        return <div className={styles.printedContract}>
            <div className={styles.contractName}>{this.contractTitle}</div>
            <div>{this.props.address}</div>

            {this.renderContract()}
            {tmpLastResult}

        </div>;
        */
    }
}
