import { Reaction } from "../models/reaction";

export class Reactions {
  private data: { data: Reaction[] } = {
    data: [
      {
        like: 420,
        color: "blue",
      },
      {
        love: 269,
        color: "pink",
      },
      {
        haha: 326,
        color: "yellow",
      },
      {
        wow: 14,
        color: "orange",
      },
      {
        sad: 4,
        color: "lightblue",
      },
      {
        angry: 6,
        color: "red",
      },
    ],
  };

  get reactionsDataFetch() {
    return new Promise((res) => {
      setTimeout(res(this.data) as any, 1000);
    });
  }
}
