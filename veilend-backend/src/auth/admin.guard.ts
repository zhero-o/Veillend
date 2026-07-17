import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user?.walletAddress) {
      throw new UnauthorizedException('No user authenticated');
    }

    const admin = await this.prisma.admin.findUnique({
      where: { walletAddress: user.walletAddress },
    });

    if (!admin) {
      throw new UnauthorizedException('User is not an admin');
    }

    return true;
  }
}
