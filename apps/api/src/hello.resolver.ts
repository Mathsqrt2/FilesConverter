import { Resolver,Query } from "@nestjs/graphql";

@Resolver()
export class HelloResolver {

    @Query(() => String, { name: "hello" })
    hello(): string {
        return "Hello World!";
    }

}