import { registerEnumType } from "@nestjs/graphql";

export enum EncodingEnum {
    PROCESS_VIDEO = `process_video`,
    PROCESS_AUDIO = `process_audio`,
    PROCESS_IMAGE = `process_image`,
    PACKING_OUTPUT = `packing_output`,
};

registerEnumType(EncodingEnum, {
    name: `EncodingEnum`,
    description: `All available conversion methods.`,
});