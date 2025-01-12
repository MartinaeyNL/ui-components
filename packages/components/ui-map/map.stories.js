import {getWcStorybookHelpers} from "wc-storybook-helpers";
import "@martinaeynl/ui-components-map";
import {html} from "lit";

const helpers = getWcStorybookHelpers("ui-map");

/** @type { import('@storybook/web-components').Meta } */
const meta = {
    title: "Playground/Map/ui-map",
    component: "ui-map",
    args: helpers.args,
    argTypes: helpers.argTypes,
    parameters: {
        docs: {
            subtitle: "<ui-map>",
            story: {
                height: "480px"
            }
        }
    }
};

/** @type { import('@storybook/web-components').StoryObj } */
export const Primary = {
    render: (args) => helpers.template(args)
};

/** @type { import('@storybook/web-components').StoryObj } */
export const CenterZoomExample = {
    args: {
        lat: 52,
        lng: 5,
        zoom: 5
    },
    render: (args) => helpers.template(args)
};

/** @type { import('@storybook/web-components').StoryObj } */
export const MapStyleExample = {
    args: {
        lat: 47.26,
        lng: 11.39,
        zoom: 13,
        mapStyle: "https://demotiles.maplibre.org/styles/osm-bright-gl-style/style.json"
    },
    render: (args) => helpers.template(args)
};

/** @type { import('@storybook/web-components').StoryObj } */
export const MapMarkerExample = {
    args: {
        lat: 52,
        lng: 5,
        zoom: 3
    },
    render: (args) => helpers.template(args, html`
        <ui-map-marker lat="52" lng="5" title="Marker"></ui-map-marker>
        <ui-map-marker lat="5" lng="52" custom>custom</ui-map-marker>
    `)
}

export default meta;
