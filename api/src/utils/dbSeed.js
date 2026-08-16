//----------------------------------------------------------------------
import plansService from  '../modules/plans/plansService.js';
import userAccountsService from  '../modules/userAccounts/userAccountsService.js';
import userProfilesService from  '../modules/userProfiles/userProfilesService.js';
import qrCodeTemplatesService from  '../modules/qrCodeTemplates/qrCodeTemplatesService.js';
import bizCardTemplatesService from  '../modules/bizCardTemplates/bizCardTemplatesService.js';
//----------------------------------------------------------------------
//----------------------------------------------------------------------
// take in a seed object and add items to the database
export async function seed(pg, seedData) {
  let seedProps = Object.keys(seedData);
  for(const prop of seedProps) {
    switch(prop) {
      case 'plans':
        await seedPlans(pg, seedData[prop]);
        break;
      case 'useraccounts':
        await seedUserAccounts(pg, seedData[prop]);
        break;
      case 'qrcode_templates':
        await seedQRCodeTemplates(pg, seedData[prop]);
        break;
      case 'bizcard_templates':
        await seedBizCardTemplates(pg, seedData[prop]);
        break;
      default:
        break;
    }
  }
}
//----------------------------------------------------------------------
//#region Seed Functions
//----------------------------------------------------------------------
async function seedPlans(pg, plansData) {
  const result = await plansService.listPlans(pg);
  // add if there are no plans in the database
  if(result.rows.length===0) {
    for(const plan of plansData) {
      await plansService.createPlan(pg, plan);
    }
    console.log('       - plans seeded');
  } else {
    console.log('       - plans exist');
  }
}
//----------------------------------------------------------------------
async function seedUserAccounts(pg, userAccountsData){
  const result = await userAccountsService.listUserAccounts(pg);
  // add if there are no user accounts in the database
  if(result.rows.length===0) {
    for(const userAccount of userAccountsData) {
      const uaResult = await userAccountsService.createUserAccount(pg, userAccount);
      if(userAccount.userprofile) {
        const userProfile = userAccount.userprofile;
        userProfile.useraccount_id = uaResult.rows[0].id;
        await userProfilesService.createUserProfile(pg, userProfile);
      }
    }
    console.log('       - useraccounts seeded');
  } else {
    console.log('       - useraccounts exist');
  }
}
//----------------------------------------------------------------------
async function seedQRCodeTemplates(pg, qrCodeTemplatesData){
  const result = await qrCodeTemplatesService.listQrcodetemplates(pg);
  // add if there are no qr code templates in the database
  if(result.rows.length===0) {
    for(const qrCodeTemplate of qrCodeTemplatesData) {
      await qrCodeTemplatesService.createQrcodetemplate(pg, qrCodeTemplate);
    }
    console.log('       - qrcode templates seeded');
  } else {
    console.log('       - qrcode templates exist');
  }
}
//----------------------------------------------------------------------
async function seedBizCardTemplates(pg, bizCardTemplatesData){
  const result = await bizCardTemplatesService.listBizcardtemplates(pg);
  // add if there are no biz card templates in the database
  if(result.rows.length===0) {
    for(const bizCardTemplate of bizCardTemplatesData) {
      await bizCardTemplatesService.createBizcardtemplate(pg, bizCardTemplate);
    }
    console.log('       - bizcard templates seeded');
  } else {
    console.log('       - bizcard templates exist');
  }
}
//----------------------------------------------------------------------
//#endregion
//----------------------------------------------------------------------