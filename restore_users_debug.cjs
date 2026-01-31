// Debug script to print error details for user restoration
const axios = require('axios')

async function restoreUsers() {
  const users = [
    {
      name: 'Ang Panha',
      username: 'ang panha',
      email: 'angpanha@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    },
    {
      name: 'Lai Heng',
      username: 'laiheng',
      email: 'laiheng@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    },
  ]
  for (const user of users) {
    try {
      const res = await axios.post('http://localhost:3000/api/auth', {
        action: 'register',
        data: user,
      })
      console.log(`Restored user: ${user.username}`, res.data.success ? 'OK' : res.data)
    } catch (e) {
      if (e.response) {
        console.error(`Failed to restore user: ${user.username}`, e.response.data)
      } else {
        console.error(`Failed to restore user: ${user.username}`, e.message)
      }
    }
  }
}
restoreUsers()
