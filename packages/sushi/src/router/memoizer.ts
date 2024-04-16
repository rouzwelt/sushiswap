import memoize from "memoize-fs";

const serialize = (val: any) => {
  const circRefColl = [];
    return JSON.stringify(val, function (name, value) {
        if (typeof value === 'function') {
            return; // ignore arguments and attributes of type function silently
        }
        if (typeof value === 'object' && value !== null) {
            if (circRefColl.indexOf(value) !== -1) {
                // circular reference has been found, discard key
                return;
            }
            // store value in collection
            circRefColl.push(value);
        }
        if (typeof value === 'bigint') return value.toString() + "n"
        return value;
    });
}

const deserialize = (val: string) => {
    return JSON.parse(val, function(_key, value) {
        if (typeof value === "string" && /^\d+n$/.test(value)) {
            return BigInt(value.slice(0, -1));
        }
        else return value;
    }).data;
}

export const memoizer = memoize({ cachePath: "./mem-cache", serialize, deserialize })