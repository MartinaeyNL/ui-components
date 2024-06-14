import {html, TemplateResult} from "lit";

export default class TableColumn {

    async getTemplate(): Promise<TemplateResult> {
        return html`
            <span>Column</span>
        `
    }
}
