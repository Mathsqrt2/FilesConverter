import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { HelloResolver } from './hello.resolver';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: true,
      csrfPrevention: false,
      sortSchema: true,
      path: `graphql`,
      introspection: true

    })
  ],
  providers: [
    HelloResolver
  ],
})

export class AppModule { }