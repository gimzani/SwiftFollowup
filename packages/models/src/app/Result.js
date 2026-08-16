export default class Result {
  success = false;
  data = null;
  message = null;

  constructor(options) {
    if(options) {
      this.init(options);
    }
  }

  init(options) {
    this.success = [1,true].includes(options.success) ? true : false;
    this.data = options.data || this.data;
    this.message = options.message || this.message;
  }

  setSuccess(message, data) {
    this.success = true;
    this.message = message;
    this.data = data || null;
  }

  setFailure(message, data) {
    this.success = false;
    this.message = message;
    this.data = data || null;    
  }

}