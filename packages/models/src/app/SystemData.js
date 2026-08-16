//----------------------------------------------------------
export default class SystemData {

  id = 0;                 // bigint, pk
  data_key = null;        // text
  value = null;           // text
  label = null;           // text
  sort_order = 0;         // int
  is_default = false;     // boolean
  
  constructor(options) {
    if(options) {
      this.init(options);
    }
  }
  
  init(options) {
    this.data_key = options.data_key || this.data_key;
    this.value = options.value || this.value;
    this.label = options.label || this.label;
    this.sort_order = options.sort_order || this.sort_order;
    this.is_default = [1,true].includes(options.is_default) ? true : false;
  }

}