# nestjs-graphql_multiple-endpoints-bug

If you start this application you can open two graphql endpoints:

```
http://localhost:3000/recipes
http://localhost:3000/foo
```

However, each one will find all the types and resolvers for both modules (FooModule and RecipesModule), 
even though they are set to include only a specific module each:

```typescript
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
```

By example, even though `foos` is listed in the schema for both, the following query will only work on /foo:

```gql
query Query {
  foos {
    id
  }
}
```

Note: `autoSchemaFile: true` exhibits the same result.

However, the most serious result of this is that you can have any resolvers or types with clashing names between 
the two modules.

