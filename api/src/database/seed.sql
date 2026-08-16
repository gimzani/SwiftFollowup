-- ============================================================
-- Seed Data
-- Source:  seed.json
-- Schema:  schema.sql
-- ============================================================

-- --------------------------
-- plan
-- --------------------------
INSERT INTO "plan" ("plan_name", "code", "plan_cost", "sort_order", "plan_description", "plan_details", "is_public") VALUES
  ('App Admin',    'SF_P_APPADMIN',    0.00,  0, 'Just the Free BizCard',                  '[]'::jsonb,                                                                                                         false),
  ('Forever FREE', 'SF_P_FREE',        0.00,  1, 'Just the Free BizCard',                  '[{"label":"BizCards"},{"label":"QrCodes"}]'::jsonb,                                                                  true),
  ('Connections',  'SF_P_CONNECTIONS', 29.99, 2, 'BizCards and Contacts',                  '[{"label":"BizCards"},{"label":"QrCodes"},{"label":"Contacts"},{"label":"Contact Metrics"}]'::jsonb,                 true),
  ('Advanced',     'SF_P_Advanced',    59.99, 3, 'BizCards, Contacts and Landing Pages',   '[]'::jsonb,                                                                                                         false);

-- --------------------------
-- useraccount
-- --------------------------
INSERT INTO "useraccount" ("code", "email_address", "password_hash", "login_on", "login_count", "is_active", "plan_code", "created_on", "updated_on") VALUES
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
    '2025-08-01', 0, true, 'SF_P_CONNECTIONS', '2025-08-01', '2025-08-01'
  );

-- --------------------------
-- userprofile
-- useraccount_id resolved via subquery on useraccount.code
-- --------------------------
INSERT INTO "userprofile" ("useraccount_id", "first_name", "last_name", "middle_name", "title", "suffix", "company", "job_title", "web_address", "mobile_number", "mailing_address", "avatar_url", "preferences", "is_default")
VALUES (
  (SELECT "id" FROM "useraccount" WHERE "code" = '01KYMCCQK7ZSPY3MFJCWES307V'),
  'Benjamin', 'Hall', 'Scott', NULL, NULL,
  'Swift Followup, LLC', 'Founder and CEO', 'https://swiftfollowup.com',
  '3176968375', NULL, NULL, NULL, true
);

INSERT INTO "userprofile" ("useraccount_id", "first_name", "last_name", "middle_name", "title", "suffix", "company", "job_title", "web_address", "mobile_number", "mailing_address", "avatar_url", "preferences", "is_default")
VALUES (
  (SELECT "id" FROM "useraccount" WHERE "code" = '01KZK6MDKM1DQB7MSSSX7GRMR5'),
  'Julie', 'Hall', 'Renee', NULL, NULL,
  'Fantasy Trove, LLC', 'Business Owner', 'https://fantasytrove.com',
  '3176507009', NULL, NULL, NULL, true
);

