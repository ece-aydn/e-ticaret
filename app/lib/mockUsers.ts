// Mock kullanıcı verileri
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "student" | "company";
}

export const mockUsers: User[] = [
  {
    id: "1",
    email: "ogrenci@example.com",
    password: "123456",
    name: "Ahmet Yılmaz",
    role: "student",
  },
  {
    id: "2",
    email: "sirket@example.com",
    password: "123456",
    name: "Tech Corp",
    role: "company",
  },
  {
    id: "3",
    email: "demo@example.com",
    password: "demo123",
    name: "Demo Kullanıcı",
    role: "student",
  },
];

export function findUserByEmail(email: string): User | undefined {
  return mockUsers.find((user) => user.email === email);
}

export function validateUser(email: string, password: string): User | null {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
}


























