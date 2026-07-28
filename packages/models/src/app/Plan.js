//----------------------------------------------------------
import api from 'src/code/app/ServerApis'
//----------------------------------------------------------
export default class Plan {

  planCode = null;
  planName = null;
  planDescription = null;
  planCost = 0.0;
  planDetails = null;
  permissions = null;
  sortOrder = 0;
  isPublic = 0;

  //----------------------------
  constructor(options) {
    if(options) {
      this.init(options);
    }
  }
  //-----------------------------------------------------
  init(options) {
    this.planCode = options.planCode || this.planCode;
    this.planName = options.planName || this.planName;
    this.planDescription = options.planDescription || this.planDescription;
    this.planCost = parseFloat(options.planCost) || this.planCost;
    this.planDetails = options.planDetails || this.planDetails;
    this.permissions = options.permissions || this.permissions;
    this.sortOrder = parseInt(options.sortOrder) || this.sortOrder;
    this.isPublic = parseInt(options.isPublic) || this.isPublic;
  }
  //-----------------------------------------------------
  async save() {
    if(this.planCode && this.planName) {
      return await api.plans.upsert(this);
    }
  }

}