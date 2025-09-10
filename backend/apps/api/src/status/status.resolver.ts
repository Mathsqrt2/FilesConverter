import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class ConversionStatusResolver {

    @Query(() => String, { name: "status" })
    public async hello(): Promise<string> {
        return "status";
    }
    
}