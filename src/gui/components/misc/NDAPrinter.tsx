import {h, Component} from 'preact';


export interface NDAPrinterProps {
    onConstructorChange(constructorParameters: any[]): void;
}

export interface NDAPrinterState {
    signingDirector: string;
    documentStorage: string;
    conditionalValidity: string;
}


export default class NDAPrinter extends Component<NDAPrinterProps, NDAPrinterState> {

    public constructor(props) {
        super(props);
        this.state = {
            signingDirector: "",
            documentStorage: "",
            conditionalValidity: "",
        };

        this.onParameterChange = this.onParameterChange.bind(this);
    }

    private onParameterChange = (parameterName) => (event) => {
        this.setState({
            [parameterName]: event.target.value.trim()
        } as any);

        this.checkConstructorChange();
    }

    private checkConstructorChange() {
        if (this.state.signingDirector && this.state.documentStorage && this.state.conditionalValidity) {
            this.props.onConstructorChange([this.state.signingDirector, this.state.documentStorage, this.state.conditionalValidity]);
        }
    }

    public render() {
        return <div>

            <div class="form-group">
                <label for="">Signing Director:</label>
                <input
                    value={this.state.signingDirector}
                    onChange={this.onParameterChange("signingDirector")}
                    placeholder="0x627306090abaB3A6e1400e9345bC60c78a8BEf57"
                    class="form-control"
                />
            </div>

            <div class="form-group">
                <label for="">Document Storage:</label>
                <input
                    value={this.state.documentStorage}
                    onChange={this.onParameterChange("documentStorage")}
                    placeholder="0x627306090abaB3A6e1400e9345bC60c78a8BEf57" // some random hash
                    class="form-control"
                />
            </div>

            <div class="form-group">
                <label for="">Conditional Validity:</label>
                <input
                    value={this.state.conditionalValidity}
                    onChange={this.onParameterChange("conditionalValidity")}
                    placeholder="0x627306090abaB3A6e1400e9345bC60c78a8BEf57" // some random hash
                    class="form-control"
                />
            </div>

        </div>;
    }
}
