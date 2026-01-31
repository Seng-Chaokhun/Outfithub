<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
       
        <span class="brand">OUTFITHUB</span>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li :class="{active: active === 'dashboard'}" @click="goTo('dashboard')">
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
          <li :class="{active: active === 'notifications'}" @click="goTo('/admin/notifications')">
            <i class="icon-bell"></i> NOTIFICATIONS
          </li>
        </ul>
      </nav>
    </aside>
    <main class="admin-main">
      <header class="admin-header">
        <div class="header-title">Dashboard</div>
        <div class="header-actions">
          <i class="icon-search"></i>
          <i class="icon-bell"></i>
          <i class="icon-user"></i>
        </div>
      </header>
      <section class="dashboard-cards">
        <div class="card">
          <div class="card-title">Customer</div>
          <div class="card-value">150</div>
          <div class="card-footer">Update Now</div>
        </div>
        <div class="card">
          <div class="card-title">Revenue</div>
          <div class="card-value">$1,345</div>
          <div class="card-footer">Last day</div>
        </div>
        <div class="card">
          <div class="card-title">Errors</div>
          <div class="card-value">23</div>
          <div class="card-footer">In the last hour</div>
        </div>
        <div class="card">
          <div class="card-title">Followers</div>
          <div class="card-value">+45K</div>
          <div class="card-footer">Update now</div>
        </div>
      </section>
     
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const active = ref('dashboard')
const router = useRouter()
function setActive(tab: string) {
  active.value = tab
}
function goTo(path: string) {
  router.push(path)
}
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
.dashboard-cards {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}
.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 1.5rem 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.card-title {
  font-size: 1rem;
  color: #888;
  margin-bottom: 0.5rem;
}
.card-value {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.card-footer {
  font-size: 0.9rem;
  color: #aaa;
}
.dashboard-content {
  display: flex;
  gap: 2rem;
}
.dashboard-chart, .dashboard-pie {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 2rem;
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.dashboard-pie {
  flex: 1;
  align-items: center;
}
.chart-title, .pie-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.chart-img, .pie-img {
  width: 100%;
  max-width: 400px;
  height: auto;
  margin-top: 1rem;
}
</style>
