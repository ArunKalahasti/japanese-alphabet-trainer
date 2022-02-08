export class Character {
    public readonly english: string;
    public readonly japanese: string | null;
    constructor(english: string, japanese: string | null) {
      this.english = english;
      this.japanese = japanese;
    }
}
