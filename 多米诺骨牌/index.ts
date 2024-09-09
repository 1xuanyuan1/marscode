function output(standingPositions: number[]) {
    return `${standingPositions.length}${standingPositions.length > 0 ? ':' : ''}${standingPositions.join(',')}`;
}

function solution(data: string, lastIndex = 0): number[] {
  console.log('solution', data, lastIndex)
  // 首先创建一个数组来存储每个骨牌的状态
  const status: string[] = data.split('');
  // 骨牌的数量
  const num: number = status.length;
  const standingPositions: number[] = [];
  // 处理开始的部分
  const firstLeftIndex = status.indexOf('L')
  const firstRightIndex = status.indexOf('R')

  // 没有任何操作则全部竖立
  if (firstLeftIndex === -1 && firstRightIndex === -1) {
      return Array.from({ length: num }, (_, index) => index + 1 + lastIndex)
  }

  // 没有右只有左
  if (firstRightIndex === -1) {
    for (let i = firstLeftIndex + 2; i <= num; i++) {
          standingPositions.push(i + lastIndex)
    }
    return standingPositions
  }
  
  // 没有左只有右
  if (firstLeftIndex === -1) {
     for (let i = 1; i <= firstRightIndex; i++) {
          standingPositions.push(i + lastIndex)
    }
    return standingPositions
  }


  if (firstLeftIndex != -1 && firstLeftIndex < firstRightIndex) {
      // L前面全倒， 第一个L ~ 第一个R 直接全部竖立
      for (let i = firstLeftIndex + 2; i <= firstRightIndex; i++) {
          standingPositions.push(i + lastIndex)
      }
  } else if (firstRightIndex > 0) {
      // R前面全部竖立
      for (let i = 1; i <= firstRightIndex; i++) {
          standingPositions.push(i + lastIndex)
      }
  }

  const newStatus = status.slice(firstRightIndex)

  console.log('newStatus', newStatus.join(''))

  const nextLeftIndex = newStatus.indexOf('L')
 
  if (nextLeftIndex === -1) {
    return standingPositions
  } else {
    const list = newStatus.slice(0, nextLeftIndex + 1)
    if (list.length % 2 !== 0) {
      standingPositions.push(Math.ceil(list.length / 2) + firstRightIndex + lastIndex)
    }
  }
  return [
    ...standingPositions,
    ...solution(newStatus.slice(1).join(''), firstRightIndex + lastIndex + 1)
  ]
}

function main() {
    //  You can add more test cases here

  // console.log(output(solution(".L.R...LR..L.R.")))
    // solution(5, "R....")
    // solution(1, ".")
  console.log(output(solution(".L.R...LR..L..")) === "4:3,6,13,14");
  console.log(output(solution("R....")) === "0");
  console.log(output(solution(".")) === "1:1");

}

main();