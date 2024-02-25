type CondType<T> = T | ((x: T) => boolean);
type HandlerType<T, OUT> = (x: T) => OUT;

/**
 * 一个类似于 switch 的函数，根据条件匹配器，返回对应的处理函数
 * @param matchers 条件匹配器
 * @returns 返回一个函数，该函数接受一个参数，根据参数的值，返回对应的处理函数
 */
export const when = <IN = any, OUT = any>(
  matchers: (
    | [CondType<IN>, OUT | HandlerType<IN, OUT>]
    | HandlerType<IN, OUT>
  )[]
) => {
  let defaultHandler: HandlerType<IN, OUT> = () => void 0;
  const conds: [CondType<IN>, HandlerType<IN, OUT>][] = [];

  let allLiteral = true;
  for (let matcher of matchers) {
    if (typeof matcher === "function") defaultHandler = matcher;
    else {
      conds.push(matcher as [CondType<IN>, HandlerType<IN, OUT>]);
      if (allLiteral)
        allLiteral = ["string", "number"].includes(typeof matcher[0]);
    }
  }

  if (allLiteral) {
    const map = new Map(conds as [string | number, HandlerType<IN, OUT>][]);
    return (x: string | number) => map.get(x) || defaultHandler(x as IN);
  } else {
    return (x: IN) => {
      for (let [cond, handler] of conds) {
        if (
          (typeof cond === "boolean" && cond) ||
          (cond instanceof Function && cond(x as IN)) ||
          cond === x
        )
          return handler;
      }
      return defaultHandler(x);
    };
  }
};

/**
 * 创建一个 Promise 实例，以及 resolve 和 reject 方法
 * @returns 返回一个 Promise 实例，以及 resolve 和 reject 方法
 */
export const createPromise = <T = any>() => {
  let resolve: (value: T | PromiseLike<T>) => void;
  let reject: (reason?: any) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};
