import { makeAdmin } from '@test/factories/admin-factory';
import { InMemoryAdminRepository } from '@test/repositories/in-memory-admin-repository';
import { GetAdmin } from './get-admin';
import { AdminNotFound } from './errors/admin-not-found';

describe('Get Admin', () => {
  it('should get a specific admin', async () => {
    const adminRepository = new InMemoryAdminRepository();
    const sampleAdmin = makeAdmin();
    adminRepository.admins = [sampleAdmin];
    const getAdmin = new GetAdmin(adminRepository);

    const { admin } = await getAdmin.execute({
      adminId: sampleAdmin.id,
    });

    expect(admin).toBe(sampleAdmin);
  });

  it('should not get a specific admin', async () => {
    const adminRepository = new InMemoryAdminRepository();
    const getAdmin = new GetAdmin(adminRepository);

    expect(() => {
      return getAdmin.execute({ adminId: 'whatever-non-existing-id' });
    }).rejects.toThrow(AdminNotFound);
  });
});
