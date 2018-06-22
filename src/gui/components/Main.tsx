import {h, Component} from 'preact';
//import SigningDirector from './signing/SigningDirector';
import PrintedContractList from './PrintedContractList';

import GenericContractPrinter from './GenericContractPrinter';
import AbstractPrintedContract from './AbstractPrintedContract';
import MultipartySigningDirector from './signing/MultipartySigningDirector';
import MultipartySigningDirectorPrinter from './signing/MultipartySigningDirectorPrinter';
import InclusiveSigningDirector from './signing/InclusiveSigningDirector';
import InclusiveSigningDirectorPrinter from './signing/InclusiveSigningDirectorPrinter';
import UnconditionedValidity from './conditionalValidity/UnconditionedValidity';
import UnconditionedValidityPrinter from './conditionalValidity/UnconditionedValidityPrinter';
import ExpirableValidity from './conditionalValidity/ExpirableValidity';
import ExpirableValidityPrinter from './conditionalValidity/ExpirableValidityPrinter';
import MinimalDocument from './documentStorage/MinimalDocument';
import MinimalDocumentPrinter from './documentStorage/MinimalDocumentPrinter';
import MultiOriginDocument from './documentStorage/MultiOriginDocument';
import MultiOriginDocumentPrinter from './documentStorage/MultiOriginDocumentPrinter';
import MinimalDocumentStoragePrinter from './documentStorage/MinimalDocumentStoragePrinter';
import MinimalDocumentStorage from './documentStorage/MinimalDocumentStorage';
import AppendableDocumentStoragePrinter from './documentStorage/AppendableDocumentStoragePrinter';
import AppendableDocumentStorage from './documentStorage/AppendableDocumentStorage';
import NDAPrinter from './misc/NDAPrinter';
import NDA from './misc/NDA';

//import * as styles from './main.css';


export interface PrintedContract {
    address: string;
    //class: AbstractPrintedContract<any, any>;
    guiClass: any;
}

export interface MainProps {

}

export interface MainState {
    //printedContracts: string[];
    printedContracts: PrintedContract[];
}

export default class Main extends Component<MainProps, MainState> {

    constructor(props) {
        super(props);
        this.state = {
            printedContracts: []
        };

        this.onContractPrint = this.onContractPrint.bind(this);
    }

    onContractPrint(contractAddress, guiClass) {
        this.setState({
            printedContracts: this.state.printedContracts.concat([{
                address: contractAddress,
                guiClass: guiClass
            }])
        });
    }

    render() {
        // TODO: if it keeps being so heterogenous generate objects from class names
        const builders = {
            director: [
                {
                    title: 'Multiparty Signing Director',
                    builderClass: MultipartySigningDirectorPrinter,
                    guiClass: MultipartySigningDirector,
                    compiledContractName: 'multipartySigningDirector'
                }, {
                    title: 'Inclusive Signing Director',
                    builderClass: InclusiveSigningDirectorPrinter,
                    guiClass: InclusiveSigningDirector,
                    compiledContractName: 'inclusiveSigningDirector'
                }
            ],
            conditionalValidity: [
                {
                    title: 'Unconditional Validity',
                    builderClass: UnconditionedValidityPrinter,
                    guiClass: UnconditionedValidity,
                    compiledContractName: 'unconditionedValidity'
                }, {
                    title: 'Expirable Validity',
                    builderClass: ExpirableValidityPrinter,
                    guiClass: ExpirableValidity,
                    compiledContractName: 'expirableValidity',
                }
            ],
            document: [
                {
                    title: 'Minimal Document',
                    builderClass: MinimalDocumentPrinter,
                    guiClass: MinimalDocument,
                    compiledContractName: 'minimalDocument'
                }, {
                    title: 'Multi Origin Document',
                    builderClass: MultiOriginDocumentPrinter,
                    guiClass: MultiOriginDocument,
                    compiledContractName: 'multiOriginDocument'
                }
            ],
            documentStorage: [
                {
                    title: 'Minimal Document Storage',
                    builderClass: MinimalDocumentStoragePrinter,
                    guiClass: MinimalDocumentStorage,
                    compiledContractName: 'minimalDocumentStorage'
                }, {
                    title: 'Appendable Document',
                    builderClass: AppendableDocumentStoragePrinter,
                    guiClass: AppendableDocumentStorage,
                    compiledContractName: 'appendableDocumentStorage'
                }
            ],
            treaty: [
                {
                    title: 'NDA',
                    builderClass: NDAPrinter,
                    guiClass: NDA,
                    compiledContractName: 'treaty'
                }
            ]
        }


        let printedContracts = this.state.printedContracts.map((item) => {
            let TMP = item.guiClass;
            console.log(item)
            return <TMP address={item.address} />;
        });

        return <main class="site-main" role="main">
            <section class="treaty pt-5">
                <div class="container">

                    <header class="mb-5">
                        <h1>Contract Printers</h1>
                        <p><strong>Example Address:</strong> 0x627306090abaB3A6e1400e9345bC60c78a8BEf57</p>
                    </header>

                    <div class="row mb-5">
                        <GenericContractPrinter name="Signing Director" onContractPrint={this.onContractPrint} builders={builders.director}/>
                        <GenericContractPrinter name="Conditional Validity" onContractPrint={this.onContractPrint} builders={builders.conditionalValidity}/>
                        <GenericContractPrinter name="Document" onContractPrint={this.onContractPrint} builders={builders.document}/>
                        <GenericContractPrinter name="Document Storage" onContractPrint={this.onContractPrint} builders={builders.documentStorage}/>
                        <GenericContractPrinter name="NDA" onContractPrint={this.onContractPrint} builders={builders.treaty}/>
                    </div>

                    <header class="mb-5">
                        <h1>Printed Contracts</h1>
                    </header>

                    <PrintedContractList printedContracts={printedContracts} />
                </div>
            </section>
        </main>;
    }
}
