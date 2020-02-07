import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { FooResolver } from './foo.resolver';
import { FoosService } from './foo.service';

@Module({
  providers: [FooResolver, FoosService, DateScalar],
})
export class FooModule {}