-- --------------------------
-- bizcardtemplate
-- --------------------------
INSERT INTO "bizcardtemplate" ("bizcard_name", "bizcard_description", "bizcard_data") VALUES
(
  'Dark Minimist',
  'Simple, yet elegant card in dark high contrast',
  '{"card_surface":{"fill":"#111","stroke":"#111","stroke_width":1},"elements":[{"x":80,"y":140,"id":"3qSFUn","tag":"first_name","fill":"white","text":"JOHN","type":"text","fontSize":40,"fontFamily":"Poppins","fontStyle":"italic","fontWeight":"normal","rotation":0},{"x":80,"y":190,"id":"9dU3ya","tag":"last_name","fill":"#C1AC80","text":"DOE","type":"text","fontSize":40,"fontFamily":"Poppins","fontStyle":"italic","fontWeight":"normal","rotation":0},{"x":80,"y":250,"id":"EMv6gz","tag":"job_title","fill":"#777","text":"Sales Director","type":"text","fontSize":18,"fontFamily":"Poppins","fontStyle":"italic","fontWeight":"normal","rotation":0},{"x":350,"y":150,"id":"iqJmG2","tag":"divider","fill":"#eee","type":"line","strokeWidth":3,"rotation":0,"x2":350,"y2":275},{"x":370,"y":155,"id":"7rjjvF","tag":"mailing_address","fill":"#777","text":"1234 Main St.\nAnywhere CA, USA 90211","type":"text","fontSize":14,"fontFamily":"Poppins","fontStyle":"italic","fontWeight":"normal","rotation":0},{"x":370,"y":205,"id":"UWvCyZ","tag":"mobile_number","fill":"#777","text":"777.444.8888","type":"text","fontSize":14,"fontFamily":"Poppins","fontStyle":"italic","fontWeight":"normal","rotation":0},{"x":370,"y":230,"id":"Gq0LfK","tag":"email_address","fill":"#777","text":"sales@swiftfollowup.com","type":"text","fontSize":14,"fontFamily":"Poppins","fontStyle":"italic","fontWeight":"normal","rotation":0},{"x":370,"y":255,"id":"4pfT53","tag":"web_address","fill":"#777","text":"www.swiftfollowup.com","type":"text","fontSize":14,"fontFamily":"Poppins","fontStyle":"italic","fontWeight":"normal","rotation":0},{"x":640,"y":20,"id":"5qgS21","tag":"linkedin_logo","url":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1280px-LinkedIn_icon.svg.png","type":"image","width":32,"height":32,"rotation":0}]}'::jsonb
),
(
  'Light Minimist',
  'Simple, yet elegant card in light high contrast',
  '{"card_surface":{"fill":"#fff","stroke":"#000","stroke_width":1},"elements":[{"x":80,"y":140,"id":"3qSFUn","tag":"first_name","fill":"#000000","text":"JOHN","type":"text","fontSize":40,"fontFamily":"Poppins","fontStyle":"italic","fontWeight":"normal","rotation":0},{"x":80,"y":190,"id":"9dU3ya","tag":"last_name","fill":"#000000","text":"DOE","type":"text","fontSize":40,"fontFamily":"Poppins","fontStyle":"italic","fontWeight":"normal","rotation":0},{"x":80,"y":250,"id":"EMv6gz","tag":"job_title","fill":"#333","text":"Sales Director","type":"text","fontSize":18,"fontFamily":"Poppins","fontStyle":"italic","fontWeight":"normal","rotation":0},{"x":350,"y":150,"id":"iqJmG2","tag":"divider","fill":"#333","type":"line","strokeWidth":3,"rotation":0,"x2":350,"y2":275},{"x":370,"y":155,"id":"7rjjvF","tag":"mailing_address","fill":"#333","text":"1234 Main St.\nAnywhere CA, USA 90211","type":"text","fontSize":14,"fontFamily":"Poppins","fontStyle":"italic","fontWeight":"normal","rotation":0},{"x":370,"y":205,"id":"UWvCyZ","tag":"mobile_number","fill":"#333","text":"777.444.8888","type":"text","fontSize":14,"fontFamily":"Poppins","fontStyle":"italic","fontWeight":"normal","rotation":0},{"x":370,"y":230,"id":"Gq0LfK","tag":"email_address","fill":"#333","text":"sales@swiftfollowup.com","type":"text","fontSize":14,"fontFamily":"Poppins","fontStyle":"italic","fontWeight":"normal","rotation":0},{"x":370,"y":255,"id":"4pfT53","tag":"web_address","fill":"#333","text":"www.swiftfollowup.com","type":"text","fontSize":14,"fontFamily":"Poppins","fontStyle":"italic","fontWeight":"normal","rotation":0},{"x":640,"y":20,"id":"5qgS21","tag":"linkedin_logo","url":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1280px-LinkedIn_icon.svg.png","type":"image","width":32,"height":32,"rotation":0}]}'::jsonb
);

