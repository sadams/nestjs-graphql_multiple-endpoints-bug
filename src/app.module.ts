import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RecipesModule } from './recipes/recipes.module';
import { FooModule } from './foo/foo.module';

@Module({
  imports: [
    RecipesModule,
    GraphQLModule.forRoot({
      path: '/recipes',
      autoSchemaFile: 'schema.gql',
      include: [RecipesModule],
    }),
    FooModule,
    GraphQLModule.forRoot({
      path: '/foo',
      autoSchemaFile: 'fooschema.gql',
      include: [FooModule],
    }),
  ],
})
export class AppModule {}
