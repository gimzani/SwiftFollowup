BEGIN;

INSERT INTO "plan" (
  "plan_name",
  "code",
  "plan_description",
  "sort_order",
  "plan_details",
  "permissions",
  "is_public",
  "plan_cost"
) VALUES
  (
    'Application Admin',
    'SF_P_APPADMIN',
    'Founder Account',
    1,
    NULL,
    NULL,
    FALSE,
    0
  ),
  (
    'Forever FREE',
    'SF_P_FREE',
    'Just the Free BizCard',
    1,
    NULL,
    NULL,
    TRUE,
    0
  ),
  (
    'Connections',
    'SF_P_CONNECTIONS',
    'BizCards and Contacts',
    2,
    NULL,
    NULL,
    TRUE,
    29.99
  ),
  (
    'Advanced',
    'SF_P_Advanced',
    'BizCards, Contacts and Landing Pages',
    3,
    NULL,
    NULL,
    FALSE,
    59.99
  )
ON CONFLICT ("code") DO UPDATE SET
  "plan_name" = EXCLUDED."plan_name",
  "plan_description" = EXCLUDED."plan_description",
  "sort_order" = EXCLUDED."sort_order",
  "plan_details" = EXCLUDED."plan_details",
  "permissions" = EXCLUDED."permissions",
  "is_public" = EXCLUDED."is_public",
  "plan_cost" = EXCLUDED."plan_cost";

INSERT INTO "permission" (
  "permission_name",
  "permission_label"
) VALUES
  (
    'AppAdmin',
    'App Administrator'
  ),
  (
    'User',
    'User'
  )
ON CONFLICT ("permission_name") DO UPDATE SET
  "permission_label" = EXCLUDED."permission_label";

WITH upserted_user AS (
  INSERT INTO "useraccount" (
    "code",
    "email_address",
    "password_hash",
    "login_on",
    "login_count",
    "is_active",
    "plan_code",
    "created_on",
    "updated_on"
  ) VALUES (
    '01KYMCCQK7ZSPY3MFJCWES307V',
    'gimzani@gmail.com',
    'Innov8i0n!',
    TIMESTAMP '2025-08-01 00:00:00',
    0,
    TRUE,
    'SF_P_APPADMIN',
    TIMESTAMP '2025-08-01 00:00:00',
    TIMESTAMP '2025-08-01 00:00:00'
  )
  ON CONFLICT ("code") DO UPDATE SET
    "email_address" = EXCLUDED."email_address",
    "password_hash" = EXCLUDED."password_hash",
    "login_on" = EXCLUDED."login_on",
    "login_count" = EXCLUDED."login_count",
    "is_active" = EXCLUDED."is_active",
    "plan_code" = EXCLUDED."plan_code",
    "created_on" = EXCLUDED."created_on",
    "updated_on" = EXCLUDED."updated_on"
  RETURNING "id"
)
INSERT INTO "userprofile" (
  "useraccount_id",
  "first_name",
  "last_name",
  "middle_name",
  "title",
  "suffix",
  "company",
  "job_title",
  "web_address",
  "mobile_number",
  "avatar_url",
  "preferences",
  "is_default"
)
SELECT
  "id",
  'Benjamin',
  'Hall',
  'Scott',
  NULL,
  NULL,
  'Swift Followup, LLC',
  'Founder and CEO',
  'https://swiftfollowup.com',
  '3176968375',
  NULL,
  NULL,
  TRUE
FROM upserted_user
ON CONFLICT ("useraccount_id") DO UPDATE SET
  "first_name" = EXCLUDED."first_name",
  "last_name" = EXCLUDED."last_name",
  "middle_name" = EXCLUDED."middle_name",
  "title" = EXCLUDED."title",
  "suffix" = EXCLUDED."suffix",
  "company" = EXCLUDED."company",
  "job_title" = EXCLUDED."job_title",
  "web_address" = EXCLUDED."web_address",
  "mobile_number" = EXCLUDED."mobile_number",
  "avatar_url" = EXCLUDED."avatar_url",
  "preferences" = EXCLUDED."preferences",
  "is_default" = EXCLUDED."is_default";

COMMIT;