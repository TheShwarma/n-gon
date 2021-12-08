/// this file contains various calculations

// generates 64-bit random numbers
export function uniqueID(): BigInt {
    return crypto.getRandomValues(new BigUint64Array(1))[0]
}