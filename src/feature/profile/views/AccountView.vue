<template>
  <div>
    <MainHeader />
    <div class="content-container flex gap-10">
      <aside class="w-64 space-y-6">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div class="flex items-center gap-4">
            <img
              :src="profile?.avatar || fallbackAvatar"
              class="w-14 h-14 rounded-full border object-cover"
              alt="avatar"
            />
            <div>
              <h2 class="font-semibold text-lg text-gray-800">
                {{ profile?.name || 'Loading...' }}
              </h2>
              <p class="text-sm text-gray-500">{{ profile?.username }}</p>
            </div>
          </div>
        </div>

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

      <main class="flex-1 space-y-10">
        <transition name="fade" mode="out-in">
          <section v-if="loading" key="loading" class="bg-white p-8 rounded-2xl shadow-sm border">
            Loading profile...
          </section>
          <section v-else-if="error" key="error" class="bg-white p-8 rounded-2xl shadow-sm border">
            {{ error }}
          </section>

          <section v-else-if="activeTab === 'profile'" key="profile">
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
              <h1 class="text-2xl font-semibold">Profile Overview</h1>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard label="Full Name" :value="profile?.name || ''" />
                <InfoCard label="Email" :value="profile?.email || ''" />
                <InfoCard label="Username" :value="profile?.username || ''" />
                <InfoCard label="Member Since" :value="profile?.joined || ''" />
              </div>

              <button
                @click="openEdit"
                class="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition cursor-pointer"
              >
                Edit Profile
              </button>
            </div>

            <EditProfileModal
              v-if="editMode"
              ref="editModal"
              :profile="form"
              @close="editMode = false"
              @save="saveProfile"
            />
          </section>

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

          <section v-else-if="activeTab === 'devices'" key="devices">
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
              <h1 class="text-2xl font-semibold">Logged-in Devices</h1>

              <DeviceCard v-for="d in sessions" :key="d.id" :device="d" />
            </div>
          </section>

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
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch, computed } from 'vue'
import InfoCard from '@/components/account/InfoCard.vue'
import EditProfileModal from '@/components/account/EditProfileModal.vue'
import SecurityCard from '@/components/account/SecurityCard.vue'
import DeviceCard from '@/components/account/DeviceCard.vue'
import ToggleRow from '@/components/account/ToggleRow.vue'
import MainHeader from '@/components/main/MainHeader.vue'
import { useProfileStore } from '../store'
import type * as I from '@/../shared/interfaces'

const props = defineProps<{ id: string }>()

const store = useProfileStore()
const { profile, loading, error } = store

const tabs = [
  { key: 'profile', label: 'Profile Overview' },
  { key: 'security', label: 'Security' },
  { key: 'devices', label: 'Devices & Sessions' },
  { key: 'notifications', label: 'Notifications' },
]
const activeTab = ref('profile')

const fallbackAvatar = computed(
  () => profile?.avatar || `https://api.dicebear.com/7.x/identicon/svg?seed=${props.id}`,
)

const form = reactive<I.ProfileUpdateForm>({})
const editMode = ref(false)
const editModal = ref<InstanceType<typeof EditProfileModal> | null>(null)

const sessions = reactive([
  { id: 1, device: 'Chrome on Windows 10', location: 'Cambodia', lastActive: '5 minutes ago' },
  { id: 2, device: 'Safari on iPhone', location: 'Phnom Penh', lastActive: '2 hours ago' },
])

const preferences = reactive({
  emailAlerts: true,
  marketing: false,
})

const openEdit = () => {
  if (profile) {
    Object.assign(form, {
      name: profile.name,
      email: profile.email,
      username: profile.username,
      avatar: profile.avatar,
    })
  }
  editMode.value = true
}

const saveProfile = async (updated: I.ProfileUpdateForm) => {
  try {
    const merged = { ...form, ...updated }
    const response = await store.updateProfile(props.id, merged)
    if (response?.success && response.payload) {
      Object.assign(form, response.payload)
      editModal.value?.showSuccess()
    } else {
      editModal.value?.setError(response?.message || 'Failed to save profile')
    }
  } catch (err) {
    editModal.value?.setError(err instanceof Error ? err.message : 'Failed to save profile')
  }
}

onMounted(async () => {
  await store.fetchProfile(props.id)
  if (profile) document.title = `${profile.username} (${profile.name})`
})

watch(
  () => props.id,
  async (newId) => {
    await store.fetchProfile(newId)
  },
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
