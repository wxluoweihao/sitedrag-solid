import { NodeAttr, NodeComponent } from "./data";

const rootNodeAttr = new NodeAttr();
rootNodeAttr.props.attr_id = "root-comp";
const rootComponent = new NodeComponent("754a0d66-f342-438a-a488-9e4a64057a18", "根组件", "div", "", "顶部组件", rootNodeAttr);

const firstChildAttr = new NodeAttr();
firstChildAttr.props.attr_id = "first-comp";
rootComponent.addChild("3ae7deb4-39d6-40c3-9f1a-e88123a112cc", "标题组件", "h", "754a0d66-f342-438a-a488-9e4a64057a18","标题组件", firstChildAttr, "Hello World !");

const secondChildAttr = new NodeAttr();
secondChildAttr.props.attr_id = "second-comp";
rootComponent.addChild("e2657f94-35a7-411b-ac3e-1f7bee6d53bb", "子组件", "div", "754a0d66-f342-438a-a488-9e4a64057a18", "子组件", secondChildAttr);

const thirdChildAttr = new NodeAttr();
thirdChildAttr.props.attr_id = "third-comp";
rootComponent.addChild("6a69c102-c586-48b2-80d1-0a71cbc4673", "最后组件", "p", "e2657f94-35a7-411b-ac3e-1f7bee6d53bb", "最后组件", thirdChildAttr, "this is a pargraph. ");


// const firstChildAttr = new NodeAttr();
// firstChildAttr.props.attr_id = "first-comp";
// const firstChildComponent = new NodeComponent("3ae7deb4-39d6-40c3-9f1a-e88123a112cc", "标题组件", "h", "标题组件", firstChildAttr, "Hello World !");

// const secondChildAttr = new NodeAttr();
// secondChildAttr.props.attr_id = "second-comp";
// const secondChildComponent = new NodeComponent("e2657f94-35a7-411b-ac3e-1f7bee6d53bb", "子组件", "div", "子组件", secondChildAttr);

// const thirdChildAttr = new NodeAttr();
// thirdChildAttr.props.attr_id = "third-comp";
// const thirdChildComponent = new NodeComponent("6a69c102-c586-48b2-80d1-0a71cbc46736", "最后组件", "p", "最后组件", thirdChildAttr);

// rootComponent.addSelfChild(firstChildComponent);
// rootComponent.addSelfChild(secondChildComponent);
// rootComponent.addChildByParentId("e2657f94-35a7-411b-ac3e-1f7bee6d53bb", thirdChildComponent);

// console.log(rootComponent.json());
console.log(rootComponent.renderHtml());