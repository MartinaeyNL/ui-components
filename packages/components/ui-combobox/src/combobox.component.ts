// @ts-nocheck
import {ComboBox} from "@vaadin/combo-box/vaadin-lit-combo-box.js";
import {customElement, property} from "lit/decorators.js";
import getComboboxStyles from "./combobox.styles";

@customElement("ui-combobox")
export class ComboboxComponent extends ComboBox<any> {

  static get observedAttributes() {
    console.log(super.properties);
    return [];
  }

  static get styles() {
    return [...super.styles, getComboboxStyles()];
  }
}
