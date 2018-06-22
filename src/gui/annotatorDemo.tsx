import {h, render} from 'preact';
import AnnotatorDemo from './signingDemo/annotator/AnnotatorDemo';

let queryParts = window.location.search.substr('?'.length).split('&');

let address = "";
for (let i = 0; i < queryParts.length; i++) {
    let tmp = queryParts[i].split('=');
    if (tmp[0] == 'address') {
        console.log(tmp)
        address = tmp[1];
        break;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    render(<AnnotatorDemo agreementAddress={address} />, document.body);
});
