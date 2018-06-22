import {h, Component} from 'preact';


export interface ExpirableValidityPrinterProps {
    onConstructorChange(constructorParameters: any[]): void;
}

export interface ExpirableValidityPrinterState {
    expireBlockNumber: number;
}


export default class ExpirableValidityPrinter extends Component<ExpirableValidityPrinterProps, ExpirableValidityPrinterState> {

    public constructor(props) {
        super(props);
        this.state = {
            expireBlockNumber: 0
        };

        this.expirationChanged = this.expirationChanged.bind(this);
    }

    private expirationChanged(event) {
        let value = parseInt(event.target.value.trim());

        this.setState({
            expireBlockNumber: value
        });
        this.props.onConstructorChange([value]);
    }

    public render() {
        return <div>
            <div class="form-group">
                <label for="">Experation [after X blocks]:</label>
                <input
                    value={this.state.expireBlockNumber.toString()}
                    onChange={this.expirationChanged}
                    placeholder="42..."
                    class="form-control"
                />
            </div>

        </div>;
    }
}
