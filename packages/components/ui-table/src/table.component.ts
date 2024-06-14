import {customElement, property, queryAssignedNodes} from "lit/decorators.js";
import {UiComponent} from "@martinaeynl/ui-component-utils";
import {html, TemplateResult} from "lit";
import {classMap} from "lit/directives/class-map.js";
import {until} from "lit/directives/until.js";
import {when} from "lit/directives/when.js";
import {map} from "lit/directives/map.js";

// @ts-ignore
import {TableRow} from "./table-row";

// @ts-ignore
import {TableColumn} from "./table-column";

// @ts-ignore
import getTableStyles from "./table.styles";

@customElement("ui-table")
export class TableComponent extends UiComponent {

    @property({type: String})
    public title: string = "Table";

    @property({type: Array})
    public rows: (string[] | TableRow)[] = [];

    @property({type: Array})
    public cols: (string | TableColumn)[] = [];

    static get styles() {
        return [...super.styles, getTableStyles()]
    }

    protected render(): TemplateResult {
        const classes = this.getClasses();
        return html`
            <table class="${classMap(classes)}">
                ${until(this._getTableContent())}
            </table>
        `;
    }

    protected async _getTableContent(): Promise<TemplateResult | undefined> {
        return html`
            
            ${when(this.cols?.length, () => html`
                <tr>
                    ${map(this.cols, (column) => until(this._getColumnTemplate(column)))}
                </tr>
            `, () => when(this.rows?.length, () => html`
                <tr>Column template</tr>
            `))}
            
            ${map((this.rows || []), (row) => until(this._getRowTemplate(row)))}
        `
    }

    protected async _getColumnTemplate(column: string | TableColumn): Promise<TemplateResult | undefined> {
        if(typeof column === "string") {
            return html`
                <th>
                    ${column}
                </th>
            `;
        } else {
            return html`
                <th>
                    ${until(column.getTemplate())}
                </th>
            `;
        }
    }

    protected async _getRowTemplate(row: string[] | TableRow): Promise<TemplateResult | undefined> {
        if(Array.isArray(row)) {
            return html`
                <tr>
                    ${map(row, (column) => html`
                        <td>${column}</td>
                    `)}
                </tr>
            `
        } else {
            return html`
                <tr>
                    ${until(row.getTemplate())}
                </tr>
            `
        }
    }

}
