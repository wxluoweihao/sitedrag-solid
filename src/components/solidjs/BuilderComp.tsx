export default function builderElem() {


    const avaiableComps = [
        {
            "key_id": "123",
            "key_name": "组件1",
            "key_elem": "CompA.tsx"
        }, 
        {
            "key_id": "456",
            "key_name": "组件2",
            "key_elem": "CompB.tsx"
        }, 
        {
            "key_id": "789",
            "key_name": "组件3",
            "key_elem": "CompC.tsx"
        }
    ]


    // const renderElemContentByCond = () => {
    //     if
    // }

    return (
        <div>
            <h1>创建细节组件</h1>
            <br />
            <label for="fname">元素标签:</label>
            <input type="text" id="fname" name="fname" /><br />

            <br />
            <label for="fname">tailwind class 属性:</label>
            <input type="text" id="fname" name="fname" /><br />

            <br />
            <label for="fname">元素内容:</label>
            <input type="text" id="fname" name="fname" /><br />

            <br />
            
            <div>
                <label for="cars">Choose a car:</label>
                <select name="cars" id="cars">
                    <optgroup label="Swedish Cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    </optgroup>
                    <optgroup label="German Cars">
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                    </optgroup>
                </select>
                <br />
                <br />
                <input type="submit" value="Submit" />
            </div>
        </div>
    )
}