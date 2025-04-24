// convert html to proper png like screenshot
import { toPng } from 'html-to-image';

export const downloadImageFromRef = async (ref, filename = 'screenshot.png') => {
    if (!ref?.current) return;

    try {
        const dataUrl = await toPng(ref.current);
        const link = document.createElement('a');
        link.download = filename;
        link.href = dataUrl;
        link.click();
    } catch (error) {
        console.error('Image download failed:', error);
    }
};
