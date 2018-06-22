import {h, Component} from 'preact';


export interface InputListPrinterProps {
    onListChange(constructorParameters: any[]): void;
    onInputCreate?(input: JSX.Element, index: number): JSX.Element;
    //tmp(): {[string: any]};
}

export interface InputListPrinterState {
    list: string[];
}


export default class InputListPrinter extends Component<InputListPrinterProps, InputListPrinterState> {

    public constructor(props) {
        super(props);
        this.state = {
            list: [] as any[]
        };

    }

    public refreshList(index, newValue) {
        // delete
        if (!newValue) {
            return this.state.list.filter((party, tmpIndex) => index != tmpIndex);
        }

        // append
        if (!this.state.list[index]) {
            return this.state.list.concat([newValue]);
        }

        // modify
        return this.state.list.map((value, tmpIndex) => tmpIndex == index ? newValue : value);
    }

    public listChanged = (index) => (event) => {
        let value = event.target.value.trim();

        this.setState({
            list: this.refreshList(index, value)
        });
        this.props.onListChange(this.state.list);
    }

    public render() {
        let withExtraField = this.state.list.concat([""]);

        return <div>
            {withExtraField.map((signingParty, index) => {
                let cssClass = "form-control" + (index < withExtraField.length - 1 ? " repetitiveInput" : "");
                let input = <input
                    value={this.state.list[index]}
                    onChange={this.listChanged(index)}
                    class={cssClass}
                />;

                if (this.props.onInputCreate) {
                    return this.props.onInputCreate(input, index);
                }

                return input;
            })}
        </div>;
    }
}
