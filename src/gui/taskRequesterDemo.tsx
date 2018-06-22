import {h, render} from 'preact';
import TaskRequesterDemo from './signingDemo/taskRequester/TaskRequesterDemo';

document.addEventListener("DOMContentLoaded", function() {
    render(<TaskRequesterDemo />, document.body);
});
