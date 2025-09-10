import { registerEnumType } from "@nestjs/graphql";

export enum ProcessingAudioEnum {
    MP3_TO_FLAC = `mp3_to_flac`,
    MP3_TO_WAV = `mp3_to_wav`,
    FLAC_TO_MP3 = `flac_to_mp3`,
    FLAC_TO_WAV = `flac_to_wav`,
    WAV_TO_FLAC = `wav_to_flac`,
    WAV_TO_MP3 = `wav_to_mp3`,
};

registerEnumType(ProcessingAudioEnum, {
    name: `ProcessingAudioEnum`,
    description: `All available audio conversion formats.`,
});