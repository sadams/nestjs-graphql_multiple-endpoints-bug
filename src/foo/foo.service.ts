import { Injectable } from '@nestjs/common';
import { NewFooInput } from './dto/new-foo.input';
import { FoosArgs } from './dto/foos.args';
import { Foo } from './models/foo';

@Injectable()
export class FoosService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  async create(data: NewFooInput): Promise<Foo> {
    return {} as any;
  }

  async findOneById(id: string): Promise<Foo> {
    return {} as any;
  }

  async findAll(foosArgs: FoosArgs): Promise<Foo[]> {
    const foo = new Foo();
    foo.id = 'fooid';
    foo.title = 'footitle';
    foo.creationDate = new Date();
    foo.ingredients = ['bar'];
    return [foo];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
