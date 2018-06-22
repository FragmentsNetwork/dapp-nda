import {h, Component} from 'preact';
//import {web3, solidityTester} from '../../web3Loader';
import ipfsDownloader from '../ipfsDownloader';
import ipfs from '../ipfsConnection';

export interface IpfsUploaderProps {
    onDocumentUpload: (url: string, hash: string) => void;
}

export enum UploadState {
    idle,
    success,
    error,
    //uploading
}

export interface IpfsUploaderState {
    uploadStatus: UploadState;
    uploadedFile: {
        uri: string;
        hash: string;
    };
}

export default class IpfsUploader extends Component<IpfsUploaderProps, IpfsUploaderState> {

    public constructor(props) {
        super(props);
        this.state = {
            uploadStatus: UploadState.idle
        } as IpfsUploaderState;

        this.uploadFile = this.uploadFile.bind(this);
    }

    private fileUploaded() {

    }

    private resetInput(input) {
        input.value = '';
    }

    private uploadFile(event) {
        const files = (event.target.files);


        if (!files) {
            this.resetInput(event.target);
            return; // error
        }

        this.sendFileToStorage(files[0], () => this.resetInput(event.target));
    }

    // TODO: if filename is needed for originally uploaded file
    private sendFileToStorage(file, resetInputFunc) {
        let reader = new (window as any).FileReader();

        const uploadToIpfs = async (fileData) => {
            let filesToIpfs = [{
                path: 'a/' + file.name,
                content: Buffer.from(fileData)
            }];


            await ipfs.files.add(filesToIpfs, (error, ipfsHash) => {
                resetInputFunc();

                if (error) {
                    this.setState({
                        uploadStatus: UploadState.error
                    });
                    return;
                }

                let hash = ipfsHash[0].hash;
                let uri = '/ipfs/' + hash;

                this.setState({
                    uploadStatus: UploadState.success,
                    uploadedFile: {uri, hash}
                });

                this.props.onDocumentUpload(uri, hash);
            });
        }

        reader.onload = async () => uploadToIpfs(reader.result);
        reader.readAsArrayBuffer(file);
    }


    public render() {
        const downloadIpfsFile = (hash) => (e) => {
            e.preventDefault();
            ipfsDownloader(hash);
        }

        const successNotice = (uploadedFile) => <div>
            <br />
            <a href={"https://ipfs.io" + uploadedFile.uri} onClick={downloadIpfsFile(uploadedFile.hash)}>{uploadedFile.uri}</a>
        </div>;

        const errorNotice = (error) => <div class="invalid-feedback">
            Error during uploading to IPFS: "".
        </div>;

        let isInvalidSign = (this.state.uploadStatus == UploadState.error) ? 'is-invalid' : '';

        return <div class="custom-file">
            <input type="file" onChange={this.uploadFile} class={isInvalidSign + ' custom-file-input'} id="ipfs" name="ipfs" />
            <label class="custom-file-label" for="ipfs">Choose file</label>

            {this.state.uploadStatus == UploadState.success ? successNotice(this.state.uploadedFile) : null}
            {this.state.uploadStatus == UploadState.error ? errorNotice(this.state.uploadedFile) : null}
        </div>;
    }
}
