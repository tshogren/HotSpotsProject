export class FilterHelper {

  types = ["Academic", "Food", "Dorm", "Library"];
  data = {};
  initialState;

  constructor() {
    for (let index = 0; index < this.types.length; index++) {
      let type = this.types[index];
      this.data[type] = false;
      this.initialState = this.data;
    }
    console.log(this.data);
  }

  updateInitialState(data) {
    this.initialState = data;
  }

  resetInitialState() {
    for (let index = 0; index < this.types.length; index++) {
      let type = this.types[index];
      this.initialState[type] = false;
    }
  }
}

let filter = new FilterHelper();
// console.log(filter.data);
