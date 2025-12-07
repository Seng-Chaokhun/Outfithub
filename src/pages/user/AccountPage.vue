<template>
  <div class="max-w-6xl mx-auto px-8 py-10 flex gap-10">
    <!-- LEFT SIDEBAR -->
    <aside class="w-64 space-y-6">
      <!-- User Header -->
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div class="flex items-center gap-4">
          <img
            :src="profile.avatar"
            class="w-14 h-14 rounded-full border object-cover"
            alt="avatar"
          />
          <div>
            <h2 class="font-semibold text-lg text-gray-800">{{ profile.name }}</h2>
            <p class="text-sm text-gray-500">{{ profile.username }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="space-y-2">
        <div
          v-for="item in tabs"
          :key="item.key"
          @click="activeTab = item.key"
          :class="[
            'px-4 py-2.5 rounded-xl cursor-pointer transition font-medium',
            activeTab === item.key
              ? 'bg-blue-600 text-white shadow'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50',
          ]"
        >
          {{ item.label }}
        </div>
      </nav>
    </aside>

    <!-- RIGHT CONTENT -->
    <main class="flex-1 space-y-10">
      <transition name="fade" mode="out-in">
        <!-- PROFILE -->
        <section v-if="activeTab === 'profile'" key="profile">
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
            <h1 class="text-2xl font-semibold">Profile Overview</h1>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard label="Full Name" :value="profile.name" />
              <InfoCard label="Email" :value="profile.email" />
              <InfoCard label="Username" :value="profile.username" />
              <InfoCard label="Member Since" :value="profile.joined" />
            </div>

            <button
              @click="editMode = true"
              class="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition cursor-pointer"
            >
              Edit Profile
            </button>
          </div>

          <!-- EDIT MODAL -->
          <EditProfileModal
            v-if="editMode"
            :profile="form"
            @close="editMode = false"
            @save="saveProfile"
          />
        </section>

        <!-- SECURITY -->
        <section v-else-if="activeTab === 'security'" key="security">
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
            <h1 class="text-2xl font-semibold">Security</h1>

            <SecurityCard
              title="Password"
              description="Change your password to keep your account secure."
              action="Change Password"
            />

            <SecurityCard
              title="Two-Factor Authentication"
              description="Add an extra layer of security to your account."
              action="Configure 2FA"
            />
          </div>
        </section>

        <!-- DEVICES -->
        <section v-else-if="activeTab === 'devices'" key="devices">
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
            <h1 class="text-2xl font-semibold">Logged-in Devices</h1>

            <DeviceCard v-for="d in sessions" :key="d.id" :device="d" />
          </div>
        </section>

        <!-- NOTIFICATIONS -->
        <section v-else key="notifications">
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <h1 class="text-2xl font-semibold mb-6">Notifications</h1>

            <ToggleRow
              label="Email Alerts"
              description="Get notifications for updates and security warnings."
              v-model="preferences.emailAlerts"
            />

            <ToggleRow
              label="Marketing Emails"
              description="Receive occasional product updates."
              v-model="preferences.marketing"
            />
          </div>
        </section>
      </transition>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from 'vue'
import InfoCard from '@/components/account/InfoCard.vue'
import EditProfileModal from '@/components/account/EditProfileModal.vue'
import SecurityCard from '@/components/account/SecurityCard.vue'
import DeviceCard from '@/components/account/DeviceCard.vue'
import ToggleRow from '@/components/account/ToggleRow.vue'
import type Profile from '@/interfaces/Profile'

const props = defineProps<{ id: string }>()

// Sidebar Tabs
const tabs = [
  { key: 'profile', label: 'Profile Overview' },
  { key: 'security', label: 'Security' },
  { key: 'devices', label: 'Devices & Sessions' },
  { key: 'notifications', label: 'Notifications' },
]

const activeTab = ref('profile')

// Profile State
const profile = reactive<Profile>({
  name: 'John Doe',
  email: 'john@example.com',
  username: 'johnny',
  avatar: '',
  joined: '',
})

const form = reactive({ ...profile })
const editMode = ref(false)

// Mock device sessions
const sessions = reactive([
  { id: 1, device: 'Chrome on Windows 10', location: 'Cambodia', lastActive: '5 minutes ago' },
  { id: 2, device: 'Safari on iPhone', location: 'Phnom Penh', lastActive: '2 hours ago' },
])

// Notification preferences
const preferences = reactive({
  emailAlerts: true,
  marketing: false,
})

// Mock profile fetch
const fetchProfile = async (id: string) => {
  await new Promise((r) => setTimeout(r, 300))
  profile.name = `User ${id}`
  profile.email = `user${id}@example.com`
  profile.username = `user${id}`
  profile.joined = '2023-04-10'
  profile.avatar = `https://api.dicebear.com/7.x/identicon/svg?seed=${id}`
  Object.assign(form, profile)
}

const saveProfile = (updated: Partial<Profile>) => {
  Object.assign(profile, updated)
  editMode.value = false
}

onMounted(() => fetchProfile(props.id))
watch(
  () => props.id,
  (newId) => fetchProfile(newId),
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
