
<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        
        <span class="brand">OUTFITHUB</span>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li :class="{active: active === 'dashboard'}" @click="goTo('/admin/dashboard')">
            <i class="icon-dashboard"></i> DASHBOARD
          </li>
          <li :class="{active: active === 'profile'}" @click="goTo('/admin/users')">
            <i class="icon-user"></i> MANAGE USERS
          </li>
          <li :class="{active: active === 'table'}" @click="goTo('/admin/table')">
            <i class="icon-table"></i> ADMIN PROFILE
          </li>
          <li :class="{active: active === 'sale'}" @click="goTo('/admin/sale')">
            <i class="icon-sale"></i> PRODUCT SALE
          </li>
          <li :class="{active: active === 'stock'}" @click="goTo('/admin/stock')">
            <i class="icon-stock"></i> STOCK
          </li>
        </ul>
      </nav>
    </aside>
    <main class="admin-main">
      <header class="admin-header">
        <div class="header-title">TABLE LIST</div>
        <div class="header-actions">
          <i class="icon-search"></i>
          <i class="icon-bell"></i>
          <i class="icon-user"></i>
        </div>
      </header>
      <section class="table-section">
        <div class="table-header">
          <div class="table-title">Customer sign in</div>
          <div class="table-subtitle">Here is a subtitle for this table</div>
        </div>
        <table class="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
              <td>
                <button @click="openEditModal(user)" class="action-btn update">Update</button>
                <button @click="deleteUser(user.id)" class="action-btn delete">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Edit Modal -->
        <div v-if="showEditModal" class="modal-overlay">
          <div class="modal-content modal-centered">
            <h2 class="modal-title">Edit User Info</h2>
            <form @submit.prevent="saveEdit" class="modal-form">
              <div class="modal-field-vertical">
                <label for="edit-name">Name</label>
                <input id="edit-name" v-model="editForm.name" required />
              </div>
              <div class="modal-field-vertical">
                <label for="edit-email">Email Address</label>
                <input id="edit-email" v-model="editForm.email" type="email" required />
              </div>
              <div v-if="errorMsg" class="error-msg">{{ errorMsg }}</div>
              <div class="modal-actions">
                <button type="submit" class="action-btn update">Update</button>
                <button type="button" class="action-btn delete" @click="showEditModal = false">Cancel</button>
              </div>
            </form>
          
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { axiosInstance } from '@/api/axiosInstance'
const active = ref('profile')
const router = useRouter()
function setActive(tab: string) {
  active.value = tab
}
function goTo(path: string) {
  router.push(path)
}
const users = ref<any[]>([])
const showEditModal = ref(false)
const editUser = ref<any>(null)
const editForm = ref({ name: '', email: '' })
const errorMsg = ref('')

function openEditModal(user: any) {
  editUser.value = user
  editForm.value = { name: user.name, email: user.email }
  errorMsg.value = ''
  showEditModal.value = true
}

async function saveEdit() {
  if (!editUser.value) return
  try {
    await axiosInstance.put(`/users/${editUser.value.id}`, {
      ...editUser.value,
      name: editForm.value.name,
      email: editForm.value.email
    })
    editUser.value.name = editForm.value.name
    editUser.value.email = editForm.value.email
    showEditModal.value = false
    errorMsg.value = ''
    alert('User updated successfully!')
  } catch (err: any) {
    // Log error details to console
    console.error('Update error:', err, err?.response?.data)
    if (err?.response?.data?.message) {
      errorMsg.value = 'Failed to update user: ' + err.response.data.message
    } else if (err?.message) {
      errorMsg.value = 'Failed to update user: ' + err.message
    } else {
      errorMsg.value = 'Failed to update user.'
    }
  }
}

