import { InMemoryAdminRepository } from '@test/repositories/in-memory-admin-repository';
import { CreateAdmin } from './create-admin';

describe('create admin use-case', () => {
  it('should create a new admin', async () => {
    const adminRepository = new InMemoryAdminRepository();
    const service = new CreateAdmin(adminRepository);
    const { admin } = await service.execute({
      email: 'filipe@test.com',
      name: 'filipe',
      phone: '+55819999999',
      password: 'test',
    });

    expect(adminRepository.admins).toHaveLength(1);
    expect(adminRepository.admins[0]).toEqual(admin);
  });
});
