import { graphqlUploadExpress } from 'graphql-upload/graphqlUploadExpress';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { HelloResolver } from './hello.resolver';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: true,
      csrfPrevention: false,
      sortSchema: true,
      path: `api/v1/graphql`,
      introspection: true
    })
  ],
  providers: [
    HelloResolver
  ],
})

export class AppModule implements NestModule {

  public async configure(consumer: MiddlewareConsumer): Promise<void> {
    consumer
      .apply(graphqlUploadExpress())
      .forRoutes(`api/v1/graphql`)
  }

}