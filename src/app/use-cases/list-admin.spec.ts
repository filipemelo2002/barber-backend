import { InMemoryAdminRepository } from '@test/repositories/in-memory-admin-repository';
import { ListAdmins } from './list-admins';
import { makeAdmin } from '@test/factories/admin-factory';

describe('List Admin', () => {
  it('should list the admins', async () => {
    const adminRepository = new InMemoryAdminRepository();
    adminRepository.admins = [makeAdmin()];
    const service = new ListAdmins(adminRepository);
    const { admins } = await service.execute();
    expect(admins).toHaveLength(1);
  });
});
