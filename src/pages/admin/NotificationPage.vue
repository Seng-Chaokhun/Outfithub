
<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <img src="/logo.png" alt="Outfithub Logo" class="logo" />
        <span class="brand">OUTFITHUB</span>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li :class="{active: active === 'dashboard'}" @click="goTo('/admin/dashboard')">
            <i class="icon-dashboard"></i> DASHBOARD
          </li>
        </ul>
      </nav>
    </aside>
    <main class="admin-main">
      <header class="admin-header">
        <div class="header-title">NOTIFICATION</div>
        <div class="header-actions">
          <i class="icon-search"></i>
          <i class="icon-bell"></i>
          <i class="icon-user"></i>
        </div>
      </header>
      <section class="notification-section">
        <div class="notification-header">
          <div class="notification-title">Notifications</div>
          <div class="notification-subtitle">these recent updated notification for 24h. <a href="#" class="sync-link">Sync now.</a></div>
        </div>
        <div class="notification-list-title">Here are the Notifications</div>
        <div class="notification-list">
          <div v-for="(n, i) in notifications" :key="i" :class="['notification', n.type]">
            <span class="icon">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2Zm6-6V11c0-3.07-1.63-5.64-5-6.32V4a1 1 0 1 0-2 0v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29A1 1 0 0 0 5 19h14a1 1 0 0 0 .71-1.71L18 16Z" fill="#fff"/></svg>
            </span>
            <span class="text">{{ n.text }}</span>
            <button class="close-btn" @click="removeNotification(i)">×</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const active = ref('notifications')
const router = useRouter()
function goTo(path: string) {
  router.push(path)
}
const notifications = ref([
  { type: 'info', text: 'This is a notification with close button and icon.' },
  { type: 'info', text: 'This is a notification with close button and icon and have many lines. You can see that the icon and the close button are always vertically aligned. This is a beautiful notification. So you don\'t have to worry about the style.' },
  { type: 'error', text: 'This is a notification with close button and icon and have many lines. You can see that the icon and the close button are always vertically aligned. This is a beautiful notification. So you don\'t have to worry about the style.' },
  { type: 'error', text: 'This is a notification with close button and icon and have many lines. You can see that the icon and the close button are always vertically aligned. This is a beautiful notification. So you don\'t have to worry about the style.' },
])
function removeNotification(index: number) {
  notifications.value.splice(index, 1)
}
</script>

<style scoped>
.admin-layout {
        notifications.value.splice(index, 1)

      }
