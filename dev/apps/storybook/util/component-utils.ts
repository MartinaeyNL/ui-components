import customElements from "../../../../docs/custom-elements.json";

export function getComponentDocs(tagName: string) {
    const module =  (customElements.modules as any[]).find(m => m.declarations[0].tagName === tagName);
    return module.declarations[0];
}

export function getComponentAttribute(docs: any, attrName: string) {
    return (docs.attributes as any[]).find(a => a.name === attrName);
}

export function getComponentMember(docs: any, member: string) {
    return (docs.members as any[]).find(a => a.name === member);
}

