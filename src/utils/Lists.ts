export interface Matrix<T> extends Array<Array<T>> {}

export function shuffle<T>(array: T[]): T[] {
  let temp: T;
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function chunk<T>(array: T[], chunkSize: number): T[][] {
    const out: T[][] = [];
    for(let i = 0; i < array.length; i += chunkSize){
        out.push(array.slice(i, i+chunkSize));
    }
    return out;
}
