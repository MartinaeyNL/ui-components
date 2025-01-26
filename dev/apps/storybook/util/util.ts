export function getPackageVersion(statsJson: any): string {
    return statsJson.version;
}

export function getPackageTotalSizeKb(statsJson: any): string {
    return ((statsJson.assets?.find(x => x.name === "index.js")?.size || 0) / 1000).toFixed(2);
}

