'use strict';

/**
 * 一个类似于 switch 的函数，根据条件匹配器，返回对应的处理函数
 * @param matchers 条件匹配器
 * @returns 返回一个函数，该函数接受一个参数，根据参数的值，返回对应的处理函数
 */
const when = (matchers) => {
    let defaultHandler = () => void 0;
    const conds = [];
    let allLiteral = true;
    for (let matcher of matchers) {
        if (typeof matcher === "function")
            defaultHandler = matcher;
        else {
            conds.push(matcher);
            if (allLiteral)
                allLiteral = ["string", "number"].includes(typeof matcher[0]);
        }
    }
    if (allLiteral) {
        const map = new Map(conds);
        return (x) => map.get(x) || defaultHandler(x);
    }
    else {
        return (x) => {
            for (let [cond, handler] of conds) {
                if ((typeof cond === "boolean" && cond) ||
                    (cond instanceof Function && cond(x)) ||
                    cond === x)
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
const createPromise = () => {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    });
    return { promise, resolve, reject };
};

exports.createPromise = createPromise;
exports.when = when;
