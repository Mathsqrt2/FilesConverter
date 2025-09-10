import { registerEnumType } from "@nestjs/graphql";

export enum ProcessingVideoEnum {
    MKV_TO_MP4 = `mkv_to_mp4`,
    MKV_TO_MOV = `mkv_to_mov`,

    MP4_TO_MOV = `mp4_to_mov`,
    MP4_TO_MKV = `mp4_to_mkv`,

    MOV_TO_MKV = `mov_to_mkv`,
    MOV_TO_MP4 = `mov_to_mp4`,
};

registerEnumType(ProcessingVideoEnum, {
    name: `ProcessingVideoEnum`,
    description: `All available video conversion formats.`,
});