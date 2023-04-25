import {shareStore, setShareStore} from '../../store/globalMemStores'
export default function CompA() {
    const store = shareStore;
    console.log("component A is refreshed.")
    return (
        <h1>CompA read store: {store.data}</h1>
    )
}