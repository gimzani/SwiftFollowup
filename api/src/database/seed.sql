-- ============================================================
-- SwiftFollowup — Seed Data
-- Source: seed.json  |  Schema: schema.sql
-- Omitted tables: systemdata (no data), plan_permission (no mapping defined)
-- ============================================================


-- Plans
INSERT INTO "plan" ("plan_name", "code", "plan_cost", "sort_order", "plan_description", "plan_details", "is_public") VALUES
  ('App Admin',    'SF_P_APPADMIN',    0.00,  1, 'Just the Free BizCard',                NULL, false),
  ('Forever FREE', 'SF_P_FREE',        0.00,  1, 'Just the Free BizCard',                NULL, true),
  ('Connections',  'SF_P_CONNECTIONS', 29.99, 2, 'BizCards and Contacts',                NULL, true),
  ('Advanced',     'SF_P_Advanced',    59.99, 3, 'BizCards, Contacts and Landing Pages', NULL, false);


-- Permissions
INSERT INTO "permission" ("permission_name", "permission_label") VALUES
  ('AppAdmin', 'App Administrator'),
  ('User',     'User');


-- User Accounts
INSERT INTO "useraccount" (
  "code", "email_address", "password_hash",
  "login_on", "login_count", "is_active", "plan_code", "created_on", "updated_on"
) VALUES
  (
    '01KYMCCQK7ZSPY3MFJCWES307V',
    'gimzani@gmail.com',
    '$argon2id$v=19$m=65536,t=3,p=1$w/VmAMAUwOzZY8pP+ttR5g$5oqRQohcNRIZGpIpZ+cHlbW2EUS+umi+lIwicjDkfs8',
    '2025-08-01', 0, true, 'SF_P_APPADMIN', '2025-08-01', '2025-08-01'
  ),
  (
    '01KZK6MDKM1DQB7MSSSX7GRMR5',
    'jrhall22@gmail.com',
    '$argon2id$v=19$m=65536,t=3,p=1$yseb5UfLTJ00AXQVK/LdAA$lK6bmo2Kw1HzzvxCbIZugvZqj7vDsTW62D+ukD5wWzI',
    '2025-08-01', 0, true, 'SF_P_APPADMIN', '2025-08-01', '2025-08-01'
  );


-- User Profiles (resolved via code subquery to avoid hard-coding generated IDs)
INSERT INTO "userprofile" (
  "useraccount_id", "first_name", "last_name", "middle_name",
  "title", "suffix", "company", "job_title",
  "web_address", "mobile_number", "avatar_url", "preferences", "is_default"
)
SELECT
  id, 'Benjamin', 'Hall', 'Scott',
  NULL, NULL, 'Swift Followup, LLC', 'Founder and CEO',
  'https://swiftfollowup.com', '3176968375', NULL, NULL, true
FROM "useraccount" WHERE "code" = '01KYMCCQK7ZSPY3MFJCWES307V';

INSERT INTO "userprofile" (
  "useraccount_id", "first_name", "last_name", "middle_name",
  "title", "suffix", "company", "job_title",
  "web_address", "mobile_number", "avatar_url", "preferences", "is_default"
)
SELECT
  id, 'Julie', 'Hall', 'Renee',
  NULL, NULL, 'Fantasy Trove, LLC', 'Founder and CEO',
  'https://fantasytrove.com', '3176507009', NULL, NULL, true
FROM "useraccount" WHERE "code" = '01KZK6MDKM1DQB7MSSSX7GRMR5';


