import { Role, RoleType } from '../roles/role.entity';

export async function createRoles(dataSource) {
  const repo = dataSource.getRepository(Role);

  const rolesToCreate = [RoleType.DRIVER];

  for (const roleName of rolesToCreate) {
    const existing = await repo.findOne({ where: { name: roleName } });

    if (!existing) {
      const role = repo.create({ name: roleName });
      await repo.save(role);
      console.log(`Created role: ${roleName}`);
    } else {
      console.log(`Role already exists: ${roleName}`);
    }
  }
}
