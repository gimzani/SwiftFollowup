
# Next to do...


1: Layouts - (single column / app-layout)
  * AppLayout
    ├─ app-bar
    │  ├─ Home
    │  ├─ MyAccount
    │  └─ Menu
    │     ├─ UserProfile
    │     └─ Logout
    ├─ Dashboard
    ├─ BizCards
    ├─ QrCodes
    ├─ Contacts
    └─ Metrics
    │
    │  ..ADMIN
    ├─ UserAccounts
    ├─ BizCardTemplates
    ├─ QrCodeTemplates
    └─ DbTools

  * SingleColumnLayout
    ├─ Login
    ├─ Register
    ├─ ForgotPassword
    ├─ SetPassword
    ├─ ActivateAccount
    ├─ ViewBizCard
    └─ ViewQrCode



2: Templates Lists

  1. BizCard Template
  1. QrCode Template




















----

- Login route to 'dashboard'
  - Show default QrCode
  - Send tools - (send to SMS)
  - List of "contentrequest" items and "contacts"

- External
  - View BizCard - (with controls)
  - View QrCode
  - VerifyEmail
  - Register

- BizCards
  - List of BizCards
    - New/Edit BizCard
    
- QrCodes
  - List of QrCodes
    - New/Edit QrCode


- Admin
  - Plans List
    - Plans New/Edit
    - Permissions - (create/delete only)
  - UserAccount List
    - UserAccount New/Edit
    - (reset password function)
  - BizCardTemplates
    - New/Edit BizCardTemplate
  - QrTemplates
    - New/Edit QrTemplate


# Desired FN...

On login, look for active session - if exists, update expiration and use that. The goal should be 1 session per user.

CRON: Delete expired sessions