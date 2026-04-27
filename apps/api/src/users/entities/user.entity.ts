import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  BASIC = 'basic',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'text', nullable: true })
  profilePicture: string | null;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.BASIC })
  role: UserRole;
}
