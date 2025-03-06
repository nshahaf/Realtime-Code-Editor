import vm from 'node:vm'
/**
 * Function to test user input code
 * @param {string} userCode - The user input code as a string
 * @param {Function} testFunction - The function to test the user code against
 * @returns {boolean} - Returns true if the user code meets the requirements, otherwise false
 */
export default function testUserCode(userCode, testFunction) {
    try {
        // Create a new VM context
        const sandbox = { result: null }
        const context = vm.createContext(sandbox)

        // Wrap the user code in a function and assign it to the sandbox result
        const wrappedCode = `result = ${userCode}`

        // Create a script from the wrapped user code
        const script = new vm.Script(wrappedCode)

        // Run the script in the VM context
        script.runInContext(context)

        // Check if the user code meets the requirements
        return testFunction(sandbox.result)
    } catch (error) {
        return false
    }
}



