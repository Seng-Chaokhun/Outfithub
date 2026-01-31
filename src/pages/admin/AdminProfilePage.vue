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
        <div class="header-title">ADMIN PROFILE</div>
        <div class="header-actions">
          <i class="icon-search"></i>
          <i class="icon-bell"></i>
          <i class="icon-user"></i>
        </div>
      </header>
      <div class="admin-profile-container">
        <div class="admin-profile-content">
          <div class="admin-profile-form-card">
            <h2>Edit Profile</h2>
            <form class="admin-profile-form">
              <div class="form-row">
                <div class="form-group">
                  <label>COMPANY (DISABLED)</label>
                  <input type="text" value="Panha" disabled />
                </div>
                <div class="form-group">
                  <label>USERNAME</label>
                  <input type="text" value="panha" disabled />
                </div>
                <div class="form-group">
                  <label>EMAIL ADDRESS</label>
                  <input type="email" value="panha@gmail.com" disabled />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>FIRST NAME</label>
                  <input type="text" value="Ang" />
                </div>
                <div class="form-group">
                  <label>LAST NAME</label>
                  <input type="text" value="Panha" />
                </div>
              </div>
              <div class="form-group">
                <label>ADDRESS</label>
                <input type="text" value="Phnom Penh, Cambodia" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>CITY</label>
                  <input type="text" value="Phnom Penh" />
                </div>
                <div class="form-group">
                  <label>COUNTRY</label>
                  <input type="text" value="Cambodia" />
                </div>
                <div class="form-group">
                  <label>POSTAL CODE</label>
                  <input type="text" value="" placeholder="ZIP Code" />
                </div>
              </div>
              <div class="form-group">
                <label>ABOUT ME</label>
                <textarea rows="3">I'm a OUTFITHUB owner, will release stylish clothes for sale .</textarea>
              </div>
              <button class="update-btn" type="button">Update Profile</button>
            </form>
          </div>
          <div class="admin-profile-info-card">
            <img class="profile-img" src="@/assets/images/others/user-profile-icon-circle_1256048-12499.avif" alt="Profile" />
            <div class="profile-info">
              <div class="profile-name">Ang Panha</div>
              <div class="profile-username">Panha</div>
              <div class="profile-bio">I'm outfithub owner, having clothes on sale a lot</div>
              <div class="profile-socials">
                <i class="icon-facebook"></i>
                <i class="icon-twitter"></i>
                <i class="icon-github"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const active = ref('table')
const router = useRouter()
function goTo(path) {
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
.admin-profile-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.admin-profile-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
}
.admin-profile-content {
  display: flex;
  gap: 2rem;
}
.admin-profile-form-card {
  flex: 2;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 2rem;
}
.admin-profile-form h2 {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}
.admin-profile-form .form-row {
  display: flex;
  gap: 1.5rem;
}
.admin-profile-form .form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
}
.admin-profile-form label {
  font-size: 0.95rem;
  color: #888;
  margin-bottom: 0.3rem;
}
.admin-profile-form input,
.admin-profile-form textarea {
  padding: 0.7rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  background: #fff;
}
.admin-profile-form textarea {
  resize: vertical;
}
.update-btn {
  background: #0ec6d5;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.7rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.2s;
}
.update-btn:hover {
  background: #0ba7b8;
}
.admin-profile-info-card {
  flex: 1;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profile-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}
.profile-info {
  text-align: center;
}
.profile-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
}
.profile-username {
  color: #0ec6d5;
  font-size: 1rem;
  margin-bottom: 0.7rem;
}
.profile-bio {
  font-size: 0.95rem;
  color: #666;
  margin-bottom: 1rem;
}
.profile-socials i {
  font-size: 1.3rem;
  margin: 0 0.5rem;
  color: #888;
  cursor: pointer;
}
.profile-socials i:hover {
  color: #0ec6d5;
}
</style>
