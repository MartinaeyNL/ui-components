import {html, TemplateResult} from "lit";

export default class TableRow {

    async getTemplate(): Promise<TemplateResult> {
        return html`
            <span>Row</span>
        `
    }
}