-- QR Code Templates
INSERT INTO "qrcodetemplate" ("qrcode_name", "qrcode_description", "qrcode_data") VALUES
(
  'Etsy Template',
  'Template for users that want to link to their Etsy Store.',
  '{"data":"https://etsy.com","type":"svg","image":"http://localhost:2564/user-data/system/img/Etsy-Logo-Online-Marketplace-Icon-transparent.webp","width":350,"height":350,"margin":10,"qrOptions":{"mode":"Byte","typeNumber":0,"errorCorrectionLevel":"L"},"dotsOptions":{"type":"rounded","color":"#FF6600","gradient":null,"roundSize":true},"imageOptions":{"margin":2,"imageSize":1,"saveAsBlob":true,"crossOrigin":"anonymous","hideBackgroundDots":true},"backgroundOptions":{"color":"#fff","gradient":null},"cornersDotOptions":{"type":"extra-rounded","color":"#FF6600","gradient":null},"cornersSquareOptions":{"type":"extra-rounded","color":"#000","gradient":null}}'
),
(
  'Facebook QR Code Template',
  'Template for Facebook QR Codes',
  '{"data":"https://facebook.com","type":"svg","image":"http://localhost:2564/user-data/system/img/Facebook_f_logo_2021.png","width":350,"height":350,"margin":10,"qrOptions":{"mode":"Byte","typeNumber":0,"errorCorrectionLevel":"L"},"dotsOptions":{"type":"rounded","color":"#18ACFE","gradient":null,"roundSize":true},"imageOptions":{"margin":2,"imageSize":0.9,"saveAsBlob":true,"crossOrigin":"anonymous","hideBackgroundDots":true},"backgroundOptions":{"color":"#fff","gradient":null},"cornersDotOptions":{"type":"extra-rounded","color":"#000","gradient":null},"cornersSquareOptions":{"type":"extra-rounded","color":"#0063E0","gradient":null}}'
),
(
  'Instagram Feed Template',
  'Template for Instagram feed.',
  '{"data":"https://instagram.com","type":"svg","image":"http://localhost:2564/user-data/system/img/Instagram_logo_2022.svg.png","width":350,"height":350,"margin":10,"qrOptions":{"mode":"Byte","typeNumber":0,"errorCorrectionLevel":"L"},"dotsOptions":{"type":"square","color":"#FD00C0","gradient":null,"roundSize":true},"imageOptions":{"margin":2,"imageSize":0.7,"saveAsBlob":true,"crossOrigin":"anonymous","hideBackgroundDots":true},"backgroundOptions":{"color":"#fff","gradient":null},"cornersDotOptions":{"type":"square","color":"#FE0174","gradient":null},"cornersSquareOptions":{"type":"square","color":"#9203F8","gradient":null}}'
),
(
  'LinkedIn Template',
  'Template for users that want to link to their LinkedIn Profile.',
  '{"data":"https://linkedin.com","type":"svg","image":"http://localhost:2564/user-data/system/img/LinkedIn_logo_initials.png","width":350,"height":350,"margin":10,"qrOptions":{"mode":"Byte","typeNumber":0,"errorCorrectionLevel":"L"},"dotsOptions":{"type":"dots","color":"#0274B3","gradient":null,"roundSize":true},"imageOptions":{"margin":2,"imageSize":0.75,"saveAsBlob":true,"crossOrigin":"anonymous","hideBackgroundDots":true},"backgroundOptions":{"color":"#fff","gradient":null},"cornersDotOptions":{"type":"dot","color":"#000","gradient":null},"cornersSquareOptions":{"type":"dot","color":"#0274B3","gradient":null}}'
),
(
  'X Feed Template',
  'Template for X Feed',
  '{"data":"https://x.com","type":"svg","image":"http://localhost:2564/user-data/system/img/X_logo.jpg","width":350,"height":350,"margin":10,"qrOptions":{"mode":"Byte","typeNumber":0,"errorCorrectionLevel":"L"},"dotsOptions":{"type":"classy","color":"#000","gradient":null,"roundSize":true},"imageOptions":{"margin":2,"imageSize":1,"saveAsBlob":true,"crossOrigin":"anonymous","hideBackgroundDots":true},"backgroundOptions":{"color":"#fff","gradient":null},"cornersDotOptions":{"type":"extra-rounded","color":"#000","gradient":null},"cornersSquareOptions":{"type":"extra-rounded","color":"#000","gradient":null}}'
),
(
  'YouTube Channel QR Code Template',
  'Template for linking to a YouTube Channel',
  '{"data":"https://youtube.com","type":"svg","image":"http://localhost:2564/user-data/system/img/YouTube_Logo.png","width":350,"height":350,"margin":10,"qrOptions":{"mode":"Byte","typeNumber":0,"errorCorrectionLevel":"L"},"dotsOptions":{"type":"square","color":"#FF0000","gradient":null,"roundSize":true},"imageOptions":{"margin":2,"imageSize":1,"saveAsBlob":true,"crossOrigin":"anonymous","hideBackgroundDots":true},"backgroundOptions":{"color":"#fff","gradient":null},"cornersDotOptions":{"type":"square","color":"#FF0000","gradient":null},"cornersSquareOptions":{"type":"extra-rounded","color":"#000000","gradient":null}}'
);


