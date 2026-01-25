# Profile Module Implementation

This document summarizes the migration of profile functionality from a monolithic page to a modular feature structure similar to auth.

## Architecture Changes

### Before
- Profile data loosely coupled in `src/pages/user/AccountPage.vue`
- Mock fetches with hardcoded logic
- No backend integration

### After
- Feature module: `src/feature/profile/`
  - `services.ts` - API calls to backend
  - `store.ts` - Pinia store for state management
  - `routes.ts` - Route definitions
  - `views/AccountView.vue` - Main profile view component
- Backend: `server/profile.route.ts` + `server/profile.services.ts`
- Shared interfaces: `shared/interfaces/domain/profile.domain.ts`

## Database Schema Changes

Added columns to `users` table:
- `full_name VARCHAR(255)` - User's full name
- `avatar_url TEXT` - Avatar image URL

## API Endpoints

### GET /api/profile/:id
Fetch a user's profile.

**Response:**
```json
{
  "success": true,
  "message": "Profile fetched",
  "payload": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "username": "john_doe",
    "avatar": "https://...",
    "joined": "2023-04-10"
  }
}
```

### PUT /api/profile/:id
Update a user's profile.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "username": "jane_doe",
  "avatar": "https://..."
}
```

**Response:** Same as GET with updated data.

## Registration Form Updates

The registration form now includes:
- `name` - Full name (new)
- `username` - Username
- `email` - Email
- `password` - Password
- `confirmPassword` - Password confirmation
- `avatar` - Optional avatar URL

## Store Usage

```typescript
import { useProfileStore } from '@/feature/profile/store'

const store = useProfileStore()

// Fetch profile
await store.fetchProfile(userId)
const profile = store.profile

// Update profile
const response = await store.updateProfile(userId, {
  name: 'New Name',
  email: 'new@email.com',
  username: 'newusername',
})

// Access loading/error states
const { loading, error } = store
```

## Migration Notes

1. Old `AccountPage.vue` still exists in `src/pages/user/` but is no longer used
2. New `AccountView.vue` is in `src/feature/profile/views/`
3. Router updated to use profile routes instead of inline AccountPage
4. Components (EditProfileModal, SecurityCard, etc.) remain in `src/components/account/`

## Testing the Profile System

1. Register a new account (includes full name now)
2. Navigate to `/account/<user-id>` to view profile
3. Click "Edit Profile" to modify profile data
4. Updates persist in the database

## Server Profile Service

Location: `server/profile.services.ts`

Functions:
- `getProfile(id)` - Fetch user profile
- `updateProfile(id, data)` - Update profile, validates uniqueness of username/email
