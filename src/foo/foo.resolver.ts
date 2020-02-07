import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewFooInput } from './dto/new-foo.input';
import { FoosArgs } from './dto/foos.args';
import { Foo } from './models/foo';
import { FoosService } from './foo.service';

const pubSub = new PubSub();

@Resolver(of => Foo)
export class FooResolver {
  constructor(private readonly foosService: FoosService) {}

  @Query(returns => Foo)
  async foo(@Args('id') id: string): Promise<Foo> {
    const foo = await this.foosService.findOneById(id);
    if (!foo) {
      throw new NotFoundException(id);
    }
    return foo;
  }

  @Query(returns => [Foo])
  foos(@Args() fooArgs: FoosArgs): Promise<Foo[]> {
    return this.foosService.findAll(fooArgs);
  }

  @Mutation(returns => Foo)
  async addFoo(
      @Args('newFooData') newFooData: NewFooInput,
  ): Promise<Foo> {
    const foo = await this.foosService.create(newFooData);
    pubSub.publish('fooAdded', { fooAdded: foo });
    return foo;
  }

  @Mutation(returns => Boolean)
  async removeFoo(@Args('id') id: string) {
    return this.foosService.remove(id);
  }

  @Subscription(returns => Foo)
  fooAdded() {
    return pubSub.asyncIterator('fooAdded');
  }
}
