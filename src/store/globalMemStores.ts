import { createStore } from "solid-js/store";

export const [shareStore, setShareStore] = createStore({
    data: "123",
    header: "abc"
})