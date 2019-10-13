
class FamilyTree {
  constructor (name, age) {
    this.name = name;
    this.age = age;
    this.children = [];
  }

  insert(name, age) {
    this.children.push(new FamilyTree(name, age));
  }

  familySize() {
    return 1 + this.children.length;
  }

  findMember(member) {
    if (this.name === member) {
      return this;
    }
    return this.children.reduce((found, child) => {
      return found || child.findMember(member);
    }, undefined);
  }

  log() {

    const logHelper = (tree, prefix) => {
        let subString = prefix + ' ' + tree.name + '\n';
        tree.children.forEach(child => {
          subString += logHelper(child, prefix + `--`);
        })
        return subString;
    }

    return logHelper(this, `--`);

  }

}

