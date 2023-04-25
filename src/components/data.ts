export interface NodeComponentProps {
    componentId: string
    parentComponentId:string
    componentName: string
    componentType: string
    componentDescription: string
    componentAttrs: NodeAttrProps
    componentContent: string,
    componentChild: NodeComponentProps[]

}

export interface NodeAttrProps {
    attr_accept: string
    attr_accept_charset: string
    attr_accesskey: string
    attr_action: string
    attr_align: string
    attr_allow: string
    attr_alt: string
    attr_async: string
    attr_autocapitalize: string
    attr_autocomplete: string
    attr_autofocus: string
    attr_autoplay: string
    attr_background: string
    attr_border: string
    attr_buffered: string
    attr_capture: string
    attr_challenge: string
    attr_charset: string
    attr_checked: string
    attr_cite: string
    attr_class: string
    attr_code: string
    attr_codebase: string
    attr_color: string
    attr_cols: string
    attr_colspan: string
    attr_content: string
    attr_contenteditable: string
    attr_contextmenu: string
    attr_controls: string
    attr_coords: string
    attr_crossorigin: string
    attr_data: string
    attr_data_star: string
    attr_datetime: string
    attr_decoding: string
    attr_default: string
    attr_defer: string
    attr_dir: string
    attr_dirname: string
    attr_disabled: string
    attr_download: string
    attr_draggable: string
    attr_enctype: string
    attr_for: string
    attr_form: string
    attr_formaction: string
    attr_formenctype: string
    attr_formmethod: string
    attr_formnovalidate: string
    attr_formtarget: string
    attr_headers: string
    attr_height: string
    attr_hidden: string
    attr_high: string
    attr_href: string
    attr_hreflang: string
    attr_http_equiv: string
    attr_id: string
    attr_integrity: string
    attr_inputmode: string
    attr_ismap: string
    attr_itemprop: string
    attr_keytype: string
    attr_kind: string
    attr_label: string
    attr_lang: string
    attr_language: string
    attr_list: string
    attr_loop: string
    attr_low: string
    attr_max: string
    attr_maxlength: string
    attr_minlength: string
    attr_media: string
    attr_method: string
    attr_min: string
    attr_multiple: string
    attr_muted: string
    attr_name: string
    attr_novalidate: string
    attr_open: string
    attr_optimum: string
    attr_pattern: string
    attr_ping: string
    attr_placeholder: string
    attr_playsinline: string
    attr_poster: string
    attr_preload: string
    attr_readonly: string
    attr_referrerpolicy: string
    attr_rel: string
    attr_required: string
    attr_reversed: string
    attr_role: string
    attr_rows: string
    attr_rowspan: string
    attr_sandbox: string
    attr_scope: string
    attr_scoped: string
    attr_selected: string
    attr_shape: string
    attr_size: string
    attr_sizes: string
    attr_slot: string
    attr_span: string
    attr_spellcheck: string
    attr_src: string
    attr_srcdoc: string
    attr_srclang: string	
    attr_srcset: string
    attr_start: string
    attr_step: string
    attr_style: string
    attr_tabindex: string
    attr_target: string
    attr_title: string
    attr_translate: string
    attr_type: string
    attr_usemap: string
    attr_value: string
    attr_width: string
    attr_wrap: string
}


export class NodeComponent {
    
    props: NodeComponentProps
    #propsMap: Map<string, NodeComponentProps> = new Map();
    // #htmlParser: DOMParser = new window.DOMParser();

    constructor(
        componentId: string, 
        componentName: string, 
        componentType: string,
        parentComponentId: string="",
        componentDescription: string="", 
        componentAttrs: NodeAttr= new NodeAttr(),
        componentContent: string ="",
        componentChild: NodeComponentProps[] = [],
    ) {
        this.props = JSON.parse(
            `{
                "componentId":"${componentId}",
                "parentComponentId":"${parentComponentId}",
                "componentName":"${componentName}",
                "componentType":"${componentType}",
                "componentDescription":"${componentDescription}",
                "componentAttrs":${componentAttrs.json()},
                "componentContent": "${componentContent}",
                "componentChild": [${componentChild}]
            }`
        ) as NodeComponentProps;

        this.#propsMap = this.buildMap(this.props, this.#propsMap);
    }


