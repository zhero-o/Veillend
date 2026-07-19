import { Module } from '@nestjs/common';
import { HorizonService } from './horizon.service';
import { SorobanRpcService } from './soroban-rpc.service';
import { StellarAccountService } from './stellar-account.service';

@Module({
  providers: [HorizonService, SorobanRpcService, StellarAccountService],
  exports: [HorizonService, SorobanRpcService, StellarAccountService],
})
export class StellarModule {}
