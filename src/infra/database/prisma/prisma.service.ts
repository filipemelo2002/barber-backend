import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}

const devDataSource: Prisma.Datasources = {
  db: { url: 'file:./dev.db' },
};

const prodDataSource: Prisma.Datasources = {
  db: { url: process.env.DATABASE_URL },
};

export const prismaService = new PrismaService({
  datasources:
    process.env.ENVIRONMENT === 'development' ? devDataSource : prodDataSource,
});
