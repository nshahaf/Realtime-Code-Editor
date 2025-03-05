export const codeBlocks = [
    {
        "title": "Reverse a String",
        "description": "Write a function to reverse a string.",
        "initialCode": "//Write a function to reverse a string.\n//Example: reverseString('hello') should return 'olleh'\n\nfunction reverseString(str) {\n  return ' ' // TODO: Implement the function logic\n}\n\nconsole.log(reverseString(\"hello\"));",
        "solution": "function reverseString(str) {\n  return str.split('').reverse().join('');\n}\n\nconsole.log(reverseString(\"hello\"));",
        "difficulty": "Easy"
    },
    {
        "title": "Find the Largest Number",
        "description": "Write a function that finds the largest number in an array.",
        "initialCode": "//Write a function that finds the largest number in an array.\n//Example: findLargestNumber([3, 1, 4, 1, 5, 9]) should return 9\nfunction findLargestNumber(arr) {\n  return null // TODO: Implement the function logic\n}\n\nconst resault = findLargestNumber([3, 1, 4, 1, 5, 9])\nconsole.log(resault)\n",
        "solution": "function findLargestNumber(arr) {\n  return Math.max(...arr)\n}\nconst resault = findLargestNumber([3, 1, 4, 1, 5, 9])\nconsole.log(resault)\n",
        "difficulty": "Medium"
    },
    {
        "title": "Fix the Async Bug",
        "description": "The following function fetches data from a URL. However, there is a bug. Can you find and fix it?",
        "initialCode": "//The following function fetches data from a URL.\n//However, there is a bug. Can you find and fix it? \nasync function fetchData(url) {\n  const response = await fetch(url);\n  const data = \n  return data // Bug: \"data\" is not defined\n}",
        "solution": "async function fetchData(url) {\n  const response = await fetch(url);\n  const data = await response.json();\n  return data\n}",
        "difficulty": "Hard"
    },
    {
        "title": "Hello, World!",
        "description": "Write a function that prints 'Hello, World!'.",
        "initialCode": "//Write a function that prints 'Hello, World!'.\nfunction helloWorld() {\n  console.___(\"Hello, World!\");\n}\n\nhelloWorld()",
        "solution": "function helloWorld() {\n  console.log(\"Hello, World!\");\n}\n\nhelloWorld()",
        "difficulty": "Easy"
    },
    {
        "title": "Sum of Two Numbers",
        "description": "Write a function that takes two numbers, adds them together, and prints the result.",
        "initialCode": "//Write a function that takes two numbers, adds them together, and prints the result.\nfunction sum(a, b) {\n  return null //TODO: Implement the function logic\n}\nconsole.log(sum(3,6))",
        "solution": "function sum(a, b) {\n  return a+b\n}\nconsole.log(sum(3,6))",
        "difficulty": "Easy"
    }
]