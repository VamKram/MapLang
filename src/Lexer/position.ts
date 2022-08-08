
export default class Position {
  /**
   *
   * @param {number} idx - 索引
   * @param {number} line - 行号
   * @param {number} col - 列号
   * @param {string} fileName - 文件名
   * @param {string} content - 内容
   */
  constructor(
    public idx: number,
    public line: number,
    public col: number,
    public fileName: string,
    public content: string,
  ) {
    this.col = col;
    this.idx = idx;
    this.line = line;
    this.content = content;
    this.fileName = fileName;
  }


  adv(curChar: string){
    this.idx++;
    this.col++;
    if (curChar === '\n') {
      this.col = 0
      this.line++
    }
  }

  clone() {
    return new Position(this.idx, this.line, this.col, this.fileName, this.content);
  }
}
