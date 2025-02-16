import customElements from "../../docs/custom-elements.json";

export function getComponentDocs(tagName: string, customElementsJson = customElements) {
    const module = (customElementsJson.modules as any[]).find(m => m.declarations?.[0]?.tagName === tagName);
    return module?.declarations?.[0];
}

export function getHTMLAttributeDocs(docs: any, attrName: string) {
    return (docs.attributes as any[]).find(a => a.name === attrName);
}

export function getClassMemberDocs(docs: any, member: string) {
    return (docs.members as any[]).find(a => a.name === member);
}
