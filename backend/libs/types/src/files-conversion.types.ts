import { EncodingEnum, ProcessingImageEnum, ProcessingVideoEnum, ProcessingAudioEnum } from "@libs/enums";
import { FileUpload } from "graphql-upload/processRequest.mjs";

export type EncodingConfig = {
    [EncodingEnum.PROCESS_AUDIO]: ProcessingAudioEnum,
    [EncodingEnum.PROCESS_VIDEO]: ProcessingVideoEnum,
    [EncodingEnum.PROCESS_IMAGE]: ProcessingImageEnum,
};

export type EnqueueProcessing<T extends EncodingEnum> = {
    files: Promise<FileUpload>[],
    method: T,
    config?: T extends keyof EncodingConfig ? EncodingConfig[T] : never,
};