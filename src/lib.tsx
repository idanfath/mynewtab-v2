export function getFaviconUrl(url: string, size: number = 64): string {
    if (!url || url === "" || url === " ") return "";

    try {
        const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
        const urlObj = new URL(normalizedUrl);
        const domain = urlObj.hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
    } catch (e) {
        console.error(e);
        return "";
    }
}
