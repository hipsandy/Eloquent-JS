// CHAPTER 5


// Flatten an Array or Arrays

// Flattens a 2-D array i.e. an array of arrays
function flattenArray(arrays) {
	var merged = []
	return arrays.reduce(function(merged, arr){
	  return merged.concat(arr)
	})
}

// Flattens n x n array i.e array of array of array...
// Test array: var arrays = [[1, 2, 3, ["k", "i", ["n", "g"]]], [4, 5], [6]];
// output expected: [1, 2, 3, "k", "i", "n", "g", 4, 5, 6]
function flattenArray(arrays) {
  var res = []
  arrays.forEach(function(e1){
    if (Array.isArray(e1)) { 
      flattenArray(e1).forEach(function(e2){
        res.push(e2)
      })
    } else {
			res.push(e1) 
		}
  })
  return res
}

// MOTHER-CHILD DIFFERENCE
function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

// Your code here.

function ageDiffWithMother(person) {
  var mother = byName[person.mother]
  return mother != null ? person.born - mother.born : null
}

function isAgeDiffValid(ageDiff) {
  return ageDiff > 0;
}

var avgDiff = average(ancestry.map(ageDiffWithMother)
  .filter(isAgeDiffValid))
console.log(ancestry[0])
console.log(avgDiff)

// → 31.2



// HISTORICAL LIFE EXPECTANCY

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

// Your code here.
function age(person) {
  return person.died - person.born
}

function centuryLived(person) {
  var result = Math.ceil(person.died / 100)
  return result
}

var centuryAge = {}
centuryAge.put = function(century, age) {
  
  var ageArr = centuryAge[century]
  if (ageArr == null) {
    ageArr = centuryAge[century] = []
  }
  ageArr.push(age)    
}

ancestry.forEach(function(person){
  centuryAge.put(centuryLived(person), age(person))
})

for (century in centuryAge) {
  var ages = centuryAge[century]
  if (typeof ages !== 'function') {
    if (ages.length !== 0) {
      console.log(century + " : " + average(ages))
    }
  }
}

function rowHeights(rows) {
  return rows.map(function(row) {
    return row.reduce(function(max, cell) {
      return Math.max(max, cell.minHeight());
    }, 0);
  });
}

