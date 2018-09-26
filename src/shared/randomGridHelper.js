// generate a 2D matrix representing the value of the cards
// the card value ranges in [0, maxNumber], comes in pairs
// the positions of cards are randomly shuffled
export function generateRandomGrid(maxNumber) {
  if(maxNumber < 0 || Math.floor(maxNumber) !== maxNumber) {
    return null;
  }
  const totalCardNumber = 2 * maxNumber
  const cardsArray = [], cardsGrid = [];
  for(let i = 0; i < maxNumber; ++i) {
    cardsArray.push(i);
    cardsArray.push(i);
  }

  const { fstFactor, sndFactor } = closestFactors(totalCardNumber);
  for(let i = 0; i < fstFactor; ++i) {
    cardsGrid[i] = [];
    for(let j = 0; j < sndFactor; ++j) {
      let randIdx = randomInt(cardsArray.length);
      cardsGrid[i][j] = cardsArray[randIdx];
      cardsArray.splice(randIdx, 1);
    }
  }

  return cardsGrid;
}

// generate a random integer in range [min, max)
function randomInt(max, min = 0) {
  if(max < min) {
    return null;
  }
  const intMax = Math.floor(max), intMin = Math.floor(min);
  return intMin + Math.floor((intMax - intMin) * Math.random());
}


// calculate the two factors whose product is equal to the target
// and their difference is minimal
function closestFactors(target) {
  const sqrt = Math.floor(Math.sqrt(target));
  const results = [];
  for(let i = 2; i <= sqrt; ++i) {
    let intQuotient = Math.floor(target / i);
    if(target / i === intQuotient) {
      results.push({fstFactor: i, sndFactor: intQuotient});
    }
  }

  let minDiff = Number.MAX_SAFE_INTEGER, minComb = null;
  for(let comb of results) {
    let currentDiff = comb.sndFactor - comb.fstFactor;
    if(currentDiff < minDiff) {
      minDiff = currentDiff;
      minComb = comb;
    }
  }
  return minComb;
}