type Add = (numbers: string) => number

export const add: Add = (numbers: string): number => {

   if (!numbers) return 0

  let delimiters = /,|\n/
  let numberString = numbers

  if (numbers.startsWith("//")) {
    const match = numbers.match(/^\/\/(.+)\n(.*)/)
    if (match) {
      const [, delimiter, rest] = match
      delimiters = new RegExp(delimiter)
      numberString = rest
    }
  }

  const tokens = numberString.split(delimiters)
  const nums = tokens.map(Number)
    
      
  return nums.reduce((sum, n) => sum + n, 0)
 
}