    public addChild(
        componentId: string, 
        componentName: string, 
        componentType: string,
        parentComponentId: string=this.props.componentId,
        componentDescription: string="", 
        componentAttrs: NodeAttr= new NodeAttr(),
        componentContent: string ="",
        componentChild: NodeComponentProps[] = []
    ) {
        if(!this.#propsMap.has(componentId)) {
            let childNode = new NodeComponent(componentId, componentName, componentType, parentComponentId, componentDescription, componentAttrs, componentContent, componentChild);
            this.#propsMap.get(parentComponentId).componentChild.push(childNode.props);
            this.#propsMap.set(componentId, childNode.props);
        }
    }

    public removeChild(nodeComponentId: string) {
        if(this.#propsMap.has(nodeComponentId)) {
            this.#propsMap.get(nodeComponentId).componentChild = this.#propsMap.get(nodeComponentId).componentChild.filter(child => child.componentId != nodeComponentId);
        }
    }

    public getPropsById(key: string) {
        if(this.#propsMap.has(key)) {
            return this.#propsMap.get(key);
        } else {
            return null;
        }
    }

    private buildMap(nodeProps: NodeComponentProps, propsMap: Map<string, NodeComponentProps>): Map<string, NodeComponentProps> {
        propsMap.set(nodeProps.componentId, nodeProps);
        if(nodeProps.componentChild.length != 0) {
            nodeProps.componentChild.forEach(component => {
                this.buildMap(component, propsMap);
            })
        }
        return propsMap;
    }

    json() {
        return JSON.stringify(this.props);
    }

