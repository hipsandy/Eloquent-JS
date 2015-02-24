// CHAPTER 6

var cell = {
  ht: 0,
	wd: 0,
	minHeight: function() {return this.ht},
	minWidth: function() {return this.wd},
	// getter and setter method
	get fwd() {
		console.log("get wd called");
	},
	set fwd(value) {
		console.log("set wd called with " + value);
	},
}

function newCell(ht, wd) {
	var c = Object.create(cell)
	c.ht = ht
	c.wd = wd
	return c
}

var rows = [[newCell(4, 6), newCell(5, 8), newCell(3, 10)],
	[newCell(5, 6), newCell(7, 8), newCell(13, 10)],
	[newCell(1, 6), newCell(0, 8), newCell(4, 10)],
]

// Invoke getter and setter methods
var testCell = newCell(5, 6)
testCell.fwd
testCell.fwd = 343
console.log("****** TEST RESULTS ********")
console.log("proto: " + Object.getPrototypeOf(newCell(5, 6)))
console.log("rowHeights: " + rowHeights(rows))
console.log("colWidths: " + colWidths(rows))
console.log("colSizeUsingHigherOrderFunctions: " + colSizeUsingHigherOrderFunctions(rows))
console.log("colSize: " + colSize(rows))


function rowHeights(rows) {
  return rows.map(function(row) {
    return row.reduce(function(max, cell) {
      return Math.max(max, cell.minHeight());
    }, 0);
  });
}

function colWidths(rows) {
  return rows[0].map(function(_, i) {
    return rows.reduce(function(max, row) {
      return Math.max(max, row[i].minWidth());
    }, 0);
  });
}

// My Implementations below here

// colWidth() method above implemented iteratively as per my naive coding skills
// simple thoughts to code conversion
function colSize(rows) {
  var res = []
  for (var c = 0; c < rows[0].length; c++) {
    var max = 0
    for (var r = 0; r < rows.length; r++) {
      var row = rows[r]
      max = Math.max(max, row[c].minWidth())
    }
    res.push(max)
  }
  return res
}


// Coverted the iterative approach above to use higher-order functions of Arrays.
// Starting from innermost function, replaced each for loop with a higher-order function
function colSizeUsingHigherOrderFunctions(rows) { 
  return rows[0].map(function(_notUsed, c){
    return rows.reduce(function(max, row){
      return Math.max(max, row[c].minWidth())
    }, 0)
  })
}


// EXERCISES

// VECTOR TYPE

// Your code here.
function Vector(x, y){
  this.x = x
  this.y = y
}

Vector.prototype.plus = function(v) {
  return new Vector(this.x + v.x, this.y + v.y)
}

Vector.prototype.minus = function(v) {
  return new Vector(this.x - v.x, this.y - v.y)
}

Object.defineProperty(Vector.prototype, "length",
                      {
                        get: function() {
                          return Math.sqrt(
                            Math.pow(this.x, 2) + Math.pow(this.y, 2)
                          )
                        }
                      })
                      
console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// → Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// → Vector{x: -1, y: -1}
console.log(new Vector(3, 4).length);
// → 5




// STRETCH CELL EXAMPLE

// Your code here.
function StretchCell(inner, width, height) {
	this.inner = inner
  this.width = width
	this.height = height
}
StretchCell.prototype = Object.create(TextCell.prototype)
StretchCell.prototype.minWidth = function() {
  return Math.max(this.width, this.inner.minWidth())
}
StretchCell.prototype.minHeight = function() {
  return Math.max(this.height, this.inner.minHeight())
}
StretchCell.prototype.draw = function(width, height) {
  return this.inner.draw(this.minWidth(), this.minHeight())
}

var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());
// → 3
console.log(sc.minHeight());
// → 2
console.log(sc.draw(3, 2));
// → ["abc", "   "]




// SEQUENCE INTERFACE
// Your code here.
function Iterable() {
}
Iterable.prototype.sequence = function(){}

function ArraySeq(arr) {
  this.arr = arr
}
ArraySeq.prototype = Object.create(Iterable.prototype)
ArraySeq.prototype.sequence = function(){
  return this.arr
}

function RangeSeq(from, to) {
  this.from = from
  this.to = to
}
RangeSeq.prototype = Object.create(Iterable.prototype)
RangeSeq.prototype.sequence = function(){
  var arr = []
  for (var i = this.from; i < this.to; i++) {
    arr.push(i)
  }
  return arr
}

function logFive(iterable) {
  var arr = iterable.sequence()
  for (var i = 0; i < 5; i++){
    if(arr[i] != null)
      console.log(arr[i])
  }
}


logFive(new ArraySeq([1, 2]));
// → 1
// → 2
logFive(new RangeSeq(100, 1000));
// → 100
// → 101
// → 102
// → 103
// → 104
