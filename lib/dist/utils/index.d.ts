type CondType<T> = T | ((x: T) => boolean);
type HandlerType<T, OUT> = (x: T) => OUT;
/**
 * 一个类似于 switch 的函数，根据条件匹配器，返回对应的处理函数
 * @param matchers 条件匹配器
 * @returns 返回一个函数，该函数接受一个参数，根据参数的值，返回对应的处理函数
 */
export declare const when: <IN = any, OUT = any>(matchers: (HandlerType<IN, OUT> | [CondType<IN>, OUT | HandlerType<IN, OUT>])[]) => ((x: string | number) => OUT | HandlerType<IN, OUT>) | ((x: IN) => OUT | HandlerType<IN, OUT>);
/**
 * 创建一个 Promise 实例，以及 resolve 和 reject 方法
 * @returns 返回一个 Promise 实例，以及 resolve 和 reject 方法
 */
export declare const createPromise: <T = any>() => {
    promise: Promise<T>;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
};
export {};
