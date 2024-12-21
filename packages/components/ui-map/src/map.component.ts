import { customElement, property, query, queryAssignedElements } from "lit/decorators.js";
import {html, LitElement, PropertyValues, unsafeCSS} from "lit";
import {MapMarkerComponent} from "./map-marker.component.js";
import {UiComponent} from "@martinaeynl/ui-component-utils";
import maplibregl from "maplibre-gl";

// @ts-ignore
import getMapStyles from "./map.styles" assert {type: "css"};

// @ts-ignore
import * as maplibreGlStyles from "maplibre-gl/dist/maplibre-gl.css";

@customElement("ui-map")
export class MapComponent extends UiComponent {

    @property({type: String})
    public mapStyle: string = "https://demotiles.maplibre.org/style.json";

    @property({type: Number})
    public lat = 0;

    @property({type: Number})
    public lng = 0;

    @property({type: Number})
    public zoom = 0;

    @property({type: Object})
    public options: maplibregl.MapOptions = this._getDefaultMapOptions();

    @query("#map")
    protected _mapElem?: HTMLElement;

    @queryAssignedElements()
    protected _slotElems?: Array<HTMLElement>;

    protected static readonly SLOT_ATTRIBUTE_NAME = "map-slot-id";

    protected _map?: maplibregl.Map;
    protected _markerElements: Map<string, HTMLElement> = new Map();
    protected _initPromise?: Promise<void>;

    static get styles() {
        return [...super.styles, getMapStyles()];
    }

    connectedCallback() {
        super.connectedCallback();
        this._init();
    }

    protected shouldUpdate(changedProps: PropertyValues): boolean {
        if(changedProps.size === 1) {
            if(changedProps.has("mapStyle") && this._map) {
                this._map.setStyle(this.mapStyle);
                return false;
            }
        }
        return super.shouldUpdate(changedProps);
    }

    /**
     * Main initialization function of the map.
     * It spits out a warning if initialization has been started already.
     */
    protected _init(): void {
        if(!this._initPromise) {
            this._initPromise = this._doInit().finally(() => delete this._initPromise);
        } else {
            console.warn("Could not initialize map, as it is busy initializing.");
        }
    }

    /**
     * Internal function for initializing the map.
     * This should only be called by the {@link _init()} function.
     */
    protected async _doInit(options = this.options): Promise<void> {
        await this.getUpdateComplete();
        if(!this._mapElem) {
            console.error("Could not initialize map, as the HTML element could not be found.");
            return;
        }
        if(!options.style) {
            if(!this.mapStyle) {
                console.error("Could not initialize map, as the tiles URL is invalid.");
                return;
            }
            options.style = this.mapStyle;
        }
        if(!options.center) {
            console.log(this.lng, this.lat);
            options.center = [this.lng || 0, this.lat || 0];
        }
        if(!options.zoom) {
            options.zoom = this.zoom || 1;
        }
        if(!options.container) {
            options.container = this._mapElem;
        }

        console.debug("Loading map...", options);
        this._map = new maplibregl.Map(options);
    }

    protected render(): unknown {
        return html`
            <link rel='stylesheet' href='https://unpkg.com/maplibre-gl@4.7.0/dist/maplibre-gl.css' />
            <div id="map">
            </div>
            <slot @slotchange=${this._onSlotChange} hidden></slot>
        `;
    }

    protected _onSlotChange(_ev: Event): void {
        this._purgeMarkerElements();
        this._slotElems?.forEach(slot => {
            if(!slot.hasAttribute(MapComponent.SLOT_ATTRIBUTE_NAME)) {
                if(slot instanceof MapMarkerComponent) {
                    this._addMarkerElement(slot);
                } else {
                    console.debug("Unknown map slot type.");
                }
            }
        });
    }

    /**
     * Function that cleans up {@link _slotElems}, by removing entries that have been removed from the slotted children / UI.
     */
    protected _purgeMarkerElements() {
        this._markerElements.forEach((markerElement, id) => {
            if(!this._slotElems?.find(element => element.getAttribute(MapComponent.SLOT_ATTRIBUTE_NAME) === id)) {
                this._removeMarkerElement(id);
            }
        });
    }

    protected _addMarkerElement(element: MapMarkerComponent): void {
        const id = (Math.random() + 1).toString(36).substring(2);
        element.setAttribute(MapComponent.SLOT_ATTRIBUTE_NAME, id);
        this._markerElements.set(id, element);

        const marker = this._createMarker(element);
        this._addMarker(marker);
    }

    protected _removeMarkerElement(id: string): void {
        this._markerElements.delete(id);
    }

    protected _createMarker(element: MapMarkerComponent): maplibregl.Marker {
        const marker = new maplibregl.Marker({ element: element });
        marker.setLngLat([element.lng, element.lat]);
        return marker;
    }

    protected async _addMarker(marker: maplibregl.Marker): Promise<void> {
        await this.getUpdateComplete();
        if(!this._map) {
            console.error("Could not create marker: map has not been initialize map.");
            return;
        }
        marker.addTo(this._map);
    }

    protected _getDefaultMapOptions(): maplibregl.MapOptions {
        return {
            attributionControl: false,
            container: null as any
        };
    }
}
