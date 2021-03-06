export class FilterHelper {

  /** Tracks whether types or tags in the filter component are selected. */

  types = ["Academic", "Dining", "Dorm", "Library", "Athletics", "Landmark", "Other"];
  tags = ["Art", "Athletic", "Food", "Historic", "Loud", "Nap", "Other", "Social", "Study"];
  data = {};
  initialState;

  constructor() {
    for (let index = 0; index < this.types.length; index++) {
      let type = this.types[index];
      this.data[type] = false;
      this.initialState = this.data;
    }
    for (let index = 0; index < this.tags.length; index++) {
      let tag = this.tags[index];
      this.data[tag] = false;
      this.initialState = this.data;
    }
    console.log(this.data);
  }

  updateInitialState(data) {
    this.initialState = data;
  }

  resetInitialStateAndData() {
    for (let index = 0; index < this.types.length; index++) {
      let type = this.types[index];
      this.initialState[type] = false;
      this.data[type] = false;
    }
    for (let index = 0; index < this.tags.length; index++) {
      let tag = this.tags[index];
      this.initialState[tag] = false;
      this.data[tag] = false;
    }
  }
}

