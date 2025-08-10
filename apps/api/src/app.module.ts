import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
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
  controllers: [
    AppController
  ],
  providers: [
    HelloResolver
  ],
})

export class AppModule { }