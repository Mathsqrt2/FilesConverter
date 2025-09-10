import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';
import { FilesConversionResolver } from './conversion/conversion.resolver';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FilesConversionModule } from './conversion/conversion.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConversionStatusModule } from './status/status.module';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import { GraphQLModule } from '@nestjs/graphql';
import { LoggerModule } from '@libs/logger';
import { S3Module } from '@libs/s3';

@Module({
  imports: [
    FilesConversionModule,
    ConversionStatusModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: true,
      csrfPrevention: false,
      sortSchema: true,
      path: `api/v1/graphql`,
      introspection: true,
      resolvers: { Upload: GraphQLUpload },
    }),
    S3Module,
    LoggerModule.forFeature([FilesConversionResolver]),
  ],
})

export class AppModule implements NestModule {

  public async configure(consumer: MiddlewareConsumer): Promise<void> {
    consumer

      .apply(graphqlUploadExpress({
        maxFileSize: 5_000_000_000,
        maxFiles: 20,
      }))
      .forRoutes(`api/v1/graphql`)
  }

}