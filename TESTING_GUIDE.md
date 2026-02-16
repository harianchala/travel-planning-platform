# Traveloop - Functional Testing Guide

## Test Environment Setup
- Browser: Chrome/Firefox/Safari (latest)
- Network: Test both online and offline scenarios
- Device: Desktop and mobile viewports
- Environment: Staging/Production deployment

## Pre-Test Requirements
1. Environment variables configured in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `STRIPE_SECRET_KEY` (optional)
   - `OPENWEATHER_API_KEY` (optional)

2. Supabase Database Setup:
   - Run SQL migration scripts in order:
     - `scripts/supabase/01-create-tables.sql`
     - `scripts/supabase/02-create-rls-policies.sql`
     - `scripts/supabase/03-seed-initial-data.sql`

3. Test User Accounts:
   - Create test user via signup form
   - Use different email addresses for each test case

---

## 1. Authentication Flow Testing

### 1.1 Landing Page Test
- [ ] Landing page loads without errors
- [ ] Navigation shows "Login" and "Sign Up" buttons when not authenticated
- [ ] Navigation shows "Dashboard" button when authenticated
- [ ] Clicking "Dashboard" redirects to dashboard (if logged in)
- [ ] Clicking "Login" redirects to login page (if not logged in)

### 1.2 Sign Up Test
- [ ] Navigate to `/auth/register`
- [ ] Form displays all required fields (name, email, password, confirm password)
- [ ] Password must be at least 6 characters - test validation
- [ ] Passwords must match - test validation
- [ ] Successfully create new account with valid credentials
- [ ] Email validation works (invalid emails rejected)
- [ ] After signup, user redirects to dashboard
- [ ] Duplicate email signup shows error

### 1.3 Login Test
- [ ] Navigate to `/auth/login`
- [ ] Form displays email and password fields
- [ ] Login with correct credentials succeeds
- [ ] Login with incorrect email shows error
- [ ] Login with incorrect password shows error
- [ ] After login, user redirects to dashboard
- [ ] "Sign Up" link in login page works

### 1.4 Session Persistence Test
- [ ] Log in to application
- [ ] Refresh page with F5 - user remains logged in
- [ ] Close browser tab and reopen - user remains logged in (persistent session)
- [ ] Clear cookies and reload - user redirected to login
- [ ] Navigate directly to `/dashboard` without login - redirects to login page
- [ ] Navigate directly to `/admin` without admin role - redirects to dashboard

### 1.5 Logout Test
- [ ] Logout from user dropdown menu
- [ ] User redirected to landing page
- [ ] Session cleared from cookies
- [ ] Cannot access dashboard without re-logging in

---

## 2. Dashboard & Navigation Testing

### 2.1 Dashboard Access
- [ ] Authenticated user can access `/dashboard`
- [ ] Dashboard loads with greeting message
- [ ] Sidebar displays all navigation items
- [ ] Dashboard shows user's trip statistics
- [ ] No hardcoded demo data visible (uses actual database data)

### 2.2 Sidebar Navigation
- [ ] All sidebar menu items are functional
- [ ] Each menu item routes to correct page
- [ ] Active menu item is highlighted
- [ ] Sidebar collapses on mobile devices
- [ ] Theme toggle works (light/dark mode)

### 2.3 Route Progression
- [ ] User Dashboard → Destinations: Routes correctly
- [ ] User Dashboard → Hotels: Routes correctly
- [ ] User Dashboard → Plan Trip: Routes correctly
- [ ] User Dashboard → My Trips: Routes correctly
- [ ] User Dashboard → Transportation: Routes correctly
- [ ] User Dashboard → Profile: Routes correctly
- [ ] User Dashboard → Preferences: Routes correctly

---

## 3. Database Functionality Testing

### 3.1 Destinations Page
- [ ] Page loads without errors
- [ ] Displays destinations from database (or empty state if none)
- [ ] Can filter destinations by category
- [ ] Can filter by price range
- [ ] Search functionality works
- [ ] Sorting by rating works

### 3.2 Hotels Page
- [ ] Page loads without errors
- [ ] Displays hotels from database
- [ ] Filters by destination work
- [ ] Filters by price range work
- [ ] Can view hotel details
- [ ] Amenities display correctly

### 3.3 Create Trip Functionality
- [ ] Navigate to Plan Trip page
- [ ] Step 1: Select destination works
- [ ] Step 2: Select hotel works
- [ ] Step 3: Select dates works
- [ ] Step 4: Review and create trip
- [ ] Trip appears in "My Trips" after creation
- [ ] Correct pricing calculated and displayed in INR

### 3.4 My Trips Page
- [ ] Lists all user's trips
- [ ] Trip details display correctly
- [ ] Can view trip itinerary
- [ ] Can edit trip
- [ ] Can delete trip with confirmation
- [ ] Can share trip

---

## 4. API & External Services Testing

