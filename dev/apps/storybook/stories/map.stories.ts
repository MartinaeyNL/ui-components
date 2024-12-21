import type {Meta, StoryObj} from '@storybook/web-components';
import {getWcStorybookHelpers} from "wc-storybook-helpers";
import "@martinaeynl/ui-components-map";
import {html} from "lit";

const helpers = getWcStorybookHelpers("ui-map");

// This default export determines where your story goes in the story list
const meta: Meta = {
    title: "Playground/Map/ui-map",
    component: "ui-map",
    args: helpers.args,
    argTypes: helpers.argTypes as any,
    parameters: {
        docs: {
            subtitle: "<ui-map>",
            story: {
                height: "480px"
            }
        }
    }
};

type Story = StoryObj;

export const Primary: Story = {
    render: (args) => helpers.template(args)
};

export const CenterZoomExample: Story = {
    args: {
        lat: 52,
        lng: 5,
        zoom: 5
    },
    render: (args) => helpers.template(args)
};

export const MapStyleExample: Story = {
    args: {
        lat: 47.26,
        lng: 11.39,
        zoom: 13,
        mapStyle: "https://demotiles.maplibre.org/styles/osm-bright-gl-style/style.json"
    },
    render: (args) => helpers.template(args)
};

export const MapMarkerExample: Story = {
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
