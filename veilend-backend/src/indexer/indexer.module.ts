import { Module } from '@nestjs/common';
import { StellarModule } from '../stellar/stellar.module';
import { IndexerRepository } from './indexer.repository';
import { IndexerService } from './indexer.service';
import { IndexerController } from './indexer.controller';

@Module({
  imports: [StellarModule],
  controllers: [IndexerController],
  providers: [IndexerRepository, IndexerService],
  exports: [IndexerService, IndexerRepository],
})
export class IndexerModule {}
