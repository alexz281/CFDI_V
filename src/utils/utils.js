export const isPromise = function (object) {
    if(Promise && Promise.resolve){
        return Promise.resolve(object) == object;
    }else{
        throw "Promise not supported in your environment";
    }
};

export const shallowCopy = function (arg) {
    if (Array.isArray(arg)) {
        return [...arg];
    }
    else if (typeof arg === 'object') {
        return {...arg};
    }

    return arg;
};