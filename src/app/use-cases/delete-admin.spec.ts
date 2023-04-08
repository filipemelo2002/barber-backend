import { makeAdmin } from '@test/factories/admin-factory';
import { InMemoryAdminRepository } from '@test/repositories/in-memory-admin-repository';
import { DeleteAdmin } from './delete-admin';
import { AdminNotFound } from './errors/admin-not-found';

describe('Delete Admin', () => {
  it('should delete a Admin', async () => {
    const adminRepository = new InMemoryAdminRepository();
    const admin = makeAdmin();
    adminRepository.admins = [admin];
    const adminService = new DeleteAdmin(adminRepository);

    await adminService.execute({ id: admin.id });

    expect(adminRepository.admins).toHaveLength(0);
  });

  it('should thorw an error when deleting a admin', async () => {
    const adminRepository = new InMemoryAdminRepository();
    const adminService = new DeleteAdmin(adminRepository);

    expect(() => {
      return adminService.execute({ id: 'whatever-non-existing-id' });
    }).rejects.toThrow(AdminNotFound);
  });
});