    renderHtml() {
        console.log("start rendering ...")
        // 若节点没有子节点, 则直接生成html
        if(this.props.componentChild.length == 0) {
            return this.renderHTmlByAttr(this.props);
        }
        // 若节点含子节点 
        else {

            var parentsMap: Map<string, string[][]> = new Map();
            var completeMap: Map<string, string> = new Map();

            // 为所有叶子节点生成html
            [ ... this.#propsMap.values()]
            .filter(nodeProps => nodeProps.componentChild.length == 0)
            .forEach(nodeProps => {
                let html = this.renderHTmlByAttr(nodeProps);
                var childs = []
                if(parentsMap.has(nodeProps.parentComponentId)) {
                    childs = parentsMap.get(nodeProps.parentComponentId);
                }
                childs.push([nodeProps.componentId, html]);
                parentsMap.set(nodeProps.parentComponentId, childs);
                completeMap.set(nodeProps.componentId, html);
            });


            // 循环parentsMap, 生成满足依赖关系的节点, 并生成Html保存到completeMap
            var renderComplete = false;
            do {
                // 若没有再上一层的节点, 循环结束
                if(parentsMap.size == 0) {
                    renderComplete = true;
                }
                else {
                    for (let parentNodeId of parentsMap.keys()) {
                        let parentNodeArr = parentsMap.get(parentNodeId);
                        let childNodeProps = this.#propsMap.get(parentNodeId).componentChild;

                        // 若母节点已解析的数量等于母节点的子节点数量, 则开始解析该母节点为html
                        if(parentNodeArr.length == childNodeProps.length) {
                            let html = this.renderHTmlByAttr(this.#propsMap.get(parentNodeId), parentsMap.get(parentNodeId).map(arr => arr[1]));
                            completeMap.set(parentNodeId, html);

                            // 根节点没有母节点, 如果节点有母节点, 则添加到parentsMap, 待下一步处理
                            let nextParentId = this.#propsMap.get(parentNodeId).parentComponentId;
                            if(nextParentId != "") {
                                parentsMap.set(nextParentId, []);
                            }

                            // 删除parentsMap中母节点的记录(母节点的html已保存到completeMap)
                            parentsMap.delete(parentNodeId);
                        } else {
                            let childs:string[][] = [];
                            childNodeProps.forEach(childNode => {
                                if(completeMap.has(childNode.componentId)) {
                                    let childHtml = completeMap.get(childNode.componentId);
                                    childs.push([childNode.componentId, childHtml]);
                                }
                            })
                            parentsMap.set(parentNodeId, childs);
                        }
                    }
                }

            } while(!renderComplete);

            // 返回结果
            return completeMap.get(this.props.componentId);
        }
    }

    private renderHTmlByAttr(nodeComponentProps:NodeComponentProps, childHtml: string[] = []) {

        let getAttrs = () => {
            var attrsStr = "";
            let entries = Object.entries(nodeComponentProps.componentAttrs);
            for (const [key, value] of entries) {
                let fieldName = key.replace("attr_", "");;
                let fieldValue = value as string;

                if(fieldValue != "") {
                    let convertFieldName = fieldName;
                    switch(key) { 
                        case "data_star": { 
                            convertFieldName = "data-*";
                            break; 
                        } 
                        case "http_equiv": { 
                            convertFieldName = "http-equiv";
                            break; 
                        } 
                        case "accept_charset": { 
                            convertFieldName = "accept-charset";
                            break; 
                        }
                        default: {
                            break; 
                        }
                    }
                    attrsStr = attrsStr.concat(" ", convertFieldName, "=\"", fieldValue, "\"");
                }
            }

            return attrsStr.trim();
        }

        var content = ""
        if(nodeComponentProps.componentContent != "") {
            content = nodeComponentProps.componentContent;
        }

        if(childHtml.length > 0) {
            content =  content + childHtml.join("\n"); 
        }

        let begin = `<${nodeComponentProps.componentType} ${getAttrs()}>`;
        let end = `</${nodeComponentProps.componentType}>`;
        let formattedHtml = this.formatHtml(begin, content, end);

        return formattedHtml;
    }

    private formatHtml(begin:string, body:string, end:string) {
        let newBody = body.split("\n").map(line => "  " + line).join("\n");
        
        return begin.concat("\n", newBody, "\n", end);
    }
}

export class NodeAttr {
    props: NodeAttrProps
    
    constructor(
        attr_id= "",
        attr_class= "",
        attr_accept= "",
        attr_accept_charset= "",
        attr_accesskey= "",
        attr_action= "",
        attr_align= "",
        attr_allow= "",
        attr_alt= "",
        attr_async= "",
        attr_autocapitalize= "",
        attr_autocomplete= "",
        attr_autofocus= "",
        attr_autoplay= "",
        attr_background= "",
        attr_border= "",
        attr_buffered= "",
        attr_capture= "",
        attr_challenge= "",
        attr_charset= "",
        attr_checked= "",
        attr_cite= "",
        attr_code= "",
        attr_codebase= "",
        attr_color= "",
        attr_cols= "",
        attr_colspan= "",
        attr_content= "",
        attr_contenteditable= "",
        attr_contextmenu= "",
        attr_controls= "",
        attr_coords= "",
        attr_crossorigin= "",
        attr_data= "",
        attr_data_star= "",
        attr_datetime= "",
        attr_decoding= "",
        attr_default= "",
        attr_defer= "",
        attr_dir= "",
        attr_dirname= "",
        attr_disabled= "",
        attr_download= "",
        attr_draggable= "",
        attr_enctype= "",
        attr_for= "",
        attr_form= "",
        attr_formaction= "",
        attr_formenctype= "",
        attr_formmethod= "",
        attr_formnovalidate= "",
        attr_formtarget= "",
        attr_headers= "",
        attr_height= "",
        attr_hidden= "",
        attr_high= "",
        attr_href= "",
        attr_hreflang= "",
        attr_http_equiv= "",
        attr_integrity= "",
        attr_inputmode= "",
        attr_ismap= "",
        attr_itemprop= "",
        attr_keytype= "",
        attr_kind= "",
        attr_label= "",
        attr_lang= "",
        attr_language= "",
        attr_list= "",
        attr_loop= "",
        attr_low= "",
        attr_max= "",
        attr_maxlength= "",
        attr_minlength= "",
        attr_media= "",
        attr_method= "",
        attr_min= "",
        attr_multiple= "",
        attr_muted= "",
        attr_name= "",
        attr_novalidate= "",
        attr_open= "",
        attr_optimum= "",
        attr_pattern= "",
        attr_ping= "",
        attr_placeholder= "",
        attr_playsinline= "",
        attr_poster= "",
        attr_preload= "",
        attr_readonly= "",
        attr_referrerpolicy= "",
        attr_rel= "",
        attr_required= "",
        attr_reversed= "",
        attr_role= "",
        attr_rows= "",
        attr_rowspan= "",
        attr_sandbox= "",
        attr_scope= "",
        attr_scoped= "",
        attr_selected= "",
        attr_shape= "",
        attr_size= "",
        attr_sizes= "",
        attr_slot= "",
        attr_span= "",
        attr_spellcheck= "",
        attr_src= "",
        attr_srcdoc= "",
        attr_srclang= "",	
        attr_srcset= "",
        attr_start= "",
        attr_step= "",
        attr_style= "",
        attr_tabindex= "",
        attr_target= "",
        attr_title= "",
        attr_translate= "",
        attr_type= "",
        attr_usemap= "",
        attr_value= "",
        attr_width= "",
        attr_wrap= ""
    ) {
        let json = `
            {
       			"attr_id": "${attr_id}",
                "attr_class": "${attr_class}",
                "attr_src": "${attr_src}",
                "attr_href": "${attr_href}",
                "attr_label": "${attr_label}",
                "attr_alt": "${attr_alt}",
                "attr_height": "${attr_height}",
                "attr_width": "${attr_width}",
                "attr_autocomplete": "${attr_autocomplete}",
                "attr_accept": "${attr_accept}",
                "attr_accept_charset": "${attr_accept_charset}",
                "attr_accesskey": "${attr_accesskey}",
                "attr_action": "${attr_action}",
                "attr_align": "${attr_align}",
                "attr_allow": "${attr_allow}",
                "attr_async": "${attr_async}",
                "attr_autocapitalize": "${attr_autocapitalize}",
                "attr_autofocus": "${attr_autofocus}",
                "attr_autoplay": "${attr_autoplay}",
                "attr_background": "${attr_background}",
                "attr_border": "${attr_border}",
                "attr_buffered": "${attr_buffered}",
                "attr_capture": "${attr_capture}",
                "attr_challenge": "${attr_challenge}",
                "attr_charset": "${attr_charset}",
                "attr_checked": "${attr_checked}",
                "attr_cite": "${attr_cite}",
                "attr_code": "${attr_code}",
                "attr_codebase": "${attr_codebase}",
                "attr_color": "${attr_color}",
                "attr_cols": "${attr_cols}",
                "attr_colspan": "${attr_colspan}",
                "attr_content": "${attr_content}",
                "attr_contenteditable": "${attr_contenteditable}",
                "attr_contextmenu": "${attr_contextmenu}",
                "attr_controls": "${attr_controls}",
                "attr_coords": "${attr_coords}",
                "attr_crossorigin": "${attr_crossorigin}",
                "attr_data": "${attr_data}",
                "attr_data_star": "${attr_data_star}",
                "attr_datetime": "${attr_datetime}",
                "attr_decoding": "${attr_decoding}",
                "attr_default": "${attr_default}",
                "attr_defer": "${attr_defer}",
                "attr_dir": "${attr_dir}",
                "attr_dirname": "${attr_dirname}",
                "attr_disabled": "${attr_disabled}",
                "attr_download": "${attr_download}",
                "attr_draggable": "${attr_draggable}",
                "attr_enctype": "${attr_enctype}",
                "attr_for": "${attr_for}",
                "attr_form": "${attr_form}",
                "attr_formaction": "${attr_formaction}",
                "attr_formenctype": "${attr_formenctype}",
                "attr_formmethod": "${attr_formmethod}",
                "attr_formnovalidate": "${attr_formnovalidate}",
                "attr_formtarget": "${attr_formtarget}",
                "attr_headers": "${attr_headers}",
                "attr_hidden": "${attr_hidden}",
                "attr_high": "${attr_high}",
                "attr_hreflang": "${attr_hreflang}",
                "attr_http_equiv": "${attr_http_equiv}",
                "attr_integrity": "${attr_integrity}",
                "attr_inputmode": "${attr_inputmode}",
                "attr_ismap": "${attr_ismap}",
                "attr_itemprop": "${attr_itemprop}",
                "attr_keytype": "${attr_keytype}",
                "attr_kind": "${attr_kind}",
                "attr_lang": "${attr_lang}",
                "attr_language": "${attr_language}",
                "attr_list": "${attr_list}",
                "attr_loop": "${attr_loop}",
                "attr_low": "${attr_low}",
                "attr_max": "${attr_max}",
                "attr_maxlength": "${attr_maxlength}",
                "attr_minlength": "${attr_minlength}",
                "attr_media": "${attr_media}",
                "attr_method": "${attr_method}",
                "attr_min": "${attr_min}",
                "attr_multiple": "${attr_multiple}",
                "attr_muted": "${attr_muted}",
                "attr_name": "${attr_name}",
                "attr_novalidate": "${attr_novalidate}",
                "attr_open": "${attr_open}",
                "attr_optimum": "${attr_optimum}",
                "attr_pattern": "${attr_pattern}",
                "attr_ping": "${attr_ping}",
                "attr_placeholder": "${attr_placeholder}",
                "attr_playsinline": "${attr_playsinline}",
                "attr_poster": "${attr_poster}",
                "attr_preload": "${attr_preload}",
                "attr_readonly": "${attr_readonly}",
                "attr_referrerpolicy": "${attr_referrerpolicy}",
                "attr_rel": "${attr_rel}",
                "attr_required": "${attr_required}",
                "attr_reversed": "${attr_reversed}",
                "attr_role": "${attr_role}",
                "attr_rows": "${attr_rows}",
                "attr_rowspan": "${attr_rowspan}",
                "attr_sandbox": "${attr_sandbox}",
                "attr_scope": "${attr_scope}",
                "attr_scoped": "${attr_scoped}",
                "attr_selected": "${attr_selected}",
                "attr_shape": "${attr_shape}",
                "attr_size": "${attr_size}",
                "attr_sizes": "${attr_sizes}",
                "attr_slot": "${attr_slot}",
                "attr_span": "${attr_span}",
                "attr_spellcheck": "${attr_spellcheck}",
                "attr_srcdoc": "${attr_srcdoc}",
                "attr_srclang": "${attr_srclang}",	
                "attr_srcset": "${attr_srcset}",
                "attr_start": "${attr_start}",
                "attr_step": "${attr_step}",
                "attr_style": "${attr_style}",
                "attr_tabindex": "${attr_tabindex}",
                "attr_target": "${attr_target}",
                "attr_title": "${attr_title}",
                "attr_translate": "${attr_translate}",
                "attr_type": "${attr_type}",
                "attr_usemap": "${attr_usemap}",
                "attr_value": "${attr_value}",
                "attr_wrap": "${attr_wrap}"
            }
       `
       this.props = JSON.parse(json) as NodeAttrProps;
    }

    json() {
        return JSON.stringify(this.props);
    }
}