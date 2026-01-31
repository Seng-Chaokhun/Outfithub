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
        <div class="header-title">STOCK</div>
        <div class="header-actions">
          <i class="icon-search"></i>
          <i class="icon-bell"></i>
          <i class="icon-user"></i>
        </div>
      </header>
      <section class="table-section">
        <div class="stock-tabs">
          <span :class="{active: tab === 'men'}" @click="tab = 'men'">MEN</span>
          <span :class="{active: tab === 'women'}" @click="tab = 'women'">WOMEN</span>
        </div>
        <div class="table-header">
          <div class="table-title">Men’s clothes</div>
          <div class="table-subtitle">Here is a subtitle for this table</div>
        </div>
        <table class="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>PRODUCT NAME</th>
              <th>CODE</th>
              <th>STOCK</th>
              <th>QUANTITY</th>
              <th>SIZE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredStock" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.stock }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.size }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
const active = ref('stock')
const tab = ref('men')
const router = useRouter()
function goTo(path: string) {
  router.push(path)
}
const stock = ref([
  { id: 1, name: 'LV MEN BLACK T-SHIRT', code: 'SE-2212', stock: 'IN STOCK', quantity: 1, size: 'X,XL', gender: 'men' },
  { id: 2, name: 'LV MEN BLUE POLO SHIRT', code: 'SE-2211', stock: 'IN STOCK', quantity: 2, size: 'X,XL', gender: 'men' },
  { id: 3, name: 'MON COLLAR BLUE POLO SHIRT', code: 'SE-2210', stock: 'IN STOCK', quantity: 1, size: 'X,XL', gender: 'men' },
  { id: 4, name: 'MON COLLAR WHITE T-SHIRT', code: 'SE-2213', stock: 'OUT STOCK', quantity: 2, size: 'X,XL', gender: 'men' },
  { id: 5, name: 'LV MEN WHITE T-SHIRT', code: 'SE-2215', stock: 'OUT STOCK', quantity: 3, size: 'X,XL', gender: 'men' },
  { id: 6, name: 'MON COLLAR BLUE POLO SHIRT', code: 'SE-2214', stock: 'OUT STOCK', quantity: 2, size: 'X,XL', gender: 'men' },
  // Add women stock if needed
])
const filteredStock = computed(() => stock.value.filter(item => item.gender === tab.value))
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
.stock-tabs {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
}
.stock-tabs span {
  cursor: pointer;
  color: #888;
  border-bottom: 2px solid transparent;
  padding-bottom: 4px;
}
.stock-tabs span.active {
  color: #23272b;
  border-bottom: 2px solid #23272b;
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