-- BizCard Templates
-- Note: seed.json used kebab-case keys (bizcard-name, bizcard-description, bizcard-data);
--       mapped to schema column names (bizcard_name, bizcard_description, bizcard_data).
INSERT INTO "bizcardtemplate" ("bizcard_name", "bizcard_description", "bizcard_data") VALUES
(
  'Dark Minimist',
  'Simple, yet elegant card in dark high contrast',
  '{"card_surface":{"fill":"#111","stroke":"#111","stroke_width":1},"elements":[{"x":80,"y":150,"id":"3qSFUn","tag":"first_name","fill":"white","text":"BENJAMIN","type":"text","fontSize":40,"fontFamily":"Calibri","fontStyle":"italic","rotation":0},{"x":80,"y":195,"id":"9dU3ya","tag":"last_name","fill":"#C1AC80","text":"HALL","type":"text","fontSize":40,"fontFamily":"Calibri","fontStyle":"italic","rotation":0},{"x":80,"y":250,"id":"EMv6gz","tag":"title_company","fill":"#777","text":"CEO Swift Followup","type":"text","fontSize":18,"fontFamily":"Calibri","fontStyle":"italic","rotation":0},{"x":350,"y":150,"id":"iqJmG2","tag":"divider","fill":"#eee","type":"line","strokeWidth":3,"rotation":0,"x2":350,"y2":275},{"x":370,"y":155,"id":"7rjjvF","tag":"address","fill":"#777","text":"260 Creekside Cir. Danville IN,\nUSA 46122","type":"text","fontSize":14,"fontFamily":"Calibri","fontStyle":"italic","rotation":0},{"x":370,"y":205,"id":"UWvCyZ","tag":"mobile","fill":"#777","text":"317.696.8375","type":"text","fontSize":14,"fontFamily":"Calibri","fontStyle":"italic","rotation":0},{"x":370,"y":230,"id":"Gq0LfK","tag":"email_address","fill":"#777","text":"ben.hall@swiftfollowup.com","type":"text","fontSize":14,"fontFamily":"Calibri","fontStyle":"italic","rotation":0},{"x":370,"y":255,"id":"4pfT53","tag":"web_address","fill":"#777","text":"www.swiftfollowup.com","type":"text","fontSize":14,"fontFamily":"Calibri","fontStyle":"italic","rotation":0},{"x":640,"y":20,"id":"5qgS21","tag":"linkedin_logo","url":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1280px-LinkedIn_icon.svg.png","type":"image","width":32,"height":32,"rotation":0}]}'
),
(
  'Light Minimist',
  'Simple, yet elegant card in light high contrast',
  '{"card_surface":{"fill":"#fff","stroke":"#000","stroke_width":1},"elements":[{"x":80,"y":150,"id":"3qSFUn","tag":"first_name","fill":"#000000","text":"BENJAMIN","type":"text","fontSize":40,"fontFamily":"Calibri","fontStyle":"italic","rotation":0},{"x":80,"y":195,"id":"9dU3ya","tag":"last_name","fill":"#000000","text":"HALL","type":"text","fontSize":40,"fontFamily":"Calibri","fontStyle":"italic","rotation":0},{"x":80,"y":250,"id":"EMv6gz","tag":"title_company","fill":"#333","text":"CEO Swift Followup","type":"text","fontSize":18,"fontFamily":"Calibri","fontStyle":"italic","rotation":0},{"x":350,"y":150,"id":"iqJmG2","tag":"divider","fill":"#333","type":"line","strokeWidth":3,"rotation":0,"x2":350,"y2":275},{"x":370,"y":155,"id":"7rjjvF","tag":"address","fill":"#333","text":"260 Creekside Cir. Danville IN,\nUSA 46122","type":"text","fontSize":14,"fontFamily":"Calibri","fontStyle":"italic","rotation":0},{"x":370,"y":205,"id":"UWvCyZ","tag":"mobile","fill":"#333","text":"317.696.8375","type":"text","fontSize":14,"fontFamily":"Calibri","fontStyle":"italic","rotation":0},{"x":370,"y":230,"id":"Gq0LfK","tag":"email_address","fill":"#333","text":"ben.hall@swiftfollowup.com","type":"text","fontSize":14,"fontFamily":"Calibri","fontStyle":"italic","rotation":0},{"x":370,"y":255,"id":"4pfT53","tag":"web_address","fill":"#333","text":"www.swiftfollowup.com","type":"text","fontSize":14,"fontFamily":"Calibri","fontStyle":"italic","rotation":0},{"x":640,"y":20,"id":"5qgS21","tag":"linkedin_logo","url":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1280px-LinkedIn_icon.svg.png","type":"image","width":32,"height":32,"rotation":0}]}'
);
