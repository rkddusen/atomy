import { useEffect, useRef, useState } from "react";
import "./App.css";

interface NewDiv {
  start: number;
  num: number;
}

const App = () => {
  const [num, setNum] = useState<number>(0);
  const [child, setChild] = useState<number[]>([0, 0]);
  const [divs, setDivs] = useState<NewDiv[]>([]);
  const numRef = useRef<HTMLInputElement>(null);

  const handleFind = (): void => {
    if (numRef.current?.value && Number(numRef.current.value) > 0) {
      setNum(Number(numRef.current.value));
    } else {
      setNum(0);
    }
  };

  useEffect(() => {
    if (num > 0) {
      setChild(findChild(num));

      let parentArray: number[] = findParent(num, [num]);
      let divArray: NewDiv[] = [];

      let start = 0;

      for (let i = 0; i < parentArray.length; i++) {
        if (i === 0) {
          divArray.push({ num: parentArray[i], start: start });
        } else {
          if (parentArray[i] - parentArray[i - 1] === Math.pow(2, i - 1)) {
            start += -20;
            divArray.push({
              num: parentArray[i],
              start: start,
            });
          } else {
            start += 20;
            divArray.push({
              num: parentArray[i],
              start: start,
            });
          }
        }
      }
      setDivs(divArray);
    }
  }, [num]);

  const findParent = (now: number, parent: number[]): number[] => {
    if (now === 1) return parent;

    let min = 1,
      max = 1;
    while (1) {
      if (min > now) {
        min /= 2;
        break;
      } else min *= 2;
    }
    max = min * 2 - 1;

    if (now - min < max - now) {
      // now는 부모의 왼쪽에
      return findParent(now - min / 2, [now - min / 2, ...parent]);
    } else {
      // now는 부모의 오른쪽에
      return findParent(now - min, [now - min, ...parent]);
    }
  };

  const findChild = (now: number): number[] => {
    let min = 1;
    while (1) {
      if (min > now) {
        min /= 2;
        break;
      } else min *= 2;
    }

    return [now + min, now + min * 2];
  };

  return (
    <div className="w-full">
      <div className="text-center pt-50 flex justify-center items-center">
        <input
          ref={numRef}
          type="text"
          className="w-120 h-40 border border-black text-24 text-center"
        />
        <button
          onClick={handleFind}
          className="text-16 border-black border h-40 px-10 bg-orange-100"
        >
          찾기
        </button>
      </div>
      <div className="text-center text-20 pt-10 pb-30">
        좌 : {child[0]} / 우 : {child[1]}
      </div>
      <div className="relative w-full">
        <div className="w-40 absolute top-0 left-1/2 -translate-x-20">
          {divs.map((v, i) => (
            <div
              key={i}
              className={`w-40 h-40 mb-20 relative ${
                v.start > 0 ? `-left-[${v.start}]` : `-right-[${v.start}]`
              } text-14 flex justify-center items-center border border-black rounded-full`}
              style={{
                left: v.start > 0 ? `${v.start}px` : "auto",
                right: v.start <= 0 ? `${-v.start}px` : "auto",
              }}
            >
              {v.num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
