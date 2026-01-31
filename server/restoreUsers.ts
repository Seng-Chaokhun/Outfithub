const { createUser } = require('./repository');
const bcrypt = require('bcryptjs');

(async function restoreUsers() {
  const password = 'password123';
  const passwordHash1 = await bcrypt.hash(password, 10);
  const passwordHash2 = await bcrypt.hash(password, 10);
  await createUser({
    username: 'ang panha',
    email: 'angpanha@example.com',
    passwordHash: passwordHash1,
    role: 'user',
    fullName: 'Ang Panha',
    avatar: null,
  });
  await createUser({
    username: 'laiheng',
    email: 'laiheng@example.com',
    passwordHash: passwordHash2,
    role: 'user',
    fullName: 'Lai Heng',
    avatar: null,
  });
  console.log('Users restored');
  process.exit(0);
})().catch(e => { console.error(e); process.exit(1); });
