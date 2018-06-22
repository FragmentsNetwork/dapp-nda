import {h, Component} from 'preact';


export interface EmptyComponentPrinterProps {
    onConstructorChange(string): void;
}

export interface EmptyComponentPrinterState {

}


export default class EmptyComponentPrinter extends Component<EmptyComponentPrinterProps, EmptyComponentPrinterState> {

    public render() {
        return <div>
        </div>;
    }
}