-- --------------------------
-- qrcodetemplate
-- --------------------------
INSERT INTO "qrcodetemplate" ("qrcode_name", "qrcode_description", "qrcode_data") VALUES
(
  'Etsy Template',
  'Template for users that want to link to their Etsy Store.',
  '{"data":"https://etsy.com","type":"svg","image":"http://localhost:2564/user-data/system/img/Etsy-Logo-Online-Marketplace-Icon-transparent.webp","width":350,"height":350,"margin":10,"qrOptions":{"mode":"Byte","typeNumber":0,"errorCorrectionLevel":"L"},"dotsOptions":{"type":"rounded","color":"#FF6600","gradient":null,"roundSize":true},"imageOptions":{"margin":2,"imageSize":1,"saveAsBlob":true,"crossOrigin":"anonymous","hideBackgroundDots":true},"backgroundOptions":{"color":"#fff","gradient":null},"cornersDotOptions":{"type":"extra-rounded","color":"#FF6600","gradient":null},"cornersSquareOptions":{"type":"extra-rounded","color":"#000","gradient":null}}'::jsonb
),
(
  'Facebook QR Code Template',
  'Template for Facebook QR Codes',
  '{"data":"https://facebook.com","type":"svg","image":"http://localhost:2564/user-data/system/img/Facebook_f_logo_2021.png","width":350,"height":350,"margin":10,"qrOptions":{"mode":"Byte","typeNumber":0,"errorCorrectionLevel":"L"},"dotsOptions":{"type":"rounded","color":"#18ACFE","gradient":null,"roundSize":true},"imageOptions":{"margin":2,"imageSize":0.9,"saveAsBlob":true,"crossOrigin":"anonymous","hideBackgroundDots":true},"backgroundOptions":{"color":"#fff","gradient":null},"cornersDotOptions":{"type":"extra-rounded","color":"#000","gradient":null},"cornersSquareOptions":{"type":"extra-rounded","color":"#0063E0","gradient":null}}'::jsonb
),
(
  'Instagram Feed Template',
  'Template for Instagram feed.',
  '{"data":"https://instagram.com","type":"svg","image":"http://localhost:2564/user-data/system/img/Instagram_logo_2022.svg.png","width":350,"height":350,"margin":10,"qrOptions":{"mode":"Byte","typeNumber":0,"errorCorrectionLevel":"L"},"dotsOptions":{"type":"square","color":"#FD00C0","gradient":null,"roundSize":true},"imageOptions":{"margin":2,"imageSize":0.7,"saveAsBlob":true,"crossOrigin":"anonymous","hideBackgroundDots":true},"backgroundOptions":{"color":"#fff","gradient":null},"cornersDotOptions":{"type":"square","color":"#FE0174","gradient":null},"cornersSquareOptions":{"type":"square","color":"#9203F8","gradient":null}}'::jsonb
),
(
  'LinkedIn Template',
  'Template for users that want to link to their LinkedIn Profile.',
  '{"data":"https://linkedin.com","type":"svg","image":"http://localhost:2564/user-data/system/img/LinkedIn_logo_initials.png","width":350,"height":350,"margin":10,"qrOptions":{"mode":"Byte","typeNumber":0,"errorCorrectionLevel":"L"},"dotsOptions":{"type":"dots","color":"#0274B3","gradient":null,"roundSize":true},"imageOptions":{"margin":2,"imageSize":0.75,"saveAsBlob":true,"crossOrigin":"anonymous","hideBackgroundDots":true},"backgroundOptions":{"color":"#fff","gradient":null},"cornersDotOptions":{"type":"dot","color":"#000","gradient":null},"cornersSquareOptions":{"type":"dot","color":"#0274B3","gradient":null}}'::jsonb
),
(
  'X Feed Template',
  'Template for X Feed',
  '{"data":"https://x.com","type":"svg","image":"http://localhost:2564/user-data/system/img/X_logo.jpg","width":350,"height":350,"margin":10,"qrOptions":{"mode":"Byte","typeNumber":0,"errorCorrectionLevel":"L"},"dotsOptions":{"type":"classy","color":"#000","gradient":null,"roundSize":true},"imageOptions":{"margin":2,"imageSize":1,"saveAsBlob":true,"crossOrigin":"anonymous","hideBackgroundDots":true},"backgroundOptions":{"color":"#fff","gradient":null},"cornersDotOptions":{"type":"extra-rounded","color":"#000","gradient":null},"cornersSquareOptions":{"type":"extra-rounded","color":"#000","gradient":null}}'::jsonb
),
(
  'YouTube Channel QR Code Template',
  'Template for linking to a YouTube Channel',
  '{"data":"https://youtube.com","type":"svg","image":"http://localhost:2564/user-data/system/img/YouTube_Logo.png","width":350,"height":350,"margin":10,"qrOptions":{"mode":"Byte","typeNumber":0,"errorCorrectionLevel":"L"},"dotsOptions":{"type":"square","color":"#FF0000","gradient":null,"roundSize":true},"imageOptions":{"margin":2,"imageSize":1,"saveAsBlob":true,"crossOrigin":"anonymous","hideBackgroundDots":true},"backgroundOptions":{"color":"#fff","gradient":null},"cornersDotOptions":{"type":"square","color":"#FF0000","gradient":null},"cornersSquareOptions":{"type":"extra-rounded","color":"#000000","gradient":null}}'::jsonb
);
