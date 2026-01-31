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
            <i class="icon-user"></i> USER PROFILE
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
        <div class="header-title">PRODUCT SALE INFO</div>
        <div class="header-actions">
          <i class="icon-search"></i>
          <i class="icon-bell"></i>
          <i class="icon-user"></i>
        </div>
      </header>
      <section class="table-section">
        <div class="table-header">
          <div class="table-title">Product Sale Data</div>
          <div class="table-subtitle">Here is a subtitle for this table</div>
        </div>
        <table class="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PRODUCT</th>
              <th>QUANTITY</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sales" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.product }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.status }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const active = ref('sale')
const router = useRouter()
function goTo(path: string) {
  router.push(path)
}
const sales = ref([
  { id: 1, name: 'Makara', email: 'Makara@gmail.com', product: 'LV MEN BLACK T-SHIRT', quantity: 1, status: 'PURCHASED' },
  { id: 2, name: 'Heng', email: 'Heng@gmail.com', product: 'LV MEN BLUE POLO SHIRT', quantity: 2, status: 'PRE-ORDER' },
  { id: 3, name: 'Kanika', email: 'Kanika@gmail.com', product: 'MON COLLAR BLUE POLO SHIRT', quantity: 1, status: 'PRE-ORDER' },
  { id: 4, name: 'Makara', email: 'Makara@gmail.com', product: 'MON COLLAR WHITE T-SHIRT', quantity: 2, status: 'PRE-ORDER' },
  { id: 5, name: 'Kanika', email: 'Kanika@gmail.com', product: 'LV MEN WHITE T-SHIRT', quantity: 3, status: 'PURCHASED' },
  { id: 6, name: 'Makara', email: 'Makara@gmail.com', product: 'MON COLLAR BLUE POLO SHIRT', quantity: 2, status: 'PRE-ORDER' },
])
</script>

<style scoped>
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
</style>
