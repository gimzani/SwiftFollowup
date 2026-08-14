
# Next to do...

External items -> "View Card / View QR"






1: Layouts - (single column / app-layout)
  * [x] AppLayout
    ├─ [-] app-bar
    │  ├─ [] Home
    │  ├─ [-] MyAccount
    │  └─ [x] Menu
    │     ├─ [-] UserProfile
    │     └─ [x] Logout
    ├─ [-] Dashboard
    ├─ [-] BizCards
    ├─ [-] QrCodes
    ├─ [ ] Contacts
    └─ [ ] Metrics
    │
    │  ..ADMIN
    ├─ [-] UserAccounts
    ├─ [x] BizCardTemplates
    ├─ [x] QrCodeTemplates
    └─ [ ] DbTools

  * SingleColumnLayout
    ├─ [x] Login
    ├─ [-] Register
    ├─ [ ] ForgotPassword
    ├─ [ ] SetPassword
    ├─ [ ] ActivateAccount
    ├─ [ ] ViewBizCard
    └─ [ ] ViewQrCode




















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