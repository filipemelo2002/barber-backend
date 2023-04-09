import { makeAdmin } from '@test/factories/admin-factory';
import { InMemoryAdminRepository } from '@test/repositories/in-memory-admin-repository';
import { AuthAdmin } from './auth-admin';
import { CreateAdmin } from './create-admin';
import { JwtMockService } from '@test/mocks/jwt-mock-service';
import { AdminIncorrectPassword } from './errors/admin-incorrect-password';

describe('Admin auth service', () => {
  it('should authenticate admin', async () => {
    const adminRepository = new InMemoryAdminRepository();
    const createAdmin = new CreateAdmin(adminRepository);
    const admin = makeAdmin();
    await createAdmin.execute({
      email: admin.email,
      name: admin.name,
      phone: admin.phone,
      password: admin.password,
    });
    const jwtService = new JwtMockService(adminRepository);
    const authService = new AuthAdmin(adminRepository, jwtService);

    const { token } = await authService.execute({
      email: admin.email,
      password: 'test',
    });

    expect(token).toBeTruthy();
    expect(token).toMatch(admin.email);
  });

  it('should authenticate admin', async () => {
    const adminRepository = new InMemoryAdminRepository();
    const createAdmin = new CreateAdmin(adminRepository);
    const admin = makeAdmin();
    await createAdmin.execute({
      email: admin.email,
      name: admin.name,
      phone: admin.phone,
      password: admin.password,
    });
    const jwtService = new JwtMockService(adminRepository);
    const authService = new AuthAdmin(adminRepository, jwtService);

    expect(() => {
      return authService.execute({
        email: admin.email,
        password: 'whatever-wrong-password',
      });
    }).rejects.toThrow(AdminIncorrectPassword);
  });
});
