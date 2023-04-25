import {shareStore, setShareStore} from '../../store/globalMemStores'
import CompA from './CompA';
import CompB from './CompB';

export default function CompC() {
    const store = shareStore;
    console.log("component C is refreshed.")
    const actionA = () => {
        setShareStore({data: (document.getElementById("input1") as HTMLInputElement).value});
    }

    const actionB = () => {
        setShareStore({header: (document.getElementById("input2") as HTMLInputElement).value});
    }

    return (
        <div>
            <h1>CompC click to change state</h1>
            <input id="input1" type="text"></input>
            <br></br>
            <button onclick={actionA}>click</button>
            <br></br>
            <input  id="input2" type="text"></input>
             <br></br>
            <button onclick={actionB}>click</button>
             <br></br>
    

            <CompA></CompA>
            <CompB></CompB>
        </div>
    )
}