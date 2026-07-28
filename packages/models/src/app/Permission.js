//----------------------------------------------------------
import api from 'src/code/app/ServerApis'
//----------------------------------------------------------
export default class Permission {
  permissionName = null;
  permissionLabel = null;
  //----------------------------
  constructor(options) {
    if(options) {
      this.init(options);
    }
  }
  //-----------------------------------------------------
  init(options) {
    this.permissionName = options.permissionName || this.permissionName;
    this.permissionLabel = options.permissionLabel || this.permissionLabel;
  }
  //-----------------------------------------------------
  async save() {
    if(this.permissionName.includes(' ')) { return; }  //cannot have a space
    if(this.permissionName && this.permissionLabel) {
      return await api.permissions.upsert(this);
    }
  }

}