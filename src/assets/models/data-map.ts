export class DataMap {

  /** Creates and manages a hashmap with string values as keys. The corresponding values must be booleans and signify the
   * state of the key.
   */

  private data: {[key: string]: boolean};

  constructor(data: Array<any>) {
    this.data = {};

    data.forEach(dataObject => {this.data[dataObject] = false})
  }

  isSelected(dataObject: any) {
    return this.data[dataObject] === true;
  }

  toggleState(dataObject: any) {
    this.data[dataObject] = !this.data[dataObject]
  }

  getSelectedItems(): Array<string> {

    let selectedItems: Array<string> = [];

    for (let item of Object.keys(this.data)) {
      if (this.isSelected(item)) {
        selectedItems.push(item);
      }
    }

    return selectedItems;
  }
}