### 4.1 Weather API (Optional)
- [ ] Weather page loads
- [ ] Shows current weather for selected location
- [ ] Temperature displays in Celsius
- [ ] Weather icons display correctly
- [ ] Handles API errors gracefully

### 4.2 Events API (Optional)
- [ ] Events page loads
- [ ] Displays events for selected location
- [ ] Event details visible
- [ ] Can filter events by category
- [ ] Handles API errors gracefully

---

## 5. Currency & Localization Testing

### 5.1 Currency Display
- [ ] All prices display in INR (₹)
- [ ] Pricing consistent across all pages
- [ ] Hotel prices show as ₹XXXX per night
- [ ] Transportation prices show as ₹XXXX per person
- [ ] Trip budget shows total in INR
- [ ] No USD or dollar signs appear

### 5.2 Date & Time Format
- [ ] Dates display consistently
- [ ] Calendar pickers work correctly
- [ ] Date validation works

---

## 6. Admin Features Testing (if applicable)

### 6.1 Admin Access
- [ ] Only admin users can access `/admin`
- [ ] Non-admin users redirected to dashboard if trying to access `/admin`

### 6.2 Admin Dashboard
- [ ] Displays statistics and metrics
- [ ] Shows recent activity

### 6.3 Admin CRUD Operations
- [ ] Can create new destination
- [ ] Can edit existing destination
- [ ] Can delete destination (with confirmation)
- [ ] Can create new hotel
- [ ] Can edit hotel details
- [ ] Can delete hotel (with confirmation)
- [ ] Changes appear immediately in user-facing pages

---

## 7. Performance & UX Testing

### 7.1 Loading States
- [ ] Loading spinners appear during data fetching
- [ ] Skeleton screens show while loading
- [ ] No blank screens or layout shift

### 7.2 Error Handling
- [ ] Invalid form submissions show error messages
- [ ] API errors handled gracefully
- [ ] User can retry failed operations
- [ ] Error messages are user-friendly

### 7.3 Form Validation
- [ ] Required fields marked
- [ ] Email format validation works
- [ ] Password strength validation works
- [ ] Form cannot be submitted with invalid data

### 7.4 Responsiveness
- [ ] Mobile viewport (320px width)
- [ ] Tablet viewport (768px width)
- [ ] Desktop viewport (1920px width)
- [ ] No horizontal scrolling on mobile
- [ ] All buttons clickable on mobile
- [ ] Forms fully visible on mobile

---

## 8. Security Testing

### 8.1 Authentication Security
- [ ] Passwords not shown in source code
- [ ] Session tokens in httpOnly cookies
- [ ] CSRF protection working
- [ ] No sensitive data in localStorage

### 8.2 Authorization Security
- [ ] Users cannot access other users' trips
- [ ] Users cannot modify other users' data
- [ ] Row Level Security (RLS) policies enforced

---

## 9. Browser Compatibility Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 10. Edge Cases & Error Scenarios

### 10.1 Network Conditions
- [ ] Application works on slow 3G connection
- [ ] Handles network timeouts
- [ ] Can retry failed requests

### 10.2 User Actions
- [ ] Rapidly clicking buttons doesn't cause issues
- [ ] Going back/forward in browser history works
- [ ] Multiple tabs open simultaneously work
- [ ] Switching between tabs maintains state

### 10.3 Data Scenarios
- [ ] Empty destination/hotel list shows appropriate message
- [ ] Very long destination names display correctly
- [ ] Special characters in names handled properly
- [ ] Large image files handled correctly

---

## Testing Report Template

### Test Date: _______________
### Tester: _______________
### Environment: _______________

| Feature | Test Case | Status | Notes |
|---------|-----------|--------|-------|
| Auth | Login | ✓ PASS / ✗ FAIL | |
| Auth | Signup | ✓ PASS / ✗ FAIL | |
| Auth | Logout | ✓ PASS / ✗ FAIL | |
| Navigation | Dashboard | ✓ PASS / ✗ FAIL | |
| Destinations | List | ✓ PASS / ✗ FAIL | |
| Destinations | Filter | ✓ PASS / ✗ FAIL | |
| Hotels | List | ✓ PASS / ✗ FAIL | |
| Hotels | Filter | ✓ PASS / ✗ FAIL | |
| Trips | Create | ✓ PASS / ✗ FAIL | |
| Trips | View | ✓ PASS / ✗ FAIL | |
| Currency | Display INR | ✓ PASS / ✗ FAIL | |
| Performance | Load Time | ✓ PASS / ✗ FAIL | |
| Responsive | Mobile | ✓ PASS / ✗ FAIL | |
| Responsive | Tablet | ✓ PASS / ✗ FAIL | |

---

## Test Execution Notes
- [ ] All critical tests passed
- [ ] No blocking issues found
- [ ] All non-critical issues documented
- [ ] Ready for production deployment
