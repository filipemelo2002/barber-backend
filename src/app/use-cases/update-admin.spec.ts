import { InMemoryAdminRepository } from '@test/repositories/in-memory-admin-repository';
import { UpdateAdmin } from './update-admin';
import { makeAdmin } from '@test/factories/admin-factory';
import { AdminNotFound } from './errors/admin-not-found';

describe('Update Admin', () => {
  it("should update the admin's insformation", async () => {
    const adminRespository = new InMemoryAdminRepository();
    const admin = makeAdmin();
    adminRespository.admins = [admin];
    const updateAdminService = new UpdateAdmin(adminRespository);

    await updateAdminService.execute({
      id: admin.id,
      name: 'filipe melo',
    });

    expect(adminRespository.admins[0].name).toEqual('filipe melo');
  });

  it("should not update a admin's information", () => {
    const adminRepository = new InMemoryAdminRepository();
    const updateAdminService = new UpdateAdmin(adminRepository);

    expect(() => {
      return updateAdminService.execute({ id: 'whatever-non-existing-id' });
    }).rejects.toThrow(AdminNotFound);
  });
});
