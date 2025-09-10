import { registerEnumType } from "@nestjs/graphql";

export enum ProcessingImageEnum {
    JPG_TO_PNG = `jpg_to_png`,
    JPG_TO_TIFF = `jpg_to_tiff`,
    JPG_TO_PDF = `jpg_to_pdf`,
    JPG_TO_SVG = `jpg_to_svg`,
    JPG_TO_WEBP = `jpg_to_webp`,

    PNG_TO_JPG = `png_to_jpg`,
    PNG_TO_TIFF = `png_to_tiff`,
    PNG_TO_PDF = `png_to_pdf`,
    PNG_TO_SVG = `png_to_svg`,
    PNG_TO_WEBP = `png_to_webp`,

    TIFF_TO_JPG = `tiff_to_jpg`,
    TIFF_TO_PNG = `tiff_to_png`,
    TIFF_TO_PDF = `tiff_to_pdf`,
    TIFF_TO_SVG = `tiff_to_svg`,
    TIFF_TO_WEBP = `tiff_to_webp`,

    WEBP_TO_JPG = `webp_to_jpg`,
    WEBP_TO_TIFF = `webp_to_tiff`,
    WEBP_TO_PNG = `webp_to_png`,
    WEBP_TO_PDF = `webp_to_pdf`,
    WEBP_TO_SVG = `webp_to_svg`,
};

registerEnumType(ProcessingImageEnum, {
    name: `ProcessingImageEnum`,
    description: `All available image conversion formats.`,
});