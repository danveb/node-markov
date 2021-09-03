/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

   makeChains() {
    // TODO
    // start with empty object
    const chain = {} 
    const words = this.words

    // Iterate this.words pushing next to chain[word] 
    for(let i = 0; i < words.length; i++) {
      let word = this.words[i]
      let next = this.words[i + 1]
  
      // For new word, set word as key in chain, set val as next, or if no next set val to null 
      if(!chain[word]) {
        chain[word] = !next ? [null] : [next] 
      } else {
        // if chain has word as key and push next to array; if no next then push null 
        chain[word].push(!next ? null : next) 
      }
    }
    // set object property
    this.chain = chain; 
  }

  // Function to return random element from array 
  randomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)] 
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    // Random first word 
    let word = this.randomArrayElement(Object.keys(this.chain))
    let text = word

    // Counter for loop 
    let counter = 1; 
    // Loop to concat new words to "text" string 
    while(counter <= numWords) {
      // set "word" to random element in this.chain item array 
      word = this.randomArrayElement(this.chain[word])
      // break at null 
      if(word === null) {
        break; 
      }

      // concat new words to text 
      text += `${word}`
      counter++; 
    }
    return text; 
  }
}

// module.exports 
module.exports = { MarkovMachine }