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
    }

    public render() {

        return <div>

        </div>;
    }
}
