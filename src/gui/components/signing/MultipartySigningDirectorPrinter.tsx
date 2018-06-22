import {h, Component} from 'preact';
import InputList from '../misc/InputList';


export interface MultipartySigningDirectorPrinterProps {
    onConstructorChange(constructorParameters: any[]): void;
}

export interface MultipartySigningDirectorPrinterState {

}


export default class MultipartySigningDirectorPrinter extends Component<MultipartySigningDirectorPrinterProps, MultipartySigningDirectorPrinterState> {

    public constructor(props) {
        super(props);
        this.state = {

        };
        this.onListChange = this.onListChange.bind(this);
    }

    private onListChange(list) {
        this.props.onConstructorChange([list]);
    }

    public render() {
        const onInputCreate = (input, index) => {
            input.attributes.placeholder = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57';

            return input;
        };

        return <div>
            <div class="form-group">
                <label for="">Signing parties:</label>
                <InputList
                    onListChange={this.onListChange}
                    onInputCreate={onInputCreate}
                />
            </div>

        </div>;
    }
}
