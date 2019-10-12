class FamilyTree {
  constructor (val) {
    if (!val || (typeof val != 'string')) {
      throw ('value required');
    }
    this.value = val;
    this.children = [];
  }

  insert(val) {
    let child = new FamilyTree(val);
    this.children.push(child);
  }

  familySize() {
    return 1 + this.children.length;
  }

  findMember(member) {
    if (this.value === member) {
      return this;
    }
    return this.children.filter(child => child.value === member)[0];
  }

  log() {

    const logHelper = (tree, prefix) => {
        let subString = prefix + ' ' + tree.value + '\n';
        tree.children.forEach(child => {
          subString += logHelper(child, prefix + `--`);
        })
        return subString;
    }

    return logHelper(this, `--`);

  }

}

module.exports = FamilyTree;
