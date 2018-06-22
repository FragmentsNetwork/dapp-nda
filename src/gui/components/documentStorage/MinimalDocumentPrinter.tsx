import {h, Component} from 'preact';


export interface MinimalDocumentPrinterProps {
    onConstructorChange(constructorParameters: any[]): void;
}

export interface MinimalDocumentPrinterState {
    uri: string;
    hash: string;
}


export default class MinimalDocumentPrinter extends Component<MinimalDocumentPrinterProps, MinimalDocumentPrinterState> {

    public constructor(props) {
        super(props);
        this.state = {
            uri: "",
            hash: ""
        };

        this.onParameterChange = this.onParameterChange.bind(this);
    }

    private onParameterChange = (parameterName: string) => (event) => {
        this.setState({
            [parameterName]: "" + event.target.value.trim()
        } as any);

        this.checkConstructorChange();
    }

    private checkConstructorChange() {
        if (this.state.uri && this.state.hash) {
            this.props.onConstructorChange([this.state.uri, this.state.hash]);
        }
    }

    public render() {
        return <div>

            <div class="form-group">
                <label for="">Uri:</label>
                <input
                    value={this.state.uri}
                    onChange={this.onParameterChange("uri")}
                    placeholder="http://domain.com/myDocument"
                    class="form-control"
                />
            </div>

            <div class="form-group">
                <label for="">Hash:</label>
                <input
                    value={this.state.hash}
                    onChange={this.onParameterChange("hash")}
                    placeholder="4c8f18581c0167eb90a761b4a304e009b924f03b619a0c0e8ea3adfce20aee64" // some random hash
                    class="form-control"
                />
            </div>

        </div>;
    }
}
