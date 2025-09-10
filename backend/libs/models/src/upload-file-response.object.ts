import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UploadFilesResponse {

    @Field(() => String)
    public requestId?: string;

    @Field(() => [String])
    public rejectedFiles: string[];

    @Field(() => [String])
    public acceptedFilesIds: string[]

}