const testReverseString = (test) => {
    try {

        return test('hello') === 'olleh'
            && test('world') === 'dlrow'
            && test('ab') === 'ba'
    } catch {
        return false
    }
}

const testFindLargestNumber = (test) => {
    try {
        return test([1, 2, 3]) === 3
            && test([10, 20, 30]) === 30
            && test([-1, -2, -3]) === -1
    } catch {
        return false
    }
}

const testAddNumbers = (test) => {
    try {
        return test(2, 3) === 5
            && test(1, 2) === 3
            && test(0, 0) === 0
    } catch {
        return false
    }
}

const testFactorial = (test) => {
    try {
        return test(5) === 120
            && test(0) === 1
            && test(1) === 1
    } catch {
        return false
    }
}

const testIsPalindrome = (test) => {
    try {
        return test('') === true
            && test('a') === true
            && test('ab') === false
            && test('racecar') === true
            && test('hello') === false
            && test('ahbbha') === true
    } catch {
        return false
    }
}

const testFibonacci = (test) => {
    try {
        return test(0) === 0
            && test(1) === 1
            && test(2) === 1
            && test(3) === 2
    } catch {
        return false
    }

}

export const testFunctions = {
    testReverseString,
    testFindLargestNumber,
    testAddNumbers,
    testFactorial,
    testIsPalindrome,
    testFibonacci
}