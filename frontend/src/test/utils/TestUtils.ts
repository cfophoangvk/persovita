export class TestUtils {
  getNextPage(currentPage: number, selectedObjectives: number[], response?: number): number {
    //check for objectives
    const pagesToCheckObjective = [14, 16, 18, 20, 21, 22, 23, 25, 27, 28, 30, 33, 37, 38, 42];
    if (pagesToCheckObjective.includes(currentPage)) {
      //check if there is no objective left
      if (selectedObjectives.length === 0 || (selectedObjectives.length === 1 && selectedObjectives.includes(16))) {
        return 44;
      }

      const nextObjective = this.getNextObjective(selectedObjectives);
      switch (nextObjective) {
        case 1:
          return 15;
        case 2:
          return 17;
        case 3:
          return 19;
        case 4:
          return 21;
        case 5:
          return 22;
        case 6:
          return 23;
        case 7:
          return 24;
        case 8:
          return 26;
        case 9:
          return 28;
        case 10:
          return 29;
        case 11:
          return 31;
        case 12:
          return 34;
        case 13:
          return 38;
        case 14:
          return 39;
        case 15:
          return 43;
      }
    }

    //skip pages
    switch (currentPage) {
      case 5:
        switch (response) {
          case 1:
            return 6;
          case 2:
            return 8;
        }
        break;
      case 7:
        return 9;
      case 31:
        switch (response) {
          case 1:
            return 32;
          case 2:
            return 33;
          default:
            return this.getNextPage(33, selectedObjectives);
        }
      case 32:
        return this.getNextPage(33, selectedObjectives);
      case 39:
        switch (response) {
          case 1:
            return 42;
          default:
            return 40;
        }
      case 50:
        switch (response) {
          case 1:
            return 51;
          case 2:
            return 52;
          default:
            return this.getNextPage(52, selectedObjectives);
        }
    }

    return currentPage + 1;
  }

  private getNextObjective(selectedObjectives: number[]): number {
    return selectedObjectives.shift() ?? 0;
  }
}