async function deleteUser(id: number) {
  if (!confirm('Are you sure you want to delete this user?')) return;
  try {
    await axiosInstance.delete(`/users/${id}`);
    users.value = users.value.filter(u => u.id !== id);
    errorMsg.value = '';
    alert('User deleted successfully!');
  } catch (err: any) {
    // Log error details to console
    console.error('Delete error:', err, err?.response?.data)
    if (err?.response?.data?.message) {
      errorMsg.value = 'Failed to delete user: ' + err.response.data.message
    } else if (err?.message) {
      errorMsg.value = 'Failed to delete user: ' + err.message
    } else {
      errorMsg.value = 'Failed to delete user.'
    }
  }
}
onMounted(async () => {
  try {
    const response = await axiosInstance.get('/users')
    users.value = response.data.map((user: any) => {
      const name = (user.full_name || user.username || '').toString().trim().toLowerCase();
      const email = (user.email || '').toString().trim().toLowerCase();
      const isAdmin = name === 'ang panha' && email === 'panha@gmail.com';
      return {
        id: user.id,
        name: user.full_name || user.username,
        email: user.email,
        role: isAdmin ? 'admin' : 'user',
        country: user.country || '-',
        city: user.city || '-',
      };
    })
  } catch (err) {
    users.value = []
  }
})
</script>

<style scoped>
.action-btn {
  margin-right: 8px;
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.action-btn.update {
  background: #2563eb;
  color: #fff;
}
.action-btn.delete {
  background: #ef4444;
  color: #fff;
}
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f7f7f7;
}
.sidebar {
  width: 250px;
  background: #23272b;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
}
.sidebar-header {
  display: flex;
  align-items: center;
  padding: 2rem 1.5rem 1rem 1.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 2px;
}
.logo {
  width: 36px;
  height: 36px;
  margin-right: 1rem;
}
.brand {
  font-size: 1.2rem;
  font-weight: bold;
}
.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar-nav li {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}
.sidebar-nav li.active, .sidebar-nav li:hover {
  background: #353a40;
}
.sidebar-nav i {
  margin-right: 1rem;
  font-size: 1.2rem;
}
.admin-main {
  flex: 1;
  padding: 2rem;
}
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.header-title {
  font-size: 2rem;
  font-weight: bold;
}
.header-actions i {
  margin-left: 1.5rem;
  font-size: 1.3rem;
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  min-width: 320px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.2);
}
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}
.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
.error-msg {
  color: #ef4444;
  margin-bottom: 1rem;
}
  cursor: pointer;
}
.table-section {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 2rem;
}
.table-header {
  margin-bottom: 1.5rem;
}
.table-title {
  font-size: 1.2rem;
  font-weight: bold;
}
.table-subtitle {
  font-size: 0.95rem;
  color: #888;
  margin-top: 0.2rem;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.user-table th, .user-table td {
  padding: 0.75rem 1rem;
  text-align: left;
}
.user-table th {
  background: #f7f7f7;
  color: #888;
  font-size: 0.95rem;
  font-weight: 600;
}
.user-table tr:nth-child(even) {
  background: #f7f7f7;
}
.user-table tr:nth-child(odd) {
  background: #fff;
}
.eye-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 4px;
  vertical-align: middle;
}
.modal-row {
            display: flex;
            gap: 2rem;
            margin-bottom: 1.5rem;
            justify-content: center;
          }
.modal-field {
            display: flex;
            flex-direction: column;
            flex: 1;
          }
.modal-field label {
            font-size: 0.95rem;
            margin-bottom: 0.5rem;
            color: #333;
          }
          .modal-field input {
            padding: 0.6rem 0.8rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1rem;
          }
          .modal-field-vertical {
            display: flex;
            flex-direction: column;
            margin-bottom: 1.2rem;
            width: 100%;
          }
          .modal-field-vertical label {
            font-size: 1rem;
            margin-bottom: 0.4rem;
            color: #222;
          }
          .modal-field-vertical input {
            padding: 0.7rem 1rem;
            border: 1px solid #bbb;
            border-radius: 6px;
            font-size: 1.05rem;
            width: 100%;
          }
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  border-radius: 10px;
  min-width: 400px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.2);
  max-width: 90vw;
}
.modal-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
}
.modal-form {
  width: 100%;
}
.modal-row {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}
.modal-field {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.modal-field label {
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  color: #333;
}
.modal-field input {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}
.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}
.error-msg {
  color: #ef4444;
  margin-bottom: 1rem;
  text-align: center;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  min-width: 320px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.2);
}
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}
.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
.error-msg {
  color: #ef4444;
  margin-bottom: 1rem;
}
</style>

