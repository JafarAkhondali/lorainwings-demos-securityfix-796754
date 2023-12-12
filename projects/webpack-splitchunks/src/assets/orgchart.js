//  Ramda v0.27.0
//  https://github.com/ramda/ramda
//  (c) 2013-2020 Scott Sauyet, Michael Hurley, and David Chambers
//  Ramda may be freely distributed under the MIT license.

;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global = global || self), factory((global.R = {})))
})(this, function (exports) {
  'use strict'

  /**
   * A function wrapping calls to the two functions in an `||` operation,
   * returning the result of the first function if it is truth-y and the result
   * of the second function otherwise. Note that this is short-circuited,
   * meaning that the second function will not be invoked if the first returns a
   * truth-y value.
   *
   * In addition to functions, `R.either` also accepts any fantasy-land compatible
   * applicative functor.
   *
   * @func
   * @memberOf R
   * @since v0.12.0
   * @category Logic
   * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
   * @param {Function} f a predicate
   * @param {Function} g another predicate
   * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
   * @see R.or
   * @example
   *
   *      const gt10 = x => x > 10;
   *      const even = x => x % 2 === 0;
   *      const f = R.either(gt10, even);
   *      f(101); //=> true
   *      f(8); //=> true
   *
   *      R.either(Maybe.Just(false), Maybe.Just(55)); // => Maybe.Just(55)
   *      R.either([false, false, 'a'], [11]) // => [11, 11, "a"]
   */
  var either = _curry2(function either(f, g) {
    return _isFunction(f)
      ? function _either() {
          return f.apply(this, arguments) || g.apply(this, arguments)
        }
      : lift(or)(f, g)
  })

  /**
   * Returns the empty value of its argument's type. Ramda defines the empty
   * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments. Other
   * types are supported if they define `<Type>.empty`,
   * `<Type>.prototype.empty` or implement the
   * [FantasyLand Monoid spec](https://github.com/fantasyland/fantasy-land#monoid).
   *
   * Dispatches to the `empty` method of the first argument, if present.
   *
   * @func
   * @memberOf R
   * @since v0.3.0
   * @category Function
   * @sig a -> a
   * @param {*} x
   * @return {*}
   * @example
   *
   *      R.empty(Just(42));      //=> Nothing()
   *      R.empty([1, 2, 3]);     //=> []
   *      R.empty('unicorns');    //=> ''
   *      R.empty({x: 1, y: 2});  //=> {}
   */
  var empty = _curry1(function empty(x) {
    return x != null && typeof x['fantasy-land/empty'] === 'function'
      ? x['fantasy-land/empty']()
      : x != null &&
        x.constructor != null &&
        typeof x.constructor['fantasy-land/empty'] === 'function'
      ? x.constructor['fantasy-land/empty']()
      : x != null && typeof x.empty === 'function'
      ? x.empty()
      : x != null &&
        x.constructor != null &&
        typeof x.constructor.empty === 'function'
      ? x.constructor.empty()
      : _isArray(x)
      ? []
      : _isString(x)
      ? ''
      : _isObject(x)
      ? {}
      : _isArguments(x)
      ? (function () {
          return arguments
        })()
      : void 0 // else
  })

  /**
   * Returns a new list containing the last `n` elements of the given list.
   * If `n > list.length`, returns a list of `list.length` elements.
   *
   * @func
   * @memberOf R
   * @since v0.16.0
   * @category List
   * @sig Number -> [a] -> [a]
   * @sig Number -> String -> String
   * @param {Number} n The number of elements to return.
   * @param {Array} xs The collection to consider.
   * @return {Array}
   * @see R.dropLast
   * @example
   *
   *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
   *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
   *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
   *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
   *      R.takeLast(3, 'ramda');               //=> 'mda'
   */
  var takeLast = _curry2(function takeLast(n, xs) {
    return drop(n >= 0 ? xs.length - n : 0, xs)
  })

  /**
   * Checks if a list ends with the provided sublist.
   *
   * Similarly, checks if a string ends with the provided substring.
   *
   * @func
   * @memberOf R
   * @since v0.24.0
   * @category List
   * @sig [a] -> [a] -> Boolean
   * @sig String -> String -> Boolean
   * @param {*} suffix
   * @param {*} list
   * @return {Boolean}
   * @see R.startsWith
   * @example
   *
   *      R.endsWith('c', 'abc')                //=> true
   *      R.endsWith('b', 'abc')                //=> false
   *      R.endsWith(['c'], ['a', 'b', 'c'])    //=> true
   *      R.endsWith(['b'], ['a', 'b', 'c'])    //=> false
   */
  var endsWith = _curry2(function (suffix, list) {
    return equals(takeLast(suffix.length, list), suffix)
  })

  /**
   * Takes a function and two values in its domain and returns `true` if the
   * values map to the same value in the codomain; `false` otherwise.
   *
   * @func
   * @memberOf R
   * @since v0.18.0
   * @category Relation
   * @sig (a -> b) -> a -> a -> Boolean
   * @param {Function} f
   * @param {*} x
   * @param {*} y
   * @return {Boolean}
   * @example
   *
   *      R.eqBy(Math.abs, 5, -5); //=> true
   */
  var eqBy = _curry3(function eqBy(f, x, y) {
    return equals(f(x), f(y))
  })

  /**
   * Reports whether two objects have the same value, in [`R.equals`](#equals)
   * terms, for the specified property. Useful as a curried predicate.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Object
   * @sig k -> {k: v} -> {k: v} -> Boolean
   * @param {String} prop The name of the property to compare
   * @param {Object} obj1
   * @param {Object} obj2
   * @return {Boolean}
   *
   * @example
   *
   *      const o1 = { a: 1, b: 2, c: 3, d: 4 };
   *      const o2 = { a: 10, b: 20, c: 3, d: 40 };
   *      R.eqProps('a', o1, o2); //=> false
   *      R.eqProps('c', o1, o2); //=> true
   */
  var eqProps = _curry3(function eqProps(prop, obj1, obj2) {
    return equals(obj1[prop], obj2[prop])
  })

  /**
   * Creates a new object by recursively evolving a shallow copy of `object`,
   * according to the `transformation` functions. All non-primitive properties
   * are copied by reference.
   *
   * A `transformation` function will not be invoked if its corresponding key
   * does not exist in the evolved object.
   *
   * @func
   * @memberOf R
   * @since v0.9.0
   * @category Object
   * @sig {k: (v -> v)} -> {k: v} -> {k: v}
   * @param {Object} transformations The object specifying transformation functions to apply
   *        to the object.
   * @param {Object} object The object to be transformed.
   * @return {Object} The transformed object.
   * @example
   *
   *      const tomato = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
   *      const transformations = {
   *        firstName: R.trim,
   *        lastName: R.trim, // Will not get invoked.
   *        data: {elapsed: R.add(1), remaining: R.add(-1)}
   *      };
   *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
   */
  var evolve = _curry2(function evolve(transformations, object) {
    var result = object instanceof Array ? [] : {}
    var transformation, key, type
    for (key in object) {
      transformation = transformations[key]
      type = typeof transformation
      result[key] =
        type === 'function'
          ? transformation(object[key])
          : transformation && type === 'object'
          ? evolve(transformation, object[key])
          : object[key]
    }
    return result
  })

  function XFind(f, xf) {
    this.xf = xf
    this.f = f
    this.found = false
  }
  XFind.prototype['@@transducer/init'] = _xfBase.init
  XFind.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, void 0)
    }
    return this.xf['@@transducer/result'](result)
  }
  XFind.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.found = true
      result = _reduced(this.xf['@@transducer/step'](result, input))
    }
    return result
  }

  var _xfind = _curry2(function _xfind(f, xf) {
    return new XFind(f, xf)
  })

  /**
   * Returns the first element of the list which matches the predicate, or
   * `undefined` if no element matches.
   *
   * Dispatches to the `find` method of the second argument, if present.
   *
   * Acts as a transducer if a transformer is given in list position.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category List
   * @sig (a -> Boolean) -> [a] -> a | undefined
   * @param {Function} fn The predicate function used to determine if the element is the
   *        desired one.
   * @param {Array} list The array to consider.
   * @return {Object} The element found, or `undefined`.
   * @see R.transduce
   * @example
   *
   *      const xs = [{a: 1}, {a: 2}, {a: 3}];
   *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
   *      R.find(R.propEq('a', 4))(xs); //=> undefined
   */
  var find = _curry2(
    _dispatchable(['find'], _xfind, function find(fn, list) {
      var idx = 0
      var len = list.length
      while (idx < len) {
        if (fn(list[idx])) {
          return list[idx]
        }
        idx += 1
      }
    })
  )

  function XFindIndex(f, xf) {
    this.xf = xf
    this.f = f
    this.idx = -1
    this.found = false
  }
  XFindIndex.prototype['@@transducer/init'] = _xfBase.init
  XFindIndex.prototype['@@transducer/result'] = function (result) {
    if (!this.found) {
      result = this.xf['@@transducer/step'](result, -1)
    }
    return this.xf['@@transducer/result'](result)
  }
  XFindIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1
    if (this.f(input)) {
      this.found = true
      result = _reduced(this.xf['@@transducer/step'](result, this.idx))
    }
    return result
  }

  var _xfindIndex = _curry2(function _xfindIndex(f, xf) {
    return new XFindIndex(f, xf)
  })

  /**
   * Returns the index of the first element of the list which matches the
   * predicate, or `-1` if no element matches.
   *
   * Acts as a transducer if a transformer is given in list position.
   *
   * @func
   * @memberOf R
   * @since v0.1.1
   * @category List
   * @sig (a -> Boolean) -> [a] -> Number
   * @param {Function} fn The predicate function used to determine if the element is the
   * desired one.
   * @param {Array} list The array to consider.
   * @return {Number} The index of the element found, or `-1`.
   * @see R.transduce
   * @example
   *
   *      const xs = [{a: 1}, {a: 2}, {a: 3}];
   *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
   *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
   */
  var findIndex = _curry2(
    _dispatchable([], _xfindIndex, function findIndex(fn, list) {
      var idx = 0
      var len = list.length
      while (idx < len) {
        if (fn(list[idx])) {
          return idx
        }
        idx += 1
      }
      return -1
    })
  )

  function XFindLast(f, xf) {
    this.xf = xf
    this.f = f
  }
  XFindLast.prototype['@@transducer/init'] = _xfBase.init
  XFindLast.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](
      this.xf['@@transducer/step'](result, this.last)
    )
  }
  XFindLast.prototype['@@transducer/step'] = function (result, input) {
    if (this.f(input)) {
      this.last = input
    }
    return result
  }

  var _xfindLast = _curry2(function _xfindLast(f, xf) {
    return new XFindLast(f, xf)
  })

  /**
   * Returns the last element of the list which matches the predicate, or
   * `undefined` if no element matches.
   *
   * Acts as a transducer if a transformer is given in list position.
   *
   * @func
   * @memberOf R
   * @since v0.1.1
   * @category List
   * @sig (a -> Boolean) -> [a] -> a | undefined
   * @param {Function} fn The predicate function used to determine if the element is the
   * desired one.
   * @param {Array} list The array to consider.
   * @return {Object} The element found, or `undefined`.
   * @see R.transduce
   * @example
   *
   *      const xs = [{a: 1, b: 0}, {a:1, b: 1}];
   *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
   *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
   */
  var findLast = _curry2(
    _dispatchable([], _xfindLast, function findLast(fn, list) {
      var idx = list.length - 1
      while (idx >= 0) {
        if (fn(list[idx])) {
          return list[idx]
        }
        idx -= 1
      }
    })
  )

  function XFindLastIndex(f, xf) {
    this.xf = xf
    this.f = f
    this.idx = -1
    this.lastIdx = -1
  }
  XFindLastIndex.prototype['@@transducer/init'] = _xfBase.init
  XFindLastIndex.prototype['@@transducer/result'] = function (result) {
    return this.xf['@@transducer/result'](
      this.xf['@@transducer/step'](result, this.lastIdx)
    )
  }
  XFindLastIndex.prototype['@@transducer/step'] = function (result, input) {
    this.idx += 1
    if (this.f(input)) {
      this.lastIdx = this.idx
    }
    return result
  }

  var _xfindLastIndex = _curry2(function _xfindLastIndex(f, xf) {
    return new XFindLastIndex(f, xf)
  })

  /**
   * Returns the index of the last element of the list which matches the
   * predicate, or `-1` if no element matches.
   *
   * Acts as a transducer if a transformer is given in list position.
   *
   * @func
   * @memberOf R
   * @since v0.1.1
   * @category List
   * @sig (a -> Boolean) -> [a] -> Number
   * @param {Function} fn The predicate function used to determine if the element is the
   * desired one.
   * @param {Array} list The array to consider.
   * @return {Number} The index of the element found, or `-1`.
   * @see R.transduce
   * @example
   *
   *      const xs = [{a: 1, b: 0}, {a:1, b: 1}];
   *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
   *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
   */
  var findLastIndex = _curry2(
    _dispatchable([], _xfindLastIndex, function findLastIndex(fn, list) {
      var idx = list.length - 1
      while (idx >= 0) {
        if (fn(list[idx])) {
          return idx
        }
        idx -= 1
      }
      return -1
    })
  )

  /**
   * Returns a new list by pulling every item out of it (and all its sub-arrays)
   * and putting them in a new array, depth-first.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category List
   * @sig [a] -> [b]
   * @param {Array} list The array to consider.
   * @return {Array} The flattened list.
   * @see R.unnest
   * @example
   *
   *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
   *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
   */
  var flatten = _curry1(_makeFlat(true))

  /**
   * Returns a new function much like the supplied one, except that the first two
   * arguments' order is reversed.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Function
   * @sig ((a, b, c, ...) -> z) -> (b -> a -> c -> ... -> z)
   * @param {Function} fn The function to invoke with its first two parameters reversed.
   * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
   * @example
   *
   *      const mergeThree = (a, b, c) => [].concat(a, b, c);
   *
   *      mergeThree(1, 2, 3); //=> [1, 2, 3]
   *
   *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
   * @symb R.flip(f)(a, b, c) = f(b, a, c)
   */
  var flip = _curry1(function flip(fn) {
    return curryN(fn.length, function (a, b) {
      var args = Array.prototype.slice.call(arguments, 0)
      args[0] = b
      args[1] = a
      return fn.apply(this, args)
    })
  })

  /**
   * Iterate over an input `list`, calling a provided function `fn` for each
   * element in the list.
   *
   * `fn` receives one argument: *(value)*.
   *
   * Note: `R.forEach` does not skip deleted or unassigned indices (sparse
   * arrays), unlike the native `Array.prototype.forEach` method. For more
   * details on this behavior, see:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
   *
   * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns
   * the original array. In some libraries this function is named `each`.
   *
   * Dispatches to the `forEach` method of the second argument, if present.
   *
   * @func
   * @memberOf R
   * @since v0.1.1
   * @category List
   * @sig (a -> *) -> [a] -> [a]
   * @param {Function} fn The function to invoke. Receives one argument, `value`.
   * @param {Array} list The list to iterate over.
   * @return {Array} The original list.
   * @see R.addIndex
   * @example
   *
   *      const printXPlusFive = x => console.log(x + 5);
   *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
   *      // logs 6
   *      // logs 7
   *      // logs 8
   * @symb R.forEach(f, [a, b, c]) = [a, b, c]
   */
  var forEach = _curry2(
    _checkForMethod('forEach', function forEach(fn, list) {
      var len = list.length
      var idx = 0
      while (idx < len) {
        fn(list[idx])
        idx += 1
      }
      return list
    })
  )

  /**
   * Iterate over an input `object`, calling a provided function `fn` for each
   * key and value in the object.
   *
   * `fn` receives three argument: *(value, key, obj)*.
   *
   * @func
   * @memberOf R
   * @since v0.23.0
   * @category Object
   * @sig ((a, String, StrMap a) -> Any) -> StrMap a -> StrMap a
   * @param {Function} fn The function to invoke. Receives three argument, `value`, `key`, `obj`.
   * @param {Object} obj The object to iterate over.
   * @return {Object} The original object.
   * @example
   *
   *      const printKeyConcatValue = (value, key) => console.log(key + ':' + value);
   *      R.forEachObjIndexed(printKeyConcatValue, {x: 1, y: 2}); //=> {x: 1, y: 2}
   *      // logs x:1
   *      // logs y:2
   * @symb R.forEachObjIndexed(f, {x: a, y: b}) = {x: a, y: b}
   */
  var forEachObjIndexed = _curry2(function forEachObjIndexed(fn, obj) {
    var keyList = keys(obj)
    var idx = 0
    while (idx < keyList.length) {
      var key = keyList[idx]
      fn(obj[key], key, obj)
      idx += 1
    }
    return obj
  })

  /**
   * Creates a new object from a list key-value pairs. If a key appears in
   * multiple pairs, the rightmost pair is included in the object.
   *
   * @func
   * @memberOf R
   * @since v0.3.0
   * @category List
   * @sig [[k,v]] -> {k: v}
   * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
   * @return {Object} The object made by pairing up `keys` and `values`.
   * @see R.toPairs, R.pair
   * @example
   *
   *      R.fromPairs([['a', 1], ['b', 2], ['c', 3]]); //=> {a: 1, b: 2, c: 3}
   */
  var fromPairs = _curry1(function fromPairs(pairs) {
    var result = {}
    var idx = 0
    while (idx < pairs.length) {
      result[pairs[idx][0]] = pairs[idx][1]
      idx += 1
    }
    return result
  })

  /**
   * Splits a list into sub-lists stored in an object, based on the result of
   * calling a String-returning function on each element, and grouping the
   * results according to values returned.
   *
   * Dispatches to the `groupBy` method of the second argument, if present.
   *
   * Acts as a transducer if a transformer is given in list position.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category List
   * @sig (a -> String) -> [a] -> {String: [a]}
   * @param {Function} fn Function :: a -> String
   * @param {Array} list The array to group
   * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
   *         that produced that key when passed to `fn`.
   * @see R.reduceBy, R.transduce
   * @example
   *
   *      const byGrade = R.groupBy(function(student) {
   *        const score = student.score;
   *        return score < 65 ? 'F' :
   *               score < 70 ? 'D' :
   *               score < 80 ? 'C' :
   *               score < 90 ? 'B' : 'A';
   *      });
   *      const students = [{name: 'Abby', score: 84},
   *                      {name: 'Eddy', score: 58},
   *                      // ...
   *                      {name: 'Jack', score: 69}];
   *      byGrade(students);
   *      // {
   *      //   'A': [{name: 'Dianne', score: 99}],
   *      //   'B': [{name: 'Abby', score: 84}]
   *      //   // ...,
   *      //   'F': [{name: 'Eddy', score: 58}]
   *      // }
   */
  var groupBy = _curry2(
    _checkForMethod(
      'groupBy',
      reduceBy(function (acc, item) {
        if (acc == null) {
          acc = []
        }
        acc.push(item)
        return acc
      }, null)
    )
  )

  /**
   * Takes a list and returns a list of lists where each sublist's elements are
   * all satisfied pairwise comparison according to the provided function.
   * Only adjacent elements are passed to the comparison function.
   *
   * @func
   * @memberOf R
   * @since v0.21.0
   * @category List
   * @sig ((a, a) → Boolean) → [a] → [[a]]
   * @param {Function} fn Function for determining whether two given (adjacent)
   *        elements should be in the same group
   * @param {Array} list The array to group. Also accepts a string, which will be
   *        treated as a list of characters.
   * @return {List} A list that contains sublists of elements,
   *         whose concatenations are equal to the original list.
   * @example
   *
   * R.groupWith(R.equals, [0, 1, 1, 2, 3, 5, 8, 13, 21])
   * //=> [[0], [1, 1], [2], [3], [5], [8], [13], [21]]
   *
   * R.groupWith((a, b) => a + 1 === b, [0, 1, 1, 2, 3, 5, 8, 13, 21])
   * //=> [[0, 1], [1, 2, 3], [5], [8], [13], [21]]
   *
   * R.groupWith((a, b) => a % 2 === b % 2, [0, 1, 1, 2, 3, 5, 8, 13, 21])
   * //=> [[0], [1, 1], [2], [3, 5], [8], [13, 21]]
   *
   * R.groupWith(R.eqBy(isVowel), 'aestiou')
   * //=> ['ae', 'st', 'iou']
   */
  var groupWith = _curry2(function (fn, list) {
    var res = []
    var idx = 0
    var len = list.length
    while (idx < len) {
      var nextidx = idx + 1
      while (nextidx < len && fn(list[nextidx - 1], list[nextidx])) {
        nextidx += 1
      }
      res.push(list.slice(idx, nextidx))
      idx = nextidx
    }
    return res
  })

  /**
   * Returns `true` if the first argument is greater than the second; `false`
   * otherwise.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Relation
   * @sig Ord a => a -> a -> Boolean
   * @param {*} a
   * @param {*} b
   * @return {Boolean}
   * @see R.lt
   * @example
   *
   *      R.gt(2, 1); //=> true
   *      R.gt(2, 2); //=> false
   *      R.gt(2, 3); //=> false
   *      R.gt('a', 'z'); //=> false
   *      R.gt('z', 'a'); //=> true
   */
  var gt = _curry2(function gt(a, b) {
    return a > b
  })

  /**
   * Returns `true` if the first argument is greater than or equal to the second;
   * `false` otherwise.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Relation
   * @sig Ord a => a -> a -> Boolean
   * @param {Number} a
   * @param {Number} b
   * @return {Boolean}
   * @see R.lte
   * @example
   *
   *      R.gte(2, 1); //=> true
   *      R.gte(2, 2); //=> true
   *      R.gte(2, 3); //=> false
   *      R.gte('a', 'z'); //=> false
   *      R.gte('z', 'a'); //=> true
   */
  var gte = _curry2(function gte(a, b) {
    return a >= b
  })

  /**
   * Returns whether or not a path exists in an object. Only the object's
   * own properties are checked.
   *
   * @func
   * @memberOf R
   * @since v0.26.0
   * @category Object
   * @typedefn Idx = String | Int
   * @sig [Idx] -> {a} -> Boolean
   * @param {Array} path The path to use.
   * @param {Object} obj The object to check the path in.
   * @return {Boolean} Whether the path exists.
   * @see R.has
   * @example
   *
   *      R.hasPath(['a', 'b'], {a: {b: 2}});         // => true
   *      R.hasPath(['a', 'b'], {a: {b: undefined}}); // => true
   *      R.hasPath(['a', 'b'], {a: {c: 2}});         // => false
   *      R.hasPath(['a', 'b'], {});                  // => false
   */
  var hasPath = _curry2(function hasPath(_path, obj) {
    if (_path.length === 0 || isNil(obj)) {
      return false
    }
    var val = obj
    var idx = 0
    while (idx < _path.length) {
      if (!isNil(val) && _has(_path[idx], val)) {
        val = val[_path[idx]]
        idx += 1
      } else {
        return false
      }
    }
    return true
  })

  /**
   * Returns whether or not an object has an own property with the specified name
   *
   * @func
   * @memberOf R
   * @since v0.7.0
   * @category Object
   * @sig s -> {s: x} -> Boolean
   * @param {String} prop The name of the property to check for.
   * @param {Object} obj The object to query.
   * @return {Boolean} Whether the property exists.
   * @example
   *
   *      const hasName = R.has('name');
   *      hasName({name: 'alice'});   //=> true
   *      hasName({name: 'bob'});     //=> true
   *      hasName({});                //=> false
   *
   *      const point = {x: 0, y: 0};
   *      const pointHas = R.has(R.__, point);
   *      pointHas('x');  //=> true
   *      pointHas('y');  //=> true
   *      pointHas('z');  //=> false
   */
  var has = _curry2(function has(prop, obj) {
    return hasPath([prop], obj)
  })

  /**
   * Returns whether or not an object or its prototype chain has a property with
   * the specified name
   *
   * @func
   * @memberOf R
   * @since v0.7.0
   * @category Object
   * @sig s -> {s: x} -> Boolean
   * @param {String} prop The name of the property to check for.
   * @param {Object} obj The object to query.
   * @return {Boolean} Whether the property exists.
   * @example
   *
   *      function Rectangle(width, height) {
   *        this.width = width;
   *        this.height = height;
   *      }
   *      Rectangle.prototype.area = function() {
   *        return this.width * this.height;
   *      };
   *
   *      const square = new Rectangle(2, 2);
   *      R.hasIn('width', square);  //=> true
   *      R.hasIn('area', square);  //=> true
   */
  var hasIn = _curry2(function hasIn(prop, obj) {
    return prop in obj
  })

  /**
   * Returns true if its arguments are identical, false otherwise. Values are
   * identical if they reference the same memory. `NaN` is identical to `NaN`;
   * `0` and `-0` are not identical.
   *
   * Note this is merely a curried version of ES6 `Object.is`.
   *
   * @func
   * @memberOf R
   * @since v0.15.0
   * @category Relation
   * @sig a -> a -> Boolean
   * @param {*} a
   * @param {*} b
   * @return {Boolean}
   * @example
   *
   *      const o = {};
   *      R.identical(o, o); //=> true
   *      R.identical(1, 1); //=> true
   *      R.identical(1, '1'); //=> false
   *      R.identical([], []); //=> false
   *      R.identical(0, -0); //=> false
   *      R.identical(NaN, NaN); //=> true
   */
  var identical = _curry2(_objectIs$1)

  /**
   * Creates a function that will process either the `onTrue` or the `onFalse`
   * function depending upon the result of the `condition` predicate.
   *
   * @func
   * @memberOf R
   * @since v0.8.0
   * @category Logic
   * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
   * @param {Function} condition A predicate function
   * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
   * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
   * @return {Function} A new function that will process either the `onTrue` or the `onFalse`
   *                    function depending upon the result of the `condition` predicate.
   * @see R.unless, R.when, R.cond
   * @example
   *
   *      const incCount = R.ifElse(
   *        R.has('count'),
   *        R.over(R.lensProp('count'), R.inc),
   *        R.assoc('count', 1)
   *      );
   *      incCount({});           //=> { count: 1 }
   *      incCount({ count: 1 }); //=> { count: 2 }
   */
  var ifElse = _curry3(function ifElse(condition, onTrue, onFalse) {
    return curryN(
      Math.max(condition.length, onTrue.length, onFalse.length),
      function _ifElse() {
        return condition.apply(this, arguments)
          ? onTrue.apply(this, arguments)
          : onFalse.apply(this, arguments)
      }
    )
  })

  /**
   * Increments its argument.
   *
   * @func
   * @memberOf R
   * @since v0.9.0
   * @category Math
   * @sig Number -> Number
   * @param {Number} n
   * @return {Number} n + 1
   * @see R.dec
   * @example
   *
   *      R.inc(42); //=> 43
   */
  var inc = add(1)

  /**
   * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
   * terms, to at least one element of the given list; `false` otherwise.
   * Works also with strings.
   *
   * @func
   * @memberOf R
   * @since v0.26.0
   * @category List
   * @sig a -> [a] -> Boolean
   * @param {Object} a The item to compare against.
   * @param {Array} list The array to consider.
   * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.
   * @see R.any
   * @example
   *
   *      R.includes(3, [1, 2, 3]); //=> true
   *      R.includes(4, [1, 2, 3]); //=> false
   *      R.includes({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
   *      R.includes([42], [[42]]); //=> true
   *      R.includes('ba', 'banana'); //=>true
   */
  var includes = _curry2(_includes)

  /**
   * Given a function that generates a key, turns a list of objects into an
   * object indexing the objects by the given key. Note that if multiple
   * objects generate the same value for the indexing key only the last value
   * will be included in the generated object.
   *
   * Acts as a transducer if a transformer is given in list position.
   *
   * @func
   * @memberOf R
   * @since v0.19.0
   * @category List
   * @sig (a -> String) -> [{k: v}] -> {k: {k: v}}
   * @param {Function} fn Function :: a -> String
   * @param {Array} array The array of objects to index
   * @return {Object} An object indexing each array element by the given property.
   * @example
   *
   *      const list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
   *      R.indexBy(R.prop('id'), list);
   *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
   */
  var indexBy = reduceBy(function (acc, elem) {
    return elem
  }, null)

  /**
   * Returns the position of the first occurrence of an item in an array, or -1
   * if the item is not included in the array. [`R.equals`](#equals) is used to
   * determine equality.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category List
   * @sig a -> [a] -> Number
   * @param {*} target The item to find.
   * @param {Array} xs The array to search in.
   * @return {Number} the index of the target, or -1 if the target is not found.
   * @see R.lastIndexOf
   * @example
   *
   *      R.indexOf(3, [1,2,3,4]); //=> 2
   *      R.indexOf(10, [1,2,3,4]); //=> -1
   */
  var indexOf = _curry2(function indexOf(target, xs) {
    return typeof xs.indexOf === 'function' && !_isArray(xs)
      ? xs.indexOf(target)
      : _indexOf(xs, target, 0)
  })

  /**
   * Returns all but the last element of the given list or string.
   *
   * @func
   * @memberOf R
   * @since v0.9.0
   * @category List
   * @sig [a] -> [a]
   * @sig String -> String
   * @param {*} list
   * @return {*}
   * @see R.last, R.head, R.tail
   * @example
   *
   *      R.init([1, 2, 3]);  //=> [1, 2]
   *      R.init([1, 2]);     //=> [1]
   *      R.init([1]);        //=> []
   *      R.init([]);         //=> []
   *
   *      R.init('abc');  //=> 'ab'
   *      R.init('ab');   //=> 'a'
   *      R.init('a');    //=> ''
   *      R.init('');     //=> ''
   */
  var init = slice(0, -1)

  /**
   * Takes a predicate `pred`, a list `xs`, and a list `ys`, and returns a list
   * `xs'` comprising each of the elements of `xs` which is equal to one or more
   * elements of `ys` according to `pred`.
   *
   * `pred` must be a binary function expecting an element from each list.
   *
   * `xs`, `ys`, and `xs'` are treated as sets, semantically, so ordering should
   * not be significant, but since `xs'` is ordered the implementation guarantees
   * that its values are in the same order as they appear in `xs`. Duplicates are
   * not removed, so `xs'` may contain duplicates if `xs` contains duplicates.
   *
   * @func
   * @memberOf R
   * @since v0.24.0
   * @category Relation
   * @sig ((a, b) -> Boolean) -> [a] -> [b] -> [a]
   * @param {Function} pred
   * @param {Array} xs
   * @param {Array} ys
   * @return {Array}
   * @see R.intersection
   * @example
   *
   *      R.innerJoin(
   *        (record, id) => record.id === id,
   *        [{id: 824, name: 'Richie Furay'},
   *         {id: 956, name: 'Dewey Martin'},
   *         {id: 313, name: 'Bruce Palmer'},
   *         {id: 456, name: 'Stephen Stills'},
   *         {id: 177, name: 'Neil Young'}],
   *        [177, 456, 999]
   *      );
   *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
   */
  var innerJoin = _curry3(function innerJoin(pred, xs, ys) {
    return _filter(function (x) {
      return _includesWith(pred, x, ys)
    }, xs)
  })

  /**
   * Inserts the supplied element into the list, at the specified `index`. _Note that

   * this is not destructive_: it returns a copy of the list with the changes.
   * <small>No lists have been harmed in the application of this function.</small>
   *
   * @func
   * @memberOf R
   * @since v0.2.2
   * @category List
   * @sig Number -> a -> [a] -> [a]
   * @param {Number} index The position to insert the element
   * @param {*} elt The element to insert into the Array
   * @param {Array} list The list to insert into
   * @return {Array} A new Array with `elt` inserted at `index`.
   * @example
   *
   *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
   */
  var insert = _curry3(function insert(idx, elt, list) {
    idx = idx < list.length && idx >= 0 ? idx : list.length
    var result = Array.prototype.slice.call(list, 0)
    result.splice(idx, 0, elt)
    return result
  })

  /**
   * Inserts the sub-list into the list, at the specified `index`. _Note that this is not
   * destructive_: it returns a copy of the list with the changes.
   * <small>No lists have been harmed in the application of this function.</small>
   *
   * @func
   * @memberOf R
   * @since v0.9.0
   * @category List
   * @sig Number -> [a] -> [a] -> [a]
   * @param {Number} index The position to insert the sub-list
   * @param {Array} elts The sub-list to insert into the Array
   * @param {Array} list The list to insert the sub-list into
   * @return {Array} A new Array with `elts` inserted starting at `index`.
   * @example
   *
   *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
   */
  var insertAll = _curry3(function insertAll(idx, elts, list) {
    idx = idx < list.length && idx >= 0 ? idx : list.length
    return [].concat(
      Array.prototype.slice.call(list, 0, idx),
      elts,
      Array.prototype.slice.call(list, idx)
    )
  })

  /**
   * Returns a new list containing only one copy of each element in the original
   * list, based upon the value returned by applying the supplied function to
   * each list element. Prefers the first item if the supplied function produces
   * the same value on two items. [`R.equals`](#equals) is used for comparison.
   *
   * @func
   * @memberOf R
   * @since v0.16.0
   * @category List
   * @sig (a -> b) -> [a] -> [a]
   * @param {Function} fn A function used to produce a value to use during comparisons.
   * @param {Array} list The array to consider.
   * @return {Array} The list of unique items.
   * @example
   *
   *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
   */
  var uniqBy = _curry2(function uniqBy(fn, list) {
    var set = new _Set()
    var result = []
    var idx = 0
    var appliedItem, item

    while (idx < list.length) {
      item = list[idx]
      appliedItem = fn(item)
      if (set.add(appliedItem)) {
        result.push(item)
      }
      idx += 1
    }
    return result
  })

  /**
   * Returns a new list containing only one copy of each element in the original
   * list. [`R.equals`](#equals) is used to determine equality.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category List
   * @sig [a] -> [a]
   * @param {Array} list The array to consider.
   * @return {Array} The list of unique items.
   * @example
   *
   *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
   *      R.uniq([1, '1']);     //=> [1, '1']
   *      R.uniq([[42], [42]]); //=> [[42]]
   */
  var uniq = uniqBy(identity)

  /**
   * Combines two lists into a set (i.e. no duplicates) composed of those
   * elements common to both lists.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Relation
   * @sig [*] -> [*] -> [*]
   * @param {Array} list1 The first list.
   * @param {Array} list2 The second list.
   * @return {Array} The list of elements found in both `list1` and `list2`.
   * @see R.innerJoin
   * @example
   *
   *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
   */
  var intersection = _curry2(function intersection(list1, list2) {
    var lookupList, filteredList
    if (list1.length > list2.length) {
      lookupList = list1
      filteredList = list2
    } else {
      lookupList = list2
      filteredList = list1
    }
    return uniq(_filter(flip(_includes)(lookupList), filteredList))
  })

  /**
   * Creates a new list with the separator interposed between elements.
   *
   * Dispatches to the `intersperse` method of the second argument, if present.
   *
   * @func
   * @memberOf R
   * @since v0.14.0
   * @category List
   * @sig a -> [a] -> [a]
   * @param {*} separator The element to add to the list.
   * @param {Array} list The list to be interposed.
   * @return {Array} The new list.
   * @example
   *
   *      R.intersperse('a', ['b', 'n', 'n', 's']); //=> ['b', 'a', 'n', 'a', 'n', 'a', 's']
   */
  var intersperse = _curry2(
    _checkForMethod('intersperse', function intersperse(separator, list) {
      var out = []
      var idx = 0
      var length = list.length
      while (idx < length) {
        if (idx === length - 1) {
          out.push(list[idx])
        } else {
          out.push(list[idx], separator)
        }
        idx += 1
      }
      return out
    })
  )

  // Based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  function _objectAssign(target) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object')
    }

    var output = Object(target)
    var idx = 1
    var length = arguments.length
    while (idx < length) {
      var source = arguments[idx]
      if (source != null) {
        for (var nextKey in source) {
          if (_has(nextKey, source)) {
            output[nextKey] = source[nextKey]
          }
        }
      }
      idx += 1
    }
    return output
  }

  var _objectAssign$1 =
    typeof Object.assign === 'function' ? Object.assign : _objectAssign

  /**
   * Creates an object containing a single key:value pair.
   *
   * @func
   * @memberOf R
   * @since v0.18.0
   * @category Object
   * @sig String -> a -> {String:a}
   * @param {String} key
   * @param {*} val
   * @return {Object}
   * @see R.pair
   * @example
   *
   *      const matchPhrases = R.compose(
   *        R.objOf('must'),
   *        R.map(R.objOf('match_phrase'))
   *      );
   *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
   */
  var objOf = _curry2(function objOf(key, val) {
    var obj = {}
    obj[key] = val
    return obj
  })

  var _stepCatArray = {
    '@@transducer/init': Array,
    '@@transducer/step': function (xs, x) {
      xs.push(x)
      return xs
    },
    '@@transducer/result': _identity
  }
  var _stepCatString = {
    '@@transducer/init': String,
    '@@transducer/step': function (a, b) {
      return a + b
    },
    '@@transducer/result': _identity
  }
  var _stepCatObject = {
    '@@transducer/init': Object,
    '@@transducer/step': function (result, input) {
      return _objectAssign$1(
        result,
        _isArrayLike(input) ? objOf(input[0], input[1]) : input
      )
    },
    '@@transducer/result': _identity
  }

  function _stepCat(obj) {
    if (_isTransformer(obj)) {
      return obj
    }
    if (_isArrayLike(obj)) {
      return _stepCatArray
    }
    if (typeof obj === 'string') {
      return _stepCatString
    }
    if (typeof obj === 'object') {
      return _stepCatObject
    }
    throw new Error('Cannot create transformer for ' + obj)
  }

  /**
   * Transforms the items of the list with the transducer and appends the
   * transformed items to the accumulator using an appropriate iterator function
   * based on the accumulator type.
   *
   * The accumulator can be an array, string, object or a transformer. Iterated
   * items will be appended to arrays and concatenated to strings. Objects will
   * be merged directly or 2-item arrays will be merged as key, value pairs.
   *
   * The accumulator can also be a transformer object that provides a 2-arity
   * reducing iterator function, step, 0-arity initial value function, init, and
   * 1-arity result extraction function result. The step function is used as the
   * iterator function in reduce. The result function is used to convert the
   * final accumulator into the return type and in most cases is R.identity. The
   * init function is used to provide the initial accumulator.
   *
   * The iteration is performed with [`R.reduce`](#reduce) after initializing the
   * transducer.
   *
   * @func
   * @memberOf R
   * @since v0.12.0
   * @category List
   * @sig a -> (b -> b) -> [c] -> a
   * @param {*} acc The initial accumulator value.
   * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
   * @param {Array} list The list to iterate over.
   * @return {*} The final, accumulated value.
   * @see R.transduce
   * @example
   *
   *      const numbers = [1, 2, 3, 4];
   *      const transducer = R.compose(R.map(R.add(1)), R.take(2));
   *
   *      R.into([], transducer, numbers); //=> [2, 3]
   *
   *      const intoArray = R.into([]);
   *      intoArray(transducer, numbers); //=> [2, 3]
   */
  var into = _curry3(function into(acc, xf, list) {
    return _isTransformer(acc)
      ? _reduce(xf(acc), acc['@@transducer/init'](), list)
      : _reduce(xf(_stepCat(acc)), _clone(acc, [], [], false), list)
  })

  /**
   * Same as [`R.invertObj`](#invertObj), however this accounts for objects with
   * duplicate values by putting the values into an array.
   *
   * @func
   * @memberOf R
   * @since v0.9.0
   * @category Object
   * @sig {s: x} -> {x: [ s, ... ]}
   * @param {Object} obj The object or array to invert
   * @return {Object} out A new object with keys in an array.
   * @see R.invertObj
   * @example
   *
   *      const raceResultsByFirstName = {
   *        first: 'alice',
   *        second: 'jake',
   *        third: 'alice',
   *      };
   *      R.invert(raceResultsByFirstName);
   *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
   */
  var invert = _curry1(function invert(obj) {
    var props = keys(obj)
    var len = props.length
    var idx = 0
    var out = {}

    while (idx < len) {
      var key = props[idx]
      var val = obj[key]
      var list = _has(val, out) ? out[val] : (out[val] = [])
      list[list.length] = key
      idx += 1
    }
    return out
  })

  /**
   * Returns a new object with the keys of the given object as values, and the
   * values of the given object, which are coerced to strings, as keys. Note
   * that the last key found is preferred when handling the same value.
   *
   * @func
   * @memberOf R
   * @since v0.9.0
   * @category Object
   * @sig {s: x} -> {x: s}
   * @param {Object} obj The object or array to invert
   * @return {Object} out A new object
   * @see R.invert
   * @example
   *
   *      const raceResults = {
   *        first: 'alice',
   *        second: 'jake'
   *      };
   *      R.invertObj(raceResults);
   *      //=> { 'alice': 'first', 'jake':'second' }
   *
   *      // Alternatively:
   *      const raceResults = ['alice', 'jake'];
   *      R.invertObj(raceResults);
   *      //=> { 'alice': '0', 'jake':'1' }
   */
  var invertObj = _curry1(function invertObj(obj) {
    var props = keys(obj)
    var len = props.length
    var idx = 0
    var out = {}

    while (idx < len) {
      var key = props[idx]
      out[obj[key]] = key
      idx += 1
    }
    return out
  })

  /**
   * Turns a named method with a specified arity into a function that can be
   * called directly supplied with arguments and a target object.
   *
   * The returned function is curried and accepts `arity + 1` parameters where
   * the final parameter is the target object.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Function
   * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
   * @param {Number} arity Number of arguments the returned function should take
   *        before the target object.
   * @param {String} method Name of any of the target object's methods to call.
   * @return {Function} A new curried function.
   * @see R.construct
   * @example
   *
   *      const sliceFrom = R.invoker(1, 'slice');
   *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
   *      const sliceFrom6 = R.invoker(2, 'slice')(6);
   *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
   *
   *      const dog = {
   *        speak: async () => 'Woof!'
   *      };
   *      const speak = R.invoker(0, 'speak');
   *      speak(dog).then(console.log) //~> 'Woof!'
   *
   * @symb R.invoker(0, 'method')(o) = o['method']()
   * @symb R.invoker(1, 'method')(a, o) = o['method'](a)
   * @symb R.invoker(2, 'method')(a, b, o) = o['method'](a, b)
   */
  var invoker = _curry2(function invoker(arity, method) {
    return curryN(arity + 1, function () {
      var target = arguments[arity]
      if (target != null && _isFunction(target[method])) {
        return target[method].apply(
          target,
          Array.prototype.slice.call(arguments, 0, arity)
        )
      }
      throw new TypeError(
        toString$1(target) + ' does not have a method named "' + method + '"'
      )
    })
  })

  /**
   * See if an object (`val`) is an instance of the supplied constructor. This
   * function will check up the inheritance chain, if any.
   *
   * @func
   * @memberOf R
   * @since v0.3.0
   * @category Type
   * @sig (* -> {*}) -> a -> Boolean
   * @param {Object} ctor A constructor
   * @param {*} val The value to test
   * @return {Boolean}
   * @example
   *
   *      R.is(Object, {}); //=> true
   *      R.is(Number, 1); //=> true
   *      R.is(Object, 1); //=> false
   *      R.is(String, 's'); //=> true
   *      R.is(String, new String('')); //=> true
   *      R.is(Object, new String('')); //=> true
   *      R.is(Object, 's'); //=> false
   *      R.is(Number, {}); //=> false
   */
  var is = _curry2(function is(Ctor, val) {
    return (val != null && val.constructor === Ctor) || val instanceof Ctor
  })

  /**
   * Returns `true` if the given value is its type's empty value; `false`
   * otherwise.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Logic
   * @sig a -> Boolean
   * @param {*} x
   * @return {Boolean}
   * @see R.empty
   * @example
   *
   *      R.isEmpty([1, 2, 3]);   //=> false
   *      R.isEmpty([]);          //=> true
   *      R.isEmpty('');          //=> true
   *      R.isEmpty(null);        //=> false
   *      R.isEmpty({});          //=> true
   *      R.isEmpty({length: 0}); //=> false
   */
  var isEmpty = _curry1(function isEmpty(x) {
    return x != null && equals(x, empty(x))
  })

  /**
   * Returns a string made by inserting the `separator` between each element and
   * concatenating all the elements into a single string.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category List
   * @sig String -> [a] -> String
   * @param {Number|String} separator The string used to separate the elements.
   * @param {Array} xs The elements to join into a string.
   * @return {String} str The string made by concatenating `xs` with `separator`.
   * @see R.split
   * @example
   *
   *      const spacer = R.join(' ');
   *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
   *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
   */
  var join = invoker(1, 'join')

  /**
   * juxt applies a list of functions to a list of values.
   *
   * @func
   * @memberOf R
   * @since v0.19.0
   * @category Function
   * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
   * @param {Array} fns An array of functions
   * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
   * @see R.applySpec
   * @example
   *
   *      const getRange = R.juxt([Math.min, Math.max]);
   *      getRange(3, 4, 9, -3); //=> [-3, 9]
   * @symb R.juxt([f, g, h])(a, b) = [f(a, b), g(a, b), h(a, b)]
   */
  var juxt = _curry1(function juxt(fns) {
    return converge(function () {
      return Array.prototype.slice.call(arguments, 0)
    }, fns)
  })

  /**
   * Returns a list containing the names of all the properties of the supplied
   * object, including prototype properties.
   * Note that the order of the output array is not guaranteed to be consistent
   * across different JS platforms.
   *
   * @func
   * @memberOf R
   * @since v0.2.0
   * @category Object
   * @sig {k: v} -> [k]
   * @param {Object} obj The object to extract properties from
   * @return {Array} An array of the object's own and prototype properties.
   * @see R.keys, R.valuesIn
   * @example
   *
   *      const F = function() { this.x = 'X'; };
   *      F.prototype.y = 'Y';
   *      const f = new F();
   *      R.keysIn(f); //=> ['x', 'y']
   */
  var keysIn = _curry1(function keysIn(obj) {
    var prop
    var ks = []
    for (prop in obj) {
      ks[ks.length] = prop
    }
    return ks
  })

  /**
   * Returns the position of the last occurrence of an item in an array, or -1 if
   * the item is not included in the array. [`R.equals`](#equals) is used to
   * determine equality.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category List
   * @sig a -> [a] -> Number
   * @param {*} target The item to find.
   * @param {Array} xs The array to search in.
   * @return {Number} the index of the target, or -1 if the target is not found.
   * @see R.indexOf
   * @example
   *
   *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
   *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
   */
  var lastIndexOf = _curry2(function lastIndexOf(target, xs) {
    if (typeof xs.lastIndexOf === 'function' && !_isArray(xs)) {
      return xs.lastIndexOf(target)
    } else {
      var idx = xs.length - 1
      while (idx >= 0) {
        if (equals(xs[idx], target)) {
          return idx
        }
        idx -= 1
      }
      return -1
    }
  })

  function _isNumber(x) {
    return Object.prototype.toString.call(x) === '[object Number]'
  }

  /**
   * Returns the number of elements in the array by returning `list.length`.
   *
   * @func
   * @memberOf R
   * @since v0.3.0
   * @category List
   * @sig [a] -> Number
   * @param {Array} list The array to inspect.
   * @return {Number} The length of the array.
   * @example
   *
   *      R.length([]); //=> 0
   *      R.length([1, 2, 3]); //=> 3
   */
  var length = _curry1(function length(list) {
    return list != null && _isNumber(list.length) ? list.length : NaN
  })

  /**
   * Returns a lens for the given getter and setter functions. The getter "gets"
   * the value of the focus; the setter "sets" the value of the focus. The setter
   * should not mutate the data structure.
   *
   * @func
   * @memberOf R
   * @since v0.8.0
   * @category Object
   * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
   * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
   * @param {Function} getter
   * @param {Function} setter
   * @return {Lens}
   * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
   * @example
   *
   *      const xLens = R.lens(R.prop('x'), R.assoc('x'));
   *
   *      R.view(xLens, {x: 1, y: 2});            //=> 1
   *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
   *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
   */
  var lens = _curry2(function lens(getter, setter) {
    return function (toFunctorFn) {
      return function (target) {
        return map(function (focus) {
          return setter(focus, target)
        }, toFunctorFn(getter(target)))
      }
    }
  })

  /**
   * Returns a lens whose focus is the specified index.
   *
   * @func
   * @memberOf R
   * @since v0.14.0
   * @category Object
   * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
   * @sig Number -> Lens s a
   * @param {Number} n
   * @return {Lens}
   * @see R.view, R.set, R.over, R.nth
   * @example
   *
   *      const headLens = R.lensIndex(0);
   *
   *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
   *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
   *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
   */
  var lensIndex = _curry1(function lensIndex(n) {
    return lens(nth(n), update(n))
  })

  /**
   * Returns a lens whose focus is the specified path.
   *
   * @func
   * @memberOf R
   * @since v0.19.0
   * @category Object
   * @typedefn Idx = String | Int
   * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
   * @sig [Idx] -> Lens s a
   * @param {Array} path The path to use.
   * @return {Lens}
   * @see R.view, R.set, R.over
   * @example
   *
   *      const xHeadYLens = R.lensPath(['x', 0, 'y']);
   *
   *      R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
   *      //=> 2
   *      R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
   *      //=> {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
   *      R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});
   *      //=> {x: [{y: -2, z: 3}, {y: 4, z: 5}]}
   */
  var lensPath = _curry1(function lensPath(p) {
    return lens(path(p), assocPath(p))
  })

  /**
   * Returns a lens whose focus is the specified property.
   *
   * @func
   * @memberOf R
   * @since v0.14.0
   * @category Object
   * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
   * @sig String -> Lens s a
   * @param {String} k
   * @return {Lens}
   * @see R.view, R.set, R.over
   * @example
   *
   *      const xLens = R.lensProp('x');
   *
   *      R.view(xLens, {x: 1, y: 2});            //=> 1
   *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
   *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
   */
  var lensProp = _curry1(function lensProp(k) {
    return lens(prop(k), assoc(k))
  })

  /**
   * Returns `true` if the first argument is less than the second; `false`
   * otherwise.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Relation
   * @sig Ord a => a -> a -> Boolean
   * @param {*} a
   * @param {*} b
   * @return {Boolean}
   * @see R.gt
   * @example
   *
   *      R.lt(2, 1); //=> false
   *      R.lt(2, 2); //=> false
   *      R.lt(2, 3); //=> true
   *      R.lt('a', 'z'); //=> true
   *      R.lt('z', 'a'); //=> false
   */
  var lt = _curry2(function lt(a, b) {
    return a < b
  })

  /**
   * Returns `true` if the first argument is less than or equal to the second;
   * `false` otherwise.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Relation
   * @sig Ord a => a -> a -> Boolean
   * @param {Number} a
   * @param {Number} b
   * @return {Boolean}
   * @see R.gte
   * @example
   *
   *      R.lte(2, 1); //=> false
   *      R.lte(2, 2); //=> true
   *      R.lte(2, 3); //=> true
   *      R.lte('a', 'z'); //=> true
   *      R.lte('z', 'a'); //=> false
   */
  var lte = _curry2(function lte(a, b) {
    return a <= b
  })

  /**
   * The `mapAccum` function behaves like a combination of map and reduce; it
   * applies a function to each element of a list, passing an accumulating
   * parameter from left to right, and returning a final value of this
   * accumulator together with the new list.
   *
   * The iterator function receives two arguments, *acc* and *value*, and should
   * return a tuple *[acc, value]*.
   *
   * @func
   * @memberOf R
   * @since v0.10.0
   * @category List
   * @sig ((acc, x) -> (acc, y)) -> acc -> [x] -> (acc, [y])
   * @param {Function} fn The function to be called on every element of the input `list`.
   * @param {*} acc The accumulator value.
   * @param {Array} list The list to iterate over.
   * @return {*} The final, accumulated value.
   * @see R.scan, R.addIndex, R.mapAccumRight
   * @example
   *
   *      const digits = ['1', '2', '3', '4'];
   *      const appender = (a, b) => [a + b, a + b];
   *
   *      R.mapAccum(appender, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
   * @symb R.mapAccum(f, a, [b, c, d]) = [
   *   f(f(f(a, b)[0], c)[0], d)[0],
   *   [
   *     f(a, b)[1],
   *     f(f(a, b)[0], c)[1],
   *     f(f(f(a, b)[0], c)[0], d)[1]
   *   ]
   * ]
   */
  var mapAccum = _curry3(function mapAccum(fn, acc, list) {
    var idx = 0
    var len = list.length
    var result = []
    var tuple = [acc]
    while (idx < len) {
      tuple = fn(tuple[0], list[idx])
      result[idx] = tuple[1]
      idx += 1
    }
    return [tuple[0], result]
  })

  /**
   * The `mapAccumRight` function behaves like a combination of map and reduce; it
   * applies a function to each element of a list, passing an accumulating
   * parameter from right to left, and returning a final value of this
   * accumulator together with the new list.
   *
   * Similar to [`mapAccum`](#mapAccum), except moves through the input list from
   * the right to the left.
   *
   * The iterator function receives two arguments, *acc* and *value*, and should
   * return a tuple *[acc, value]*.
   *
   * @func
   * @memberOf R
   * @since v0.10.0
   * @category List
   * @sig ((acc, x) -> (acc, y)) -> acc -> [x] -> (acc, [y])
   * @param {Function} fn The function to be called on every element of the input `list`.
   * @param {*} acc The accumulator value.
   * @param {Array} list The list to iterate over.
   * @return {*} The final, accumulated value.
   * @see R.addIndex, R.mapAccum
   * @example
   *
   *      const digits = ['1', '2', '3', '4'];
   *      const appender = (a, b) => [b + a, b + a];
   *
   *      R.mapAccumRight(appender, 5, digits); //=> ['12345', ['12345', '2345', '345', '45']]
   * @symb R.mapAccumRight(f, a, [b, c, d]) = [
   *   f(f(f(a, d)[0], c)[0], b)[0],
   *   [
   *     f(a, d)[1],
   *     f(f(a, d)[0], c)[1],
   *     f(f(f(a, d)[0], c)[0], b)[1]
   *   ]
   * ]
   */
  var mapAccumRight = _curry3(function mapAccumRight(fn, acc, list) {
    var idx = list.length - 1
    var result = []
    var tuple = [acc]
    while (idx >= 0) {
      tuple = fn(tuple[0], list[idx])
      result[idx] = tuple[1]
      idx -= 1
    }
    return [tuple[0], result]
  })

  /**
   * An Object-specific version of [`map`](#map). The function is applied to three
   * arguments: *(value, key, obj)*. If only the value is significant, use
   * [`map`](#map) instead.
   *
   * @func
   * @memberOf R
   * @since v0.9.0
   * @category Object
   * @sig ((*, String, Object) -> *) -> Object -> Object
   * @param {Function} fn
   * @param {Object} obj
   * @return {Object}
   * @see R.map
   * @example
   *
   *      const xyz = { x: 1, y: 2, z: 3 };
   *      const prependKeyAndDouble = (num, key, obj) => key + (num * 2);
   *
   *      R.mapObjIndexed(prependKeyAndDouble, xyz); //=> { x: 'x2', y: 'y4', z: 'z6' }
   */
  var mapObjIndexed = _curry2(function mapObjIndexed(fn, obj) {
    return _reduce(
      function (acc, key) {
        acc[key] = fn(obj[key], key, obj)
        return acc
      },
      {},
      keys(obj)
    )
  })

  /**
   * Tests a regular expression against a String. Note that this function will
   * return an empty array when there are no matches. This differs from
   * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
   * which returns `null` when there are no matches.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category String
   * @sig RegExp -> String -> [String | Undefined]
   * @param {RegExp} rx A regular expression.
   * @param {String} str The string to match against
   * @return {Array} The list of matches or empty array.
   * @see R.test
   * @example
   *
   *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
   *      R.match(/a/, 'b'); //=> []
   *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
   */
  var match = _curry2(function match(rx, str) {
    return str.match(rx) || []
  })

  /**
   * `mathMod` behaves like the modulo operator should mathematically, unlike the
   * `%` operator (and by extension, [`R.modulo`](#modulo)). So while
   * `-17 % 5` is `-2`, `mathMod(-17, 5)` is `3`. `mathMod` requires Integer
   * arguments, and returns NaN when the modulus is zero or negative.
   *
   * @func
   * @memberOf R
   * @since v0.3.0
   * @category Math
   * @sig Number -> Number -> Number
   * @param {Number} m The dividend.
   * @param {Number} p the modulus.
   * @return {Number} The result of `b mod a`.
   * @see R.modulo
   * @example
   *
   *      R.mathMod(-17, 5);  //=> 3
   *      R.mathMod(17, 5);   //=> 2
   *      R.mathMod(17, -5);  //=> NaN
   *      R.mathMod(17, 0);   //=> NaN
   *      R.mathMod(17.2, 5); //=> NaN
   *      R.mathMod(17, 5.3); //=> NaN
   *
   *      const clock = R.mathMod(R.__, 12);
   *      clock(15); //=> 3
   *      clock(24); //=> 0
   *
   *      const seventeenMod = R.mathMod(17);
   *      seventeenMod(3);  //=> 2
   *      seventeenMod(4);  //=> 1
   *      seventeenMod(10); //=> 7
   */
  var mathMod = _curry2(function mathMod(m, p) {
    if (!_isInteger(m)) {
      return NaN
    }
    if (!_isInteger(p) || p < 1) {
      return NaN
    }
    return ((m % p) + p) % p
  })

  /**
   * Takes a function and two values, and returns whichever value produces the
   * larger result when passed to the provided function.
   *
   * @func
   * @memberOf R
   * @since v0.8.0
   * @category Relation
   * @sig Ord b => (a -> b) -> a -> a -> a
   * @param {Function} f
   * @param {*} a
   * @param {*} b
   * @return {*}
   * @see R.max, R.minBy
   * @example
   *
   *      //  square :: Number -> Number
   *      const square = n => n * n;
   *
   *      R.maxBy(square, -3, 2); //=> -3
   *
   *      R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5
   *      R.reduce(R.maxBy(square), 0, []); //=> 0
   */
  var maxBy = _curry3(function maxBy(f, a, b) {
    return f(b) > f(a) ? b : a
  })

  /**
   * Adds together all the elements of a list.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Math
   * @sig [Number] -> Number
   * @param {Array} list An array of numbers
   * @return {Number} The sum of all the numbers in the list.
   * @see R.reduce
   * @example
   *
   *      R.sum([2,4,6,8,100,1]); //=> 121
   */
  var sum = reduce(add, 0)

  /**
   * Returns the mean of the given list of numbers.
   *
   * @func
   * @memberOf R
   * @since v0.14.0
   * @category Math
   * @sig [Number] -> Number
   * @param {Array} list
   * @return {Number}
   * @see R.median
   * @example
   *
   *      R.mean([2, 7, 9]); //=> 6
   *      R.mean([]); //=> NaN
   */
  var mean = _curry1(function mean(list) {
    return sum(list) / list.length
  })

  /**
   * Returns the median of the given list of numbers.
   *
   * @func
   * @memberOf R
   * @since v0.14.0
   * @category Math
   * @sig [Number] -> Number
   * @param {Array} list
   * @return {Number}
   * @see R.mean
   * @example
   *
   *      R.median([2, 9, 7]); //=> 7
   *      R.median([7, 2, 10, 9]); //=> 8
   *      R.median([]); //=> NaN
   */
  var median = _curry1(function median(list) {
    var len = list.length
    if (len === 0) {
      return NaN
    }
    var width = 2 - (len % 2)
    var idx = (len - width) / 2
    return mean(
      Array.prototype.slice
        .call(list, 0)
        .sort(function (a, b) {
          return a < b ? -1 : a > b ? 1 : 0
        })
        .slice(idx, idx + width)
    )
  })

  /**
   * Creates a new function that, when invoked, caches the result of calling `fn`
   * for a given argument set and returns the result. Subsequent calls to the
   * memoized `fn` with the same argument set will not result in an additional
   * call to `fn`; instead, the cached result for that set of arguments will be
   * returned.
   *
   *
   * @func
   * @memberOf R
   * @since v0.24.0
   * @category Function
   * @sig (*... -> String) -> (*... -> a) -> (*... -> a)
   * @param {Function} fn The function to generate the cache key.
   * @param {Function} fn The function to memoize.
   * @return {Function} Memoized version of `fn`.
   * @example
   *
   *      let count = 0;
   *      const factorial = R.memoizeWith(R.identity, n => {
   *        count += 1;
   *        return R.product(R.range(1, n + 1));
   *      });
   *      factorial(5); //=> 120
   *      factorial(5); //=> 120
   *      factorial(5); //=> 120
   *      count; //=> 1
   */
  var memoizeWith = _curry2(function memoizeWith(mFn, fn) {
    var cache = {}
    return _arity(fn.length, function () {
      var key = mFn.apply(this, arguments)
      if (!_has(key, cache)) {
        cache[key] = fn.apply(this, arguments)
      }
      return cache[key]
    })
  })

  /**
   * Create a new object with the own properties of the first object merged with
   * the own properties of the second object. If a key exists in both objects,
   * the value from the second object will be used.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Object
   * @sig {k: v} -> {k: v} -> {k: v}
   * @param {Object} l
   * @param {Object} r
   * @return {Object}
   * @see R.mergeRight, R.mergeDeepRight, R.mergeWith, R.mergeWithKey
   * @deprecated since v0.26.0
   * @example
   *
   *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
   *      //=> { 'name': 'fred', 'age': 40 }
   *
   *      const withDefaults = R.merge({x: 0, y: 0});
   *      withDefaults({y: 2}); //=> {x: 0, y: 2}
   * @symb R.merge(a, b) = {...a, ...b}
   */
  var merge = _curry2(function merge(l, r) {
    return _objectAssign$1({}, l, r)
  })

  /**
   * Merges a list of objects together into one object.
   *
   * @func
   * @memberOf R
   * @since v0.10.0
   * @category List
   * @sig [{k: v}] -> {k: v}
   * @param {Array} list An array of objects
   * @return {Object} A merged object.
   * @see R.reduce
   * @example
   *
   *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
   *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
   * @symb R.mergeAll([{ x: 1 }, { y: 2 }, { z: 3 }]) = { x: 1, y: 2, z: 3 }
   */
  var mergeAll = _curry1(function mergeAll(list) {
    return _objectAssign$1.apply(null, [{}].concat(list))
  })

  /**
   * Creates a new object with the own properties of the two provided objects. If
   * a key exists in both objects, the provided function is applied to the key
   * and the values associated with the key in each object, with the result being
   * used as the value associated with the key in the returned object.
   *
   * @func
   * @memberOf R
   * @since v0.19.0
   * @category Object
   * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
   * @param {Function} fn
   * @param {Object} l
   * @param {Object} r
   * @return {Object}
   * @see R.mergeDeepWithKey, R.merge, R.mergeWith
   * @example
   *
   *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
   *      R.mergeWithKey(concatValues,
   *                     { a: true, thing: 'foo', values: [10, 20] },
   *                     { b: true, thing: 'bar', values: [15, 35] });
   *      //=> { a: true, b: true, thing: 'bar', values: [10, 20, 15, 35] }
   * @symb R.mergeWithKey(f, { x: 1, y: 2 }, { y: 5, z: 3 }) = { x: 1, y: f('y', 2, 5), z: 3 }
   */
  var mergeWithKey = _curry3(function mergeWithKey(fn, l, r) {
    var result = {}
    var k

    for (k in l) {
      if (_has(k, l)) {
        result[k] = _has(k, r) ? fn(k, l[k], r[k]) : l[k]
      }
    }

    for (k in r) {
      if (_has(k, r) && !_has(k, result)) {
        result[k] = r[k]
      }
    }

    return result
  })

  /**
   * Creates a new object with the own properties of the two provided objects.
   * If a key exists in both objects:
   * - and both associated values are also objects then the values will be
   *   recursively merged.
   * - otherwise the provided function is applied to the key and associated values
   *   using the resulting value as the new value associated with the key.
   * If a key only exists in one object, the value will be associated with the key
   * of the resulting object.
   *
   * @func
   * @memberOf R
   * @since v0.24.0
   * @category Object
   * @sig ((String, a, a) -> a) -> {a} -> {a} -> {a}
   * @param {Function} fn
   * @param {Object} lObj
   * @param {Object} rObj
   * @return {Object}
   * @see R.mergeWithKey, R.mergeDeepWith
   * @example
   *
   *      let concatValues = (k, l, r) => k == 'values' ? R.concat(l, r) : r
   *      R.mergeDeepWithKey(concatValues,
   *                         { a: true, c: { thing: 'foo', values: [10, 20] }},
   *                         { b: true, c: { thing: 'bar', values: [15, 35] }});
   *      //=> { a: true, b: true, c: { thing: 'bar', values: [10, 20, 15, 35] }}
   */
  var mergeDeepWithKey = _curry3(function mergeDeepWithKey(fn, lObj, rObj) {
    return mergeWithKey(
      function (k, lVal, rVal) {
        if (_isObject(lVal) && _isObject(rVal)) {
          return mergeDeepWithKey(fn, lVal, rVal)
        } else {
          return fn(k, lVal, rVal)
        }
      },
      lObj,
      rObj
    )
  })

  /**
   * Creates a new object with the own properties of the first object merged with
   * the own properties of the second object. If a key exists in both objects:
   * - and both values are objects, the two values will be recursively merged
   * - otherwise the value from the first object will be used.
   *
   * @func
   * @memberOf R
   * @since v0.24.0
   * @category Object
   * @sig {a} -> {a} -> {a}
   * @param {Object} lObj
   * @param {Object} rObj
   * @return {Object}
   * @see R.merge, R.mergeDeepRight, R.mergeDeepWith, R.mergeDeepWithKey
   * @example
   *
   *      R.mergeDeepLeft({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
   *                      { age: 40, contact: { email: 'baa@example.com' }});
   *      //=> { name: 'fred', age: 10, contact: { email: 'moo@example.com' }}
   */
  var mergeDeepLeft = _curry2(function mergeDeepLeft(lObj, rObj) {
    return mergeDeepWithKey(
      function (k, lVal, rVal) {
        return lVal
      },
      lObj,
      rObj
    )
  })

  /**
   * Creates a new object with the own properties of the first object merged with
   * the own properties of the second object. If a key exists in both objects:
   * - and both values are objects, the two values will be recursively merged
   * - otherwise the value from the second object will be used.
   *
   * @func
   * @memberOf R
   * @since v0.24.0
   * @category Object
   * @sig {a} -> {a} -> {a}
   * @param {Object} lObj
   * @param {Object} rObj
   * @return {Object}
   * @see R.merge, R.mergeDeepLeft, R.mergeDeepWith, R.mergeDeepWithKey
   * @example
   *
   *      R.mergeDeepRight({ name: 'fred', age: 10, contact: { email: 'moo@example.com' }},
   *                       { age: 40, contact: { email: 'baa@example.com' }});
   *      //=> { name: 'fred', age: 40, contact: { email: 'baa@example.com' }}
   */
  var mergeDeepRight = _curry2(function mergeDeepRight(lObj, rObj) {
    return mergeDeepWithKey(
      function (k, lVal, rVal) {
        return rVal
      },
      lObj,
      rObj
    )
  })

  /**
   * Creates a new object with the own properties of the two provided objects.
   * If a key exists in both objects:
   * - and both associated values are also objects then the values will be
   *   recursively merged.
   * - otherwise the provided function is applied to associated values using the
   *   resulting value as the new value associated with the key.
   * If a key only exists in one object, the value will be associated with the key
   * of the resulting object.
   *
   * @func
   * @memberOf R
   * @since v0.24.0
   * @category Object
   * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
   * @param {Function} fn
   * @param {Object} lObj
   * @param {Object} rObj
   * @return {Object}
   * @see R.mergeWith, R.mergeDeepWithKey
   * @example
   *
   *      R.mergeDeepWith(R.concat,
   *                      { a: true, c: { values: [10, 20] }},
   *                      { b: true, c: { values: [15, 35] }});
   *      //=> { a: true, b: true, c: { values: [10, 20, 15, 35] }}
   */
  var mergeDeepWith = _curry3(function mergeDeepWith(fn, lObj, rObj) {
    return mergeDeepWithKey(
      function (k, lVal, rVal) {
        return fn(lVal, rVal)
      },
      lObj,
      rObj
    )
  })

  /**
   * Create a new object with the own properties of the first object merged with
   * the own properties of the second object. If a key exists in both objects,
   * the value from the first object will be used.
   *
   * @func
   * @memberOf R
   * @since v0.26.0
   * @category Object
   * @sig {k: v} -> {k: v} -> {k: v}
   * @param {Object} l
   * @param {Object} r
   * @return {Object}
   * @see R.mergeRight, R.mergeDeepLeft, R.mergeWith, R.mergeWithKey
   * @example
   *
   *      R.mergeLeft({ 'age': 40 }, { 'name': 'fred', 'age': 10 });
   *      //=> { 'name': 'fred', 'age': 40 }
   *
   *      const resetToDefault = R.mergeLeft({x: 0});
   *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
   * @symb R.mergeLeft(a, b) = {...b, ...a}
   */
  var mergeLeft = _curry2(function mergeLeft(l, r) {
    return _objectAssign$1({}, r, l)
  })

  /**
   * Create a new object with the own properties of the first object merged with
   * the own properties of the second object. If a key exists in both objects,
   * the value from the second object will be used.
   *
   * @func
   * @memberOf R
   * @since v0.26.0
   * @category Object
   * @sig {k: v} -> {k: v} -> {k: v}
   * @param {Object} l
   * @param {Object} r
   * @return {Object}
   * @see R.mergeLeft, R.mergeDeepRight, R.mergeWith, R.mergeWithKey
   * @example
   *
   *      R.mergeRight({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
   *      //=> { 'name': 'fred', 'age': 40 }
   *
   *      const withDefaults = R.mergeRight({x: 0, y: 0});
   *      withDefaults({y: 2}); //=> {x: 0, y: 2}
   * @symb R.mergeRight(a, b) = {...a, ...b}
   */
  var mergeRight = _curry2(function mergeRight(l, r) {
    return _objectAssign$1({}, l, r)
  })

  /**
   * Creates a new object with the own properties of the two provided objects. If
   * a key exists in both objects, the provided function is applied to the values
   * associated with the key in each object, with the result being used as the
   * value associated with the key in the returned object.
   *
   * @func
   * @memberOf R
   * @since v0.19.0
   * @category Object
   * @sig ((a, a) -> a) -> {a} -> {a} -> {a}
   * @param {Function} fn
   * @param {Object} l
   * @param {Object} r
   * @return {Object}
   * @see R.mergeDeepWith, R.merge, R.mergeWithKey
   * @example
   *
   *      R.mergeWith(R.concat,
   *                  { a: true, values: [10, 20] },
   *                  { b: true, values: [15, 35] });
   *      //=> { a: true, b: true, values: [10, 20, 15, 35] }
   */
  var mergeWith = _curry3(function mergeWith(fn, l, r) {
    return mergeWithKey(
      function (_, _l, _r) {
        return fn(_l, _r)
      },
      l,
      r
    )
  })

  /**
   * Returns the smaller of its two arguments.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Relation
   * @sig Ord a => a -> a -> a
   * @param {*} a
   * @param {*} b
   * @return {*}
   * @see R.minBy, R.max
   * @example
   *
   *      R.min(789, 123); //=> 123
   *      R.min('a', 'b'); //=> 'a'
   */
  var min = _curry2(function min(a, b) {
    return b < a ? b : a
  })

  /**
   * Takes a function and two values, and returns whichever value produces the
   * smaller result when passed to the provided function.
   *
   * @func
   * @memberOf R
   * @since v0.8.0
   * @category Relation
   * @sig Ord b => (a -> b) -> a -> a -> a
   * @param {Function} f
   * @param {*} a
   * @param {*} b
   * @return {*}
   * @see R.min, R.maxBy
   * @example
   *
   *      //  square :: Number -> Number
   *      const square = n => n * n;
   *
   *      R.minBy(square, -3, 2); //=> 2
   *
   *      R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1
   *      R.reduce(R.minBy(square), Infinity, []); //=> Infinity
   */
  var minBy = _curry3(function minBy(f, a, b) {
    return f(b) < f(a) ? b : a
  })

  /**
   * Divides the first parameter by the second and returns the remainder. Note
   * that this function preserves the JavaScript-style behavior for modulo. For
   * mathematical modulo see [`mathMod`](#mathMod).
   *
   * @func
   * @memberOf R
   * @since v0.1.1
   * @category Math
   * @sig Number -> Number -> Number
   * @param {Number} a The value to the divide.
   * @param {Number} b The pseudo-modulus
   * @return {Number} The result of `b % a`.
   * @see R.mathMod
   * @example
   *
   *      R.modulo(17, 3); //=> 2
   *      // JS behavior:
   *      R.modulo(-17, 3); //=> -2
   *      R.modulo(17, -3); //=> 2
   *
   *      const isOdd = R.modulo(R.__, 2);
   *      isOdd(42); //=> 0
   *      isOdd(21); //=> 1
   */
  var modulo = _curry2(function modulo(a, b) {
    return a % b
  })

  /**
   * Move an item, at index `from`, to index `to`, in a list of elements.
   * A new list will be created containing the new elements order.
   *
   * @func
   * @memberOf R
   * @since v0.27.0
   * @category List
   * @sig Number -> Number -> [a] -> [a]
   * @param {Number} from The source index
   * @param {Number} to The destination index
   * @param {Array} list The list which will serve to realise the move
   * @return {Array} The new list reordered
   * @example
   *
   *      R.move(0, 2, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['b', 'c', 'a', 'd', 'e', 'f']
   *      R.move(-1, 0, ['a', 'b', 'c', 'd', 'e', 'f']); //=> ['f', 'a', 'b', 'c', 'd', 'e'] list rotation
   */
  var move = _curry3(function (from, to, list) {
    var length = list.length
    var result = list.slice()
    var positiveFrom = from < 0 ? length + from : from
    var positiveTo = to < 0 ? length + to : to
    var item = result.splice(positiveFrom, 1)

    return positiveFrom < 0 ||
      positiveFrom >= list.length ||
      positiveTo < 0 ||
      positiveTo >= list.length
      ? list
      : []
          .concat(result.slice(0, positiveTo))
          .concat(item)
          .concat(result.slice(positiveTo, list.length))
  })

  /**
   * Multiplies two numbers. Equivalent to `a * b` but curried.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Math
   * @sig Number -> Number -> Number
   * @param {Number} a The first value.
   * @param {Number} b The second value.
   * @return {Number} The result of `a * b`.
   * @see R.divide
   * @example
   *
   *      const double = R.multiply(2);
   *      const triple = R.multiply(3);
   *      double(3);       //=>  6
   *      triple(4);       //=> 12
   *      R.multiply(2, 5);  //=> 10
   */
  var multiply = _curry2(function multiply(a, b) {
    return a * b
  })

  /**
   * Negates its argument.
   *
   * @func
   * @memberOf R
   * @since v0.9.0
   * @category Math
   * @sig Number -> Number
   * @param {Number} n
   * @return {Number}
   * @example
   *
   *      R.negate(42); //=> -42
   */
  var negate = _curry1(function negate(n) {
    return -n
  })

  /**
   * Returns `true` if no elements of the list match the predicate, `false`
   * otherwise.
   *
   * Dispatches to the `all` method of the second argument, if present.
   *
   * Acts as a transducer if a transformer is given in list position.
   *
   * @func
   * @memberOf R
   * @since v0.12.0
   * @category List
   * @sig (a -> Boolean) -> [a] -> Boolean
   * @param {Function} fn The predicate function.
   * @param {Array} list The array to consider.
   * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
   * @see R.all, R.any
   * @example
   *
   *      const isEven = n => n % 2 === 0;
   *      const isOdd = n => n % 2 === 1;
   *
   *      R.none(isEven, [1, 3, 5, 7, 9, 11]); //=> true
   *      R.none(isOdd, [1, 3, 5, 7, 8, 11]); //=> false
   */
  var none = _curry2(function none(fn, input) {
    return all(_complement(fn), input)
  })

  /**
   * Returns a function which returns its nth argument.
   *
   * @func
   * @memberOf R
   * @since v0.9.0
   * @category Function
   * @sig Number -> *... -> *
   * @param {Number} n
   * @return {Function}
   * @example
   *
   *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
   *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
   * @symb R.nthArg(-1)(a, b, c) = c
   * @symb R.nthArg(0)(a, b, c) = a
   * @symb R.nthArg(1)(a, b, c) = b
   */
  var nthArg = _curry1(function nthArg(n) {
    var arity = n < 0 ? 1 : n + 1
    return curryN(arity, function () {
      return nth(n, arguments)
    })
  })

  /**
   * `o` is a curried composition function that returns a unary function.
   * Like [`compose`](#compose), `o` performs right-to-left function composition.
   * Unlike [`compose`](#compose), the rightmost function passed to `o` will be
   * invoked with only one argument. Also, unlike [`compose`](#compose), `o` is
   * limited to accepting only 2 unary functions. The name o was chosen because
   * of its similarity to the mathematical composition operator ∘.
   *
   * @func
   * @memberOf R
   * @since v0.24.0
   * @category Function
   * @sig (b -> c) -> (a -> b) -> a -> c
   * @param {Function} f
   * @param {Function} g
   * @return {Function}
   * @see R.compose, R.pipe
   * @example
   *
   *      const classyGreeting = name => "The name's " + name.last + ", " + name.first + " " + name.last
   *      const yellGreeting = R.o(R.toUpper, classyGreeting);
   *      yellGreeting({first: 'James', last: 'Bond'}); //=> "THE NAME'S BOND, JAMES BOND"
   *
   *      R.o(R.multiply(10), R.add(10))(-4) //=> 60
   *
   * @symb R.o(f, g, x) = f(g(x))
   */
  var o = _curry3(function o(f, g, x) {
    return f(g(x))
  })

  function _of(x) {
    return [x]
  }

  /**
   * Returns a singleton array containing the value provided.
   *
   * Note this `of` is different from the ES6 `of`; See
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
   *
   * @func
   * @memberOf R
   * @since v0.3.0
   * @category Function
   * @sig a -> [a]
   * @param {*} x any value
   * @return {Array} An array wrapping `x`.
   * @example
   *
   *      R.of(null); //=> [null]
   *      R.of([42]); //=> [[42]]
   */
  var of = _curry1(_of)

  /**
   * Returns a partial copy of an object omitting the keys specified.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Object
   * @sig [String] -> {String: *} -> {String: *}
   * @param {Array} names an array of String property names to omit from the new object
   * @param {Object} obj The object to copy from
   * @return {Object} A new object with properties from `names` not on it.
   * @see R.pick
   * @example
   *
   *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
   */
  var omit = _curry2(function omit(names, obj) {
    var result = {}
    var index = {}
    var idx = 0
    var len = names.length

    while (idx < len) {
      index[names[idx]] = 1
      idx += 1
    }

    for (var prop in obj) {
      if (!index.hasOwnProperty(prop)) {
        result[prop] = obj[prop]
      }
    }
    return result
  })

  /**
   * Accepts a function `fn` and returns a function that guards invocation of
   * `fn` such that `fn` can only ever be called once, no matter how many times
   * the returned function is invoked. The first value calculated is returned in
   * subsequent invocations.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Function
   * @sig (a... -> b) -> (a... -> b)
   * @param {Function} fn The function to wrap in a call-only-once wrapper.
   * @return {Function} The wrapped function.
   * @example
   *
   *      const addOneOnce = R.once(x => x + 1);
   *      addOneOnce(10); //=> 11
   *      addOneOnce(addOneOnce(50)); //=> 11
   */
  var once = _curry1(function once(fn) {
    var called = false
    var result
    return _arity(fn.length, function () {
      if (called) {
        return result
      }
      called = true
      result = fn.apply(this, arguments)
      return result
    })
  })

  function _assertPromise(name, p) {
    if (p == null || !_isFunction(p.then)) {
      throw new TypeError(
        '`' + name + '` expected a Promise, received ' + _toString(p, [])
      )
    }
  }

  /**
   * Returns the result of applying the onFailure function to the value inside
   * a failed promise. This is useful for handling rejected promises
   * inside function compositions.
   *
   * @func
   * @memberOf R
   * @since v0.26.0
   * @category Function
   * @sig (e -> b) -> (Promise e a) -> (Promise e b)
   * @sig (e -> (Promise f b)) -> (Promise e a) -> (Promise f b)
   * @param {Function} onFailure The function to apply. Can return a value or a promise of a value.
   * @param {Promise} p
   * @return {Promise} The result of calling `p.then(null, onFailure)`
   * @see R.then
   * @example
   *
   *      var failedFetch = (id) => Promise.reject('bad ID');
   *      var useDefault = () => ({ firstName: 'Bob', lastName: 'Loblaw' })
   *
   *      //recoverFromFailure :: String -> Promise ({firstName, lastName})
   *      var recoverFromFailure = R.pipe(
   *        failedFetch,
   *        R.otherwise(useDefault),
   *        R.then(R.pick(['firstName', 'lastName'])),
   *      );
   *      recoverFromFailure(12345).then(console.log)
   */
  var otherwise = _curry2(function otherwise(f, p) {
    _assertPromise('otherwise', p)

    return p.then(null, f)
  })

  // `Identity` is a functor that holds a single value, where `map` simply
  // transforms the held value with the provided function.
  var Identity = function (x) {
    return {
      value: x,
      map: function (f) {
        return Identity(f(x))
      }
    }
  }

  /**
   * Returns the result of "setting" the portion of the given data structure
   * focused by the given lens to the result of applying the given function to
   * the focused value.
   *
   * @func
   * @memberOf R
   * @since v0.16.0
   * @category Object
   * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
   * @sig Lens s a -> (a -> a) -> s -> s
   * @param {Lens} lens
   * @param {*} v
   * @param {*} x
   * @return {*}
   * @see R.prop, R.lensIndex, R.lensProp
   * @example
   *
   *      const headLens = R.lensIndex(0);
   *
   *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
   */
  var over = _curry3(function over(lens, f, x) {
    // The value returned by the getter function is first transformed with `f`,
    // then set as the value of an `Identity`. This is then mapped over with the
    // setter function of the lens.
    return lens(function (y) {
      return Identity(f(y))
    })(x).value
  })

  /**
   * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
   *
   * @func
   * @memberOf R
   * @since v0.18.0
   * @category List
   * @sig a -> b -> (a,b)
   * @param {*} fst
   * @param {*} snd
   * @return {Array}
   * @see R.objOf, R.of
   * @example
   *
   *      R.pair('foo', 'bar'); //=> ['foo', 'bar']
   */
  var pair = _curry2(function pair(fst, snd) {
    return [fst, snd]
  })

  function _createPartialApplicator(concat) {
    return _curry2(function (fn, args) {
      return _arity(Math.max(0, fn.length - args.length), function () {
        return fn.apply(this, concat(args, arguments))
      })
    })
  }

  /**
   * Takes a function `f` and a list of arguments, and returns a function `g`.
   * When applied, `g` returns the result of applying `f` to the arguments
   * provided initially followed by the arguments provided to `g`.
   *
   * @func
   * @memberOf R
   * @since v0.10.0
   * @category Function
   * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
   * @param {Function} f
   * @param {Array} args
   * @return {Function}
   * @see R.partialRight, R.curry
   * @example
   *
   *      const multiply2 = (a, b) => a * b;
   *      const double = R.partial(multiply2, [2]);
   *      double(2); //=> 4
   *
   *      const greet = (salutation, title, firstName, lastName) =>
   *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
   *
   *      const sayHello = R.partial(greet, ['Hello']);
   *      const sayHelloToMs = R.partial(sayHello, ['Ms.']);
   *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
   * @symb R.partial(f, [a, b])(c, d) = f(a, b, c, d)
   */
  var partial = _createPartialApplicator(_concat)

  /**
   * Takes a function `f` and a list of arguments, and returns a function `g`.
   * When applied, `g` returns the result of applying `f` to the arguments
   * provided to `g` followed by the arguments provided initially.
   *
   * @func
   * @memberOf R
   * @since v0.10.0
   * @category Function
   * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
   * @param {Function} f
   * @param {Array} args
   * @return {Function}
   * @see R.partial
   * @example
   *
   *      const greet = (salutation, title, firstName, lastName) =>
   *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
   *
   *      const greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
   *
   *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
   * @symb R.partialRight(f, [a, b])(c, d) = f(c, d, a, b)
   */
  var partialRight = _createPartialApplicator(flip(_concat))

  /**
   * Takes a predicate and a list or other `Filterable` object and returns the
   * pair of filterable objects of the same type of elements which do and do not
   * satisfy, the predicate, respectively. Filterable objects include plain objects or any object
   * that has a filter method such as `Array`.
   *
   * @func
   * @memberOf R
   * @since v0.1.4
   * @category List
   * @sig Filterable f => (a -> Boolean) -> f a -> [f a, f a]
   * @param {Function} pred A predicate to determine which side the element belongs to.
   * @param {Array} filterable the list (or other filterable) to partition.
   * @return {Array} An array, containing first the subset of elements that satisfy the
   *         predicate, and second the subset of elements that do not satisfy.
   * @see R.filter, R.reject
   * @example
   *
   *      R.partition(R.includes('s'), ['sss', 'ttt', 'foo', 'bars']);
   *      // => [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
   *
   *      R.partition(R.includes('s'), { a: 'sss', b: 'ttt', foo: 'bars' });
   *      // => [ { a: 'sss', foo: 'bars' }, { b: 'ttt' }  ]
   */
  var partition = juxt([filter, reject])

  /**
   * Determines whether a nested path on an object has a specific value, in
   * [`R.equals`](#equals) terms. Most likely used to filter a list.
   *
   * @func
   * @memberOf R
   * @since v0.7.0
   * @category Relation
   * @typedefn Idx = String | Int
   * @sig [Idx] -> a -> {a} -> Boolean
   * @param {Array} path The path of the nested property to use
   * @param {*} val The value to compare the nested property with
   * @param {Object} obj The object to check the nested property in
   * @return {Boolean} `true` if the value equals the nested object property,
   *         `false` otherwise.
   * @example
   *
   *      const user1 = { address: { zipCode: 90210 } };
   *      const user2 = { address: { zipCode: 55555 } };
   *      const user3 = { name: 'Bob' };
   *      const users = [ user1, user2, user3 ];
   *      const isFamous = R.pathEq(['address', 'zipCode'], 90210);
   *      R.filter(isFamous, users); //=> [ user1 ]
   */
  var pathEq = _curry3(function pathEq(_path, val, obj) {
    return equals(path(_path, obj), val)
  })

  /**
   * If the given, non-null object has a value at the given path, returns the
   * value at that path. Otherwise returns the provided default value.
   *
   * @func
   * @memberOf R
   * @since v0.18.0
   * @category Object
   * @typedefn Idx = String | Int
   * @sig a -> [Idx] -> {a} -> a
   * @param {*} d The default value.
   * @param {Array} p The path to use.
   * @param {Object} obj The object to retrieve the nested property from.
   * @return {*} The data at `path` of the supplied object or the default value.
   * @example
   *
   *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
   *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
   */
  var pathOr = _curry3(function pathOr(d, p, obj) {
    return defaultTo(d, path(p, obj))
  })

  /**
   * Returns `true` if the specified object property at given path satisfies the
   * given predicate; `false` otherwise.
   *
   * @func
   * @memberOf R
   * @since v0.19.0
   * @category Logic
   * @typedefn Idx = String | Int
   * @sig (a -> Boolean) -> [Idx] -> {a} -> Boolean
   * @param {Function} pred
   * @param {Array} propPath
   * @param {*} obj
   * @return {Boolean}
   * @see R.propSatisfies, R.path
   * @example
   *
   *      R.pathSatisfies(y => y > 0, ['x', 'y'], {x: {y: 2}}); //=> true
   *      R.pathSatisfies(R.is(Object), [], {x: {y: 2}}); //=> true
   */
  var pathSatisfies = _curry3(function pathSatisfies(pred, propPath, obj) {
    return pred(path(propPath, obj))
  })

  /**
   * Returns a partial copy of an object containing only the keys specified. If
   * the key does not exist, the property is ignored.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Object
   * @sig [k] -> {k: v} -> {k: v}
   * @param {Array} names an array of String property names to copy onto a new object
   * @param {Object} obj The object to copy from
   * @return {Object} A new object with only properties from `names` on it.
   * @see R.omit, R.props
   * @example
   *
   *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
   *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
   */
  var pick = _curry2(function pick(names, obj) {
    var result = {}
    var idx = 0
    while (idx < names.length) {
      if (names[idx] in obj) {
        result[names[idx]] = obj[names[idx]]
      }
      idx += 1
    }
    return result
  })

  /**
   * Similar to `pick` except that this one includes a `key: undefined` pair for
   * properties that don't exist.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Object
   * @sig [k] -> {k: v} -> {k: v}
   * @param {Array} names an array of String property names to copy onto a new object
   * @param {Object} obj The object to copy from
   * @return {Object} A new object with only properties from `names` on it.
   * @see R.pick
   * @example
   *
   *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
   *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
   */
  var pickAll = _curry2(function pickAll(names, obj) {
    var result = {}
    var idx = 0
    var len = names.length
    while (idx < len) {
      var name = names[idx]
      result[name] = obj[name]
      idx += 1
    }
    return result
  })

  /**
   * Returns a partial copy of an object containing only the keys that satisfy
   * the supplied predicate.
   *
   * @func
   * @memberOf R
   * @since v0.8.0
   * @category Object
   * @sig ((v, k) -> Boolean) -> {k: v} -> {k: v}
   * @param {Function} pred A predicate to determine whether or not a key
   *        should be included on the output object.
   * @param {Object} obj The object to copy from
   * @return {Object} A new object with only properties that satisfy `pred`
   *         on it.
   * @see R.pick, R.filter
   * @example
   *
   *      const isUpperCase = (val, key) => key.toUpperCase() === key;
   *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
   */
  var pickBy = _curry2(function pickBy(test, obj) {
    var result = {}
    for (var prop in obj) {
      if (test(obj[prop], prop, obj)) {
        result[prop] = obj[prop]
      }
    }
    return result
  })

  /**
   * Returns the left-to-right Kleisli composition of the provided functions,
   * each of which must return a value of a type supported by [`chain`](#chain).
   *
   * `R.pipeK(f, g, h)` is equivalent to `R.pipe(f, R.chain(g), R.chain(h))`.
   *
   * @func
   * @memberOf R
   * @since v0.16.0
   * @category Function
   * @sig Chain m => ((a -> m b), (b -> m c), ..., (y -> m z)) -> (a -> m z)
   * @param {...Function}
   * @return {Function}
   * @see R.composeK
   * @deprecated since v0.26.0
   * @example
   *
   *      //  parseJson :: String -> Maybe *
   *      //  get :: String -> Object -> Maybe *
   *
   *      //  getStateCode :: Maybe String -> Maybe String
   *      const getStateCode = R.pipeK(
   *        parseJson,
   *        get('user'),
   *        get('address'),
   *        get('state'),
   *        R.compose(Maybe.of, R.toUpper)
   *      );
   *
   *      getStateCode('{"user":{"address":{"state":"ny"}}}');
   *      //=> Just('NY')
   *      getStateCode('[Invalid JSON]');
   *      //=> Nothing()
   * @symb R.pipeK(f, g, h)(a) = R.chain(h, R.chain(g, f(a)))
   */
  function pipeK() {
    if (arguments.length === 0) {
      throw new Error('pipeK requires at least one argument')
    }
    return composeK.apply(this, reverse(arguments))
  }

  /**
   * Returns a new list with the given element at the front, followed by the
   * contents of the list.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category List
   * @sig a -> [a] -> [a]
   * @param {*} el The item to add to the head of the output list.
   * @param {Array} list The array to add to the tail of the output list.
   * @return {Array} A new array.
   * @see R.append
   * @example
   *
   *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
   */
  var prepend = _curry2(function prepend(el, list) {
    return _concat([el], list)
  })

  /**
   * Multiplies together all the elements of a list.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Math
   * @sig [Number] -> Number
   * @param {Array} list An array of numbers
   * @return {Number} The product of all the numbers in the list.
   * @see R.reduce
   * @example
   *
   *      R.product([2,4,6,8,100,1]); //=> 38400
   */
  var product = reduce(multiply, 1)

  /**
   * Accepts a function `fn` and a list of transformer functions and returns a
   * new curried function. When the new function is invoked, it calls the
   * function `fn` with parameters consisting of the result of calling each
   * supplied handler on successive arguments to the new function.
   *
   * If more arguments are passed to the returned function than transformer
   * functions, those arguments are passed directly to `fn` as additional
   * parameters. If you expect additional arguments that don't need to be
   * transformed, although you can ignore them, it's best to pass an identity
   * function so that the new function reports the correct arity.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Function
   * @sig ((x1, x2, ...) -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
   * @param {Function} fn The function to wrap.
   * @param {Array} transformers A list of transformer functions
   * @return {Function} The wrapped function.
   * @see R.converge
   * @example
   *
   *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
   *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
   *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
   *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
   * @symb R.useWith(f, [g, h])(a, b) = f(g(a), h(b))
   */
  var useWith = _curry2(function useWith(fn, transformers) {
    return curryN(transformers.length, function () {
      var args = []
      var idx = 0
      while (idx < transformers.length) {
        args.push(transformers[idx].call(this, arguments[idx]))
        idx += 1
      }
      return fn.apply(
        this,
        args.concat(Array.prototype.slice.call(arguments, transformers.length))
      )
    })
  })

  /**
   * Reasonable analog to SQL `select` statement.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Object
   * @category Relation
   * @sig [k] -> [{k: v}] -> [{k: v}]
   * @param {Array} props The property names to project
   * @param {Array} objs The objects to query
   * @return {Array} An array of objects with just the `props` properties.
   * @example
   *
   *      const abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
   *      const fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
   *      const kids = [abby, fred];
   *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
   */
  var project = useWith(_map, [pickAll, identity]) // passing `identity` gives correct arity

  /**
   * Returns `true` if the specified object property is equal, in
   * [`R.equals`](#equals) terms, to the given value; `false` otherwise.
   * You can test multiple properties with [`R.whereEq`](#whereEq).
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Relation
   * @sig String -> a -> Object -> Boolean
   * @param {String} name
   * @param {*} val
   * @param {*} obj
   * @return {Boolean}
   * @see R.whereEq, R.propSatisfies, R.equals
   * @example
   *
   *      const abby = {name: 'Abby', age: 7, hair: 'blond'};
   *      const fred = {name: 'Fred', age: 12, hair: 'brown'};
   *      const rusty = {name: 'Rusty', age: 10, hair: 'brown'};
   *      const alois = {name: 'Alois', age: 15, disposition: 'surly'};
   *      const kids = [abby, fred, rusty, alois];
   *      const hasBrownHair = R.propEq('hair', 'brown');
   *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
   */
  var propEq = _curry3(function propEq(name, val, obj) {
    return equals(val, obj[name])
  })

  /**
   * Returns `true` if the specified object property is of the given type;
   * `false` otherwise.
   *
   * @func
   * @memberOf R
   * @since v0.16.0
   * @category Type
   * @sig Type -> String -> Object -> Boolean
   * @param {Function} type
   * @param {String} name
   * @param {*} obj
   * @return {Boolean}
   * @see R.is, R.propSatisfies
   * @example
   *
   *      R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
   *      R.propIs(Number, 'x', {x: 'foo'});    //=> false
   *      R.propIs(Number, 'x', {});            //=> false
   */
  var propIs = _curry3(function propIs(type, name, obj) {
    return is(type, obj[name])
  })

  /**
   * If the given, non-null object has an own property with the specified name,
   * returns the value of that property. Otherwise returns the provided default
   * value.
   *
   * @func
   * @memberOf R
   * @since v0.6.0
   * @category Object
   * @sig a -> String -> Object -> a
   * @param {*} val The default value.
   * @param {String} p The name of the property to return.
   * @param {Object} obj The object to query.
   * @return {*} The value of given property of the supplied object or the default value.
   * @example
   *
   *      const alice = {
   *        name: 'ALICE',
   *        age: 101
   *      };
   *      const favorite = R.prop('favoriteLibrary');
   *      const favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
   *
   *      favorite(alice);  //=> undefined
   *      favoriteWithDefault(alice);  //=> 'Ramda'
   */
  var propOr = _curry3(function propOr(val, p, obj) {
    return pathOr(val, [p], obj)
  })

  /**
   * Returns `true` if the specified object property satisfies the given
   * predicate; `false` otherwise. You can test multiple properties with
   * [`R.where`](#where).
   *
   * @func
   * @memberOf R
   * @since v0.16.0
   * @category Logic
   * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
   * @param {Function} pred
   * @param {String} name
   * @param {*} obj
   * @return {Boolean}
   * @see R.where, R.propEq, R.propIs
   * @example
   *
   *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
   */
  var propSatisfies = _curry3(function propSatisfies(pred, name, obj) {
    return pred(obj[name])
  })

  /**
   * Acts as multiple `prop`: array of keys in, array of values out. Preserves
   * order.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Object
   * @sig [k] -> {k: v} -> [v]
   * @param {Array} ps The property names to fetch
   * @param {Object} obj The object to query
   * @return {Array} The corresponding values or partially applied function.
   * @example
   *
   *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
   *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
   *
   *      const fullName = R.compose(R.join(' '), R.props(['first', 'last']));
   *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
   */
  var props = _curry2(function props(ps, obj) {
    return ps.map(function (p) {
      return path([p], obj)
    })
  })

  /**
   * Returns a list of numbers from `from` (inclusive) to `to` (exclusive).
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category List
   * @sig Number -> Number -> [Number]
   * @param {Number} from The first number in the list.
   * @param {Number} to One more than the last number in the list.
   * @return {Array} The list of numbers in the set `[a, b)`.
   * @example
   *
   *      R.range(1, 5);    //=> [1, 2, 3, 4]
   *      R.range(50, 53);  //=> [50, 51, 52]
   */
  var range = _curry2(function range(from, to) {
    if (!(_isNumber(from) && _isNumber(to))) {
      throw new TypeError('Both arguments to range must be numbers')
    }
    var result = []
    var n = from
    while (n < to) {
      result.push(n)
      n += 1
    }
    return result
  })

  /**
   * Returns a single item by iterating through the list, successively calling
   * the iterator function and passing it an accumulator value and the current
   * value from the array, and then passing the result to the next call.
   *
   * Similar to [`reduce`](#reduce), except moves through the input list from the
   * right to the left.
   *
   * The iterator function receives two values: *(value, acc)*, while the arguments'
   * order of `reduce`'s iterator function is *(acc, value)*.
   *
   * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse
   * arrays), unlike the native `Array.prototype.reduceRight` method. For more details
   * on this behavior, see:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category List
   * @sig ((a, b) -> b) -> b -> [a] -> b
   * @param {Function} fn The iterator function. Receives two values, the current element from the array
   *        and the accumulator.
   * @param {*} acc The accumulator value.
   * @param {Array} list The list to iterate over.
   * @return {*} The final, accumulated value.
   * @see R.reduce, R.addIndex
   * @example
   *
   *      R.reduceRight(R.subtract, 0, [1, 2, 3, 4]) // => (1 - (2 - (3 - (4 - 0)))) = -2
   *      //    -               -2
   *      //   / \              / \
   *      //  1   -            1   3
   *      //     / \              / \
   *      //    2   -     ==>    2  -1
   *      //       / \              / \
   *      //      3   -            3   4
   *      //         / \              / \
   *      //        4   0            4   0
   *
   * @symb R.reduceRight(f, a, [b, c, d]) = f(b, f(c, f(d, a)))
   */
  var reduceRight = _curry3(function reduceRight(fn, acc, list) {
    var idx = list.length - 1
    while (idx >= 0) {
      acc = fn(list[idx], acc)
      idx -= 1
    }
    return acc
  })

  /**
   * Like [`reduce`](#reduce), `reduceWhile` returns a single item by iterating
   * through the list, successively calling the iterator function. `reduceWhile`
   * also takes a predicate that is evaluated before each step. If the predicate
   * returns `false`, it "short-circuits" the iteration and returns the current
   * value of the accumulator.
   *
   * @func
   * @memberOf R
   * @since v0.22.0
   * @category List
   * @sig ((a, b) -> Boolean) -> ((a, b) -> a) -> a -> [b] -> a
   * @param {Function} pred The predicate. It is passed the accumulator and the
   *        current element.
   * @param {Function} fn The iterator function. Receives two values, the
   *        accumulator and the current element.
   * @param {*} a The accumulator value.
   * @param {Array} list The list to iterate over.
   * @return {*} The final, accumulated value.
   * @see R.reduce, R.reduced
   * @example
   *
   *      const isOdd = (acc, x) => x % 2 === 1;
   *      const xs = [1, 3, 5, 60, 777, 800];
   *      R.reduceWhile(isOdd, R.add, 0, xs); //=> 9
   *
   *      const ys = [2, 4, 6]
   *      R.reduceWhile(isOdd, R.add, 111, ys); //=> 111
   */
  var reduceWhile = _curryN(4, [], function _reduceWhile(pred, fn, a, list) {
    return _reduce(
      function (acc, x) {
        return pred(acc, x) ? fn(acc, x) : _reduced(acc)
      },
      a,
      list
    )
  })

  /**
   * Returns a value wrapped to indicate that it is the final value of the reduce
   * and transduce functions. The returned value should be considered a black
   * box: the internal structure is not guaranteed to be stable.
   *
   * Note: this optimization is only available to the below functions:
   * - [`reduce`](#reduce)
   * - [`reduceWhile`](#reduceWhile)
   * - [`transduce`](#transduce)
   *
   * @func
   * @memberOf R
   * @since v0.15.0
   * @category List
   * @sig a -> *
   * @param {*} x The final value of the reduce.
   * @return {*} The wrapped value.
   * @see R.reduce, R.reduceWhile, R.transduce
   * @example
   *
   *     R.reduce(
   *       (acc, item) => item > 3 ? R.reduced(acc) : acc.concat(item),
   *       [],
   *       [1, 2, 3, 4, 5]) // [1, 2, 3]
   */
  var reduced = _curry1(_reduced)

  /**
   * Calls an input function `n` times, returning an array containing the results
   * of those function calls.
   *
   * `fn` is passed one argument: The current value of `n`, which begins at `0`
   * and is gradually incremented to `n - 1`.
   *
   * @func
   * @memberOf R
   * @since v0.2.3
   * @category List
   * @sig (Number -> a) -> Number -> [a]
   * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
   * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
   * @return {Array} An array containing the return values of all calls to `fn`.
   * @see R.repeat
   * @example
   *
   *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
   * @symb R.times(f, 0) = []
   * @symb R.times(f, 1) = [f(0)]
   * @symb R.times(f, 2) = [f(0), f(1)]
   */
  var times = _curry2(function times(fn, n) {
    var len = Number(n)
    var idx = 0
    var list

    if (len < 0 || isNaN(len)) {
      throw new RangeError('n must be a non-negative number')
    }
    list = new Array(len)
    while (idx < len) {
      list[idx] = fn(idx)
      idx += 1
    }
    return list
  })

  /**
   * Returns a fixed list of size `n` containing a specified identical value.
   *
   * @func
   * @memberOf R
   * @since v0.1.1
   * @category List
   * @sig a -> n -> [a]
   * @param {*} value The value to repeat.
   * @param {Number} n The desired size of the output list.
   * @return {Array} A new array containing `n` `value`s.
   * @see R.times
   * @example
   *
   *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
   *
   *      const obj = {};
   *      const repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
   *      repeatedObjs[0] === repeatedObjs[1]; //=> true
   * @symb R.repeat(a, 0) = []
   * @symb R.repeat(a, 1) = [a]
   * @symb R.repeat(a, 2) = [a, a]
   */
  var repeat = _curry2(function repeat(value, n) {
    return times(always(value), n)
  })

  /**
   * Replace a substring or regex match in a string with a replacement.
   *
   * The first two parameters correspond to the parameters of the
   * `String.prototype.replace()` function, so the second parameter can also be a
   * function.
   *
   * @func
   * @memberOf R
   * @since v0.7.0
   * @category String
   * @sig RegExp|String -> String -> String -> String
   * @param {RegExp|String} pattern A regular expression or a substring to match.
   * @param {String} replacement The string to replace the matches with.
   * @param {String} str The String to do the search and replacement in.
   * @return {String} The result.
   * @example
   *
   *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
   *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
   *
   *      // Use the "g" (global) flag to replace all occurrences:
   *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
   */
  var replace = _curry3(function replace(regex, replacement, str) {
    return str.replace(regex, replacement)
  })

  /**
   * Scan is similar to [`reduce`](#reduce), but returns a list of successively
   * reduced values from the left
   *
   * @func
   * @memberOf R
   * @since v0.10.0
   * @category List
   * @sig ((a, b) -> a) -> a -> [b] -> [a]
   * @param {Function} fn The iterator function. Receives two values, the accumulator and the
   *        current element from the array
   * @param {*} acc The accumulator value.
   * @param {Array} list The list to iterate over.
   * @return {Array} A list of all intermediately reduced values.
   * @see R.reduce, R.mapAccum
   * @example
   *
   *      const numbers = [1, 2, 3, 4];
   *      const factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
   * @symb R.scan(f, a, [b, c]) = [a, f(a, b), f(f(a, b), c)]
   */
  var scan = _curry3(function scan(fn, acc, list) {
    var idx = 0
    var len = list.length
    var result = [acc]
    while (idx < len) {
      acc = fn(acc, list[idx])
      result[idx + 1] = acc
      idx += 1
    }
    return result
  })

  /**
   * Transforms a [Traversable](https://github.com/fantasyland/fantasy-land#traversable)
   * of [Applicative](https://github.com/fantasyland/fantasy-land#applicative) into an
   * Applicative of Traversable.
   *
   * Dispatches to the `sequence` method of the second argument, if present.
   *
   * @func
   * @memberOf R
   * @since v0.19.0
   * @category List
   * @sig (Applicative f, Traversable t) => (a -> f a) -> t (f a) -> f (t a)
   * @param {Function} of
   * @param {*} traversable
   * @return {*}
   * @see R.traverse
   * @example
   *
   *      R.sequence(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
   *      R.sequence(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
   *
   *      R.sequence(R.of, Just([1, 2, 3])); //=> [Just(1), Just(2), Just(3)]
   *      R.sequence(R.of, Nothing());       //=> [Nothing()]
   */
  var sequence = _curry2(function sequence(of, traversable) {
    return typeof traversable.sequence === 'function'
      ? traversable.sequence(of)
      : reduceRight(
          function (x, acc) {
            return ap(map(prepend, x), acc)
          },
          of([]),
          traversable
        )
  })

  /**
   * Returns the result of "setting" the portion of the given data structure
   * focused by the given lens to the given value.
   *
   * @func
   * @memberOf R
   * @since v0.16.0
   * @category Object
   * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
   * @sig Lens s a -> a -> s -> s
   * @param {Lens} lens
   * @param {*} v
   * @param {*} x
   * @return {*}
   * @see R.prop, R.lensIndex, R.lensProp
   * @example
   *
   *      const xLens = R.lensProp('x');
   *
   *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
   *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
   */
  var set = _curry3(function set(lens, v, x) {
    return over(lens, always(v), x)
  })

  /**
   * Returns a copy of the list, sorted according to the comparator function,
   * which should accept two values at a time and return a negative number if the
   * first value is smaller, a positive number if it's larger, and zero if they
   * are equal. Please note that this is a **copy** of the list. It does not
   * modify the original.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category List
   * @sig ((a, a) -> Number) -> [a] -> [a]
   * @param {Function} comparator A sorting function :: a -> b -> Int
   * @param {Array} list The list to sort
   * @return {Array} a new array with its elements sorted by the comparator function.
   * @example
   *
   *      const diff = function(a, b) { return a - b; };
   *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
   */
  var sort = _curry2(function sort(comparator, list) {
    return Array.prototype.slice.call(list, 0).sort(comparator)
  })

  /**
   * Sorts the list according to the supplied function.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Relation
   * @sig Ord b => (a -> b) -> [a] -> [a]
   * @param {Function} fn
   * @param {Array} list The list to sort.
   * @return {Array} A new list sorted by the keys generated by `fn`.
   * @example
   *
   *      const sortByFirstItem = R.sortBy(R.prop(0));
   *      const pairs = [[-1, 1], [-2, 2], [-3, 3]];
   *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
   *
   *      const sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
   *      const alice = {
   *        name: 'ALICE',
   *        age: 101
   *      };
   *      const bob = {
   *        name: 'Bob',
   *        age: -10
   *      };
   *      const clara = {
   *        name: 'clara',
   *        age: 314.159
   *      };
   *      const people = [clara, bob, alice];
   *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
   */
  var sortBy = _curry2(function sortBy(fn, list) {
    return Array.prototype.slice.call(list, 0).sort(function (a, b) {
      var aa = fn(a)
      var bb = fn(b)
      return aa < bb ? -1 : aa > bb ? 1 : 0
    })
  })

  /**
   * Sorts a list according to a list of comparators.
   *
   * @func
   * @memberOf R
   * @since v0.23.0
   * @category Relation
   * @sig [(a, a) -> Number] -> [a] -> [a]
   * @param {Array} functions A list of comparator functions.
   * @param {Array} list The list to sort.
   * @return {Array} A new list sorted according to the comarator functions.
   * @example
   *
   *      const alice = {
   *        name: 'alice',
   *        age: 40
   *      };
   *      const bob = {
   *        name: 'bob',
   *        age: 30
   *      };
   *      const clara = {
   *        name: 'clara',
   *        age: 40
   *      };
   *      const people = [clara, bob, alice];
   *      const ageNameSort = R.sortWith([
   *        R.descend(R.prop('age')),
   *        R.ascend(R.prop('name'))
   *      ]);
   *      ageNameSort(people); //=> [alice, clara, bob]
   */
  var sortWith = _curry2(function sortWith(fns, list) {
    return Array.prototype.slice.call(list, 0).sort(function (a, b) {
      var result = 0
      var i = 0
      while (result === 0 && i < fns.length) {
        result = fns[i](a, b)
        i += 1
      }
      return result
    })
  })

  /**
   * Splits a string into an array of strings based on the given
   * separator.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category String
   * @sig (String | RegExp) -> String -> [String]
   * @param {String|RegExp} sep The pattern.
   * @param {String} str The string to separate into an array.
   * @return {Array} The array of strings from `str` separated by `sep`.
   * @see R.join
   * @example
   *
   *      const pathComponents = R.split('/');
   *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
   *
   *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
   */
  var split = invoker(1, 'split')

  /**
   * Splits a given list or string at a given index.
   *
   * @func
   * @memberOf R
   * @since v0.19.0
   * @category List
   * @sig Number -> [a] -> [[a], [a]]
   * @sig Number -> String -> [String, String]
   * @param {Number} index The index where the array/string is split.
   * @param {Array|String} array The array/string to be split.
   * @return {Array}
   * @example
   *
   *      R.splitAt(1, [1, 2, 3]);          //=> [[1], [2, 3]]
   *      R.splitAt(5, 'hello world');      //=> ['hello', ' world']
   *      R.splitAt(-1, 'foobar');          //=> ['fooba', 'r']
   */
  var splitAt = _curry2(function splitAt(index, array) {
    return [slice(0, index, array), slice(index, length(array), array)]
  })

  /**
   * Splits a collection into slices of the specified length.
   *
   * @func
   * @memberOf R
   * @since v0.16.0
   * @category List
   * @sig Number -> [a] -> [[a]]
   * @sig Number -> String -> [String]
   * @param {Number} n
   * @param {Array} list
   * @return {Array}
   * @example
   *
   *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
   *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
   */
  var splitEvery = _curry2(function splitEvery(n, list) {
    if (n <= 0) {
      throw new Error('First argument to splitEvery must be a positive integer')
    }
    var result = []
    var idx = 0
    while (idx < list.length) {
      result.push(slice(idx, (idx += n), list))
    }
    return result
  })

  /**
   * Takes a list and a predicate and returns a pair of lists with the following properties:
   *
   *  - the result of concatenating the two output lists is equivalent to the input list;
   *  - none of the elements of the first output list satisfies the predicate; and
   *  - if the second output list is non-empty, its first element satisfies the predicate.
   *
   * @func
   * @memberOf R
   * @since v0.19.0
   * @category List
   * @sig (a -> Boolean) -> [a] -> [[a], [a]]
   * @param {Function} pred The predicate that determines where the array is split.
   * @param {Array} list The array to be split.
   * @return {Array}
   * @example
   *
   *      R.splitWhen(R.equals(2), [1, 2, 3, 1, 2, 3]);   //=> [[1], [2, 3, 1, 2, 3]]
   */
  var splitWhen = _curry2(function splitWhen(pred, list) {
    var idx = 0
    var len = list.length
    var prefix = []

    while (idx < len && !pred(list[idx])) {
      prefix.push(list[idx])
      idx += 1
    }

    return [prefix, Array.prototype.slice.call(list, idx)]
  })

  /**
   * Checks if a list starts with the provided sublist.
   *
   * Similarly, checks if a string starts with the provided substring.
   *
   * @func
   * @memberOf R
   * @since v0.24.0
   * @category List
   * @sig [a] -> [a] -> Boolean
   * @sig String -> String -> Boolean
   * @param {*} prefix
   * @param {*} list
   * @return {Boolean}
   * @see R.endsWith
   * @example
   *
   *      R.startsWith('a', 'abc')                //=> true
   *      R.startsWith('b', 'abc')                //=> false
   *      R.startsWith(['a'], ['a', 'b', 'c'])    //=> true
   *      R.startsWith(['b'], ['a', 'b', 'c'])    //=> false
   */
  var startsWith = _curry2(function (prefix, list) {
    return equals(take(prefix.length, list), prefix)
  })

  /**
   * Subtracts its second argument from its first argument.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Math
   * @sig Number -> Number -> Number
   * @param {Number} a The first value.
   * @param {Number} b The second value.
   * @return {Number} The result of `a - b`.
   * @see R.add
   * @example
   *
   *      R.subtract(10, 8); //=> 2
   *
   *      const minus5 = R.subtract(R.__, 5);
   *      minus5(17); //=> 12
   *
   *      const complementaryAngle = R.subtract(90);
   *      complementaryAngle(30); //=> 60
   *      complementaryAngle(72); //=> 18
   */
  var subtract = _curry2(function subtract(a, b) {
    return Number(a) - Number(b)
  })

  /**
   * Finds the set (i.e. no duplicates) of all elements contained in the first or
   * second list, but not both.
   *
   * @func
   * @memberOf R
   * @since v0.19.0
   * @category Relation
   * @sig [*] -> [*] -> [*]
   * @param {Array} list1 The first list.
   * @param {Array} list2 The second list.
   * @return {Array} The elements in `list1` or `list2`, but not both.
   * @see R.symmetricDifferenceWith, R.difference, R.differenceWith
   * @example
   *
   *      R.symmetricDifference([1,2,3,4], [7,6,5,4,3]); //=> [1,2,7,6,5]
   *      R.symmetricDifference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5,1,2]
   */
  var symmetricDifference = _curry2(function symmetricDifference(list1, list2) {
    return concat(difference(list1, list2), difference(list2, list1))
  })

  /**
   * Finds the set (i.e. no duplicates) of all elements contained in the first or
   * second list, but not both. Duplication is determined according to the value
   * returned by applying the supplied predicate to two list elements.
   *
   * @func
   * @memberOf R
   * @since v0.19.0
   * @category Relation
   * @sig ((a, a) -> Boolean) -> [a] -> [a] -> [a]
   * @param {Function} pred A predicate used to test whether two items are equal.
   * @param {Array} list1 The first list.
   * @param {Array} list2 The second list.
   * @return {Array} The elements in `list1` or `list2`, but not both.
   * @see R.symmetricDifference, R.difference, R.differenceWith
   * @example
   *
   *      const eqA = R.eqBy(R.prop('a'));
   *      const l1 = [{a: 1}, {a: 2}, {a: 3}, {a: 4}];
   *      const l2 = [{a: 3}, {a: 4}, {a: 5}, {a: 6}];
   *      R.symmetricDifferenceWith(eqA, l1, l2); //=> [{a: 1}, {a: 2}, {a: 5}, {a: 6}]
   */
  var symmetricDifferenceWith = _curry3(function symmetricDifferenceWith(
    pred,
    list1,
    list2
  ) {
    return concat(
      differenceWith(pred, list1, list2),
      differenceWith(pred, list2, list1)
    )
  })

  /**
   * Returns a new list containing the last `n` elements of a given list, passing
   * each value to the supplied predicate function, and terminating when the
   * predicate function returns `false`. Excludes the element that caused the
   * predicate function to fail. The predicate function is passed one argument:
   * *(value)*.
   *
   * @func
   * @memberOf R
   * @since v0.16.0
   * @category List
   * @sig (a -> Boolean) -> [a] -> [a]
   * @sig (a -> Boolean) -> String -> String
   * @param {Function} fn The function called per iteration.
   * @param {Array} xs The collection to iterate over.
   * @return {Array} A new array.
   * @see R.dropLastWhile, R.addIndex
   * @example
   *
   *      const isNotOne = x => x !== 1;
   *
   *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
   *
   *      R.takeLastWhile(x => x !== 'R' , 'Ramda'); //=> 'amda'
   */
  var takeLastWhile = _curry2(function takeLastWhile(fn, xs) {
    var idx = xs.length - 1
    while (idx >= 0 && fn(xs[idx])) {
      idx -= 1
    }
    return slice(idx + 1, Infinity, xs)
  })

  function XTakeWhile(f, xf) {
    this.xf = xf
    this.f = f
  }
  XTakeWhile.prototype['@@transducer/init'] = _xfBase.init
  XTakeWhile.prototype['@@transducer/result'] = _xfBase.result
  XTakeWhile.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input)
      ? this.xf['@@transducer/step'](result, input)
      : _reduced(result)
  }

  var _xtakeWhile = _curry2(function _xtakeWhile(f, xf) {
    return new XTakeWhile(f, xf)
  })

  /**
   * Returns a new list containing the first `n` elements of a given list,
   * passing each value to the supplied predicate function, and terminating when
   * the predicate function returns `false`. Excludes the element that caused the
   * predicate function to fail. The predicate function is passed one argument:
   * *(value)*.
   *
   * Dispatches to the `takeWhile` method of the second argument, if present.
   *
   * Acts as a transducer if a transformer is given in list position.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category List
   * @sig (a -> Boolean) -> [a] -> [a]
   * @sig (a -> Boolean) -> String -> String
   * @param {Function} fn The function called per iteration.
   * @param {Array} xs The collection to iterate over.
   * @return {Array} A new array.
   * @see R.dropWhile, R.transduce, R.addIndex
   * @example
   *
   *      const isNotFour = x => x !== 4;
   *
   *      R.takeWhile(isNotFour, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3]
   *
   *      R.takeWhile(x => x !== 'd' , 'Ramda'); //=> 'Ram'
   */
  var takeWhile = _curry2(
    _dispatchable(['takeWhile'], _xtakeWhile, function takeWhile(fn, xs) {
      var idx = 0
      var len = xs.length
      while (idx < len && fn(xs[idx])) {
        idx += 1
      }
      return slice(0, idx, xs)
    })
  )

  function XTap(f, xf) {
    this.xf = xf
    this.f = f
  }
  XTap.prototype['@@transducer/init'] = _xfBase.init
  XTap.prototype['@@transducer/result'] = _xfBase.result
  XTap.prototype['@@transducer/step'] = function (result, input) {
    this.f(input)
    return this.xf['@@transducer/step'](result, input)
  }

  var _xtap = _curry2(function _xtap(f, xf) {
    return new XTap(f, xf)
  })

  /**
   * Runs the given function with the supplied object, then returns the object.
   *
   * Acts as a transducer if a transformer is given as second parameter.
   *
   * @func
   * @memberOf R
   * @since v0.1.0
   * @category Function
   * @sig (a -> *) -> a -> a
   * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
   * @param {*} x
   * @return {*} `x`.
   * @example
   *
   *      const sayX = x => console.log('x is ' + x);
   *      R.tap(sayX, 100); //=> 100
   *      // logs 'x is 100'
   * @symb R.tap(f, a) = a
   */
  var tap = _curry2(
    _dispatchable([], _xtap, function tap(fn, x) {
      fn(x)
      return x
    })
  )

  function _isRegExp(x) {
    return Object.prototype.toString.call(x) === '[object RegExp]'
  }

  /**
   * Determines whether a given string matches a given regular expression.
   *
   * @func
   * @memberOf R
   * @since v0.12.0
   * @category String
   * @sig RegExp -> String -> Boolean
   * @param {RegExp} pattern
   * @param {String} str
   * @return {Boolean}
   * @see R.match
   * @example
   *
   *      R.test(/^x/, 'xyz'); //=> true
   *      R.test(/^y/, 'xyz'); //=> false
   */
  var test = _curry2(function test(pattern, str) {
    if (!_isRegExp(pattern)) {
      throw new TypeError(
        '‘test’ requires a value of type RegExp as its first argument; received ' +
          toString$1(pattern)
      )
    }
    return _cloneRegExp(pattern).test(str)
  })

  /**
   * Returns the result of applying the onSuccess function to the value inside
   * a successfully resolved promise. This is useful for working with promises
   * inside function compositions.
   *
   * @func
   * @memberOf R
   * @since v0.27.0
   * @category Function
   * @sig (a -> b) -> (Promise e a) -> (Promise e b)
   * @sig (a -> (Promise e b)) -> (Promise e a) -> (Promise e b)
   * @param {Function} onSuccess The function to apply. Can return a value or a promise of a value.
   * @param {Promise} p
   * @return {Promise} The result of calling `p.then(onSuccess)`
   * @see R.otherwise
   * @example
   *
   *      var makeQuery = (email) => ({ query: { email }});
   *
   *      //getMemberName :: String -> Promise ({firstName, lastName})
   *      var getMemberName = R.pipe(
   *        makeQuery,
   *        fetchMember,
   *        R.andThen(R.pick(['firstName', 'lastName']))
   *      );
   */
  var andThen = _curry2(function andThen(f, p) {
    _assertPromise('andThen', p)

    return p.then(f)
  })

  /**
   * The lower case version of a string.
   *
   * @func
   * @memberOf R
   * @since v0.9.0
   * @category String
   * @sig String -> String
   * @param {String} str The string to lower case.
   * @return {String} The lower case version of `str`.
   * @see R.toUpper
   * @example
   *
   *      R.toLower('XYZ'); //=> 'xyz'
   */
  var toLower = invoker(0, 'toLowerCase')

  /**
   * Converts an object into an array of key, value arrays. Only the object's
   * own properties are used.
   * Note that the order of the output array is not guaranteed to be consistent
   * across different JS platforms.
   *
   * @func
   * @memberOf R
   * @since v0.4.0
   * @category Object
   * @sig {String: *} -> [[String,*]]
   * @param {Object} obj The object to extract from
   * @return {Array} An array of key, value arrays from the object's own properties.
   * @see R.fromPairs
   * @example
   *
   *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
   */
  var toPairs = _curry1(function toPairs(obj) {
    var pairs = []
    for (var prop in obj) {
      if (_has(prop, obj)) {
        pairs[pairs.length] = [prop, obj[prop]]
      }
    }
    return pairs
  })

  /**
   * Converts an object into an array of key, value arrays. The object's own
   * properties and prototype properties are used. Note that the order of the
   * output array is not guaranteed to be consistent across different JS
   * platforms.
   *
   * @func
   * @memberOf R
   * @since v0.4.0
   * @category Object
   * @sig {String: *} -> [[String,*]]
   * @param {Object} obj The object to extract from
   * @return {Array} An array of key, value arrays from the object's own
   *         and prototype properties.
   * @example
   *
   *      const F = function() { this.x = 'X'; };
   *      F.prototype.y = 'Y';
   *      const f = new F();
   *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
   */
  var toPairsIn = _curry1(function toPairsIn(obj) {
    var pairs = []
    for (var prop in obj) {
      pairs[pairs.length] = [prop, obj[prop]]
    }
    return pairs
  })

  /**
   * The upper case version of a string.
   *
   * @func
   * @memberOf R
   * @since v0.9.0
   * @category String
   * @sig String -> String
   * @param {String} str The string to upper case.
   * @return {String} The upper case version of `str`.
   * @see R.toLower
   * @example
   *
   *      R.toUpper('abc'); //=> 'ABC'
   */
  var toUpper = invoker(0, 'toUpperCase')

  /**
   * Initializes a transducer using supplied iterator function. Returns a single
   * item by iterating through the list, successively calling the transformed
   * iterator function and passing it an accumulator value and the current value
   * from the array, and then passing the result to the next call.
   *
   * The iterator function receives two values: *(acc, value)*. It will be
   * wrapped as a transformer to initialize the transducer. A transformer can be
   * passed directly in place of an iterator function. In both cases, iteration
   * may be stopped early with the [`R.reduced`](#reduced) function.
   *
   * A transducer is a function that accepts a transformer and returns a
   * transformer and can be composed directly.
   *
   * A transformer is an an object that provides a 2-arity reducing iterator
   * function, step, 0-arity initial value function, init, and 1-arity result
   * extraction function, result. The step function is used as the iterator
   * function in reduce. The result function is used to convert the final
   * accumulator into the return type and in most cases is
   * [`R.identity`](#identity). The init function can be used to provide an
   * initial accumulator, but is ignored by transduce.
   *
   * The iteration is performed with [`R.reduce`](#reduce) after initializing the transducer.
   *
   * @func
   * @memberOf R
   * @since v0.12.0
   * @category List
   * @sig (c -> c) -> ((a, b) -> a) -> a -> [b] -> a
   * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
   * @param {Function} fn The iterator function. Receives two values, the accumulator and the
   *        current element from the array. Wrapped as transformer, if necessary, and used to
   *        initialize the transducer
   * @param {*} acc The initial accumulator value.
   * @param {Array} list The list to iterate over.
   * @return {*} The final, accumulated value.
   * @see R.reduce, R.reduced, R.into
   * @example
   *
   *      const numbers = [1, 2, 3, 4];
   *      const transducer = R.compose(R.map(R.add(1)), R.take(2));
   *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
   *
   *      const isOdd = (x) => x % 2 === 1;
   *      const firstOddTransducer = R.compose(R.filter(isOdd), R.take(1));
   *      R.transduce(firstOddTransducer, R.flip(R.append), [], R.range(0, 100)); //=> [1]
   */
  var transduce = curryN(4, function transduce(xf, fn, acc, list) {
    return _reduce(xf(typeof fn === 'function' ? _xwrap(fn) : fn), acc, list)
  })

  /**
   * Transposes the rows and columns of a 2D list.
   * When passed a list of `n` lists of length `x`,
   * returns a list of `x` lists of length `n`.
   *
   *
   * @func
   * @memberOf R
   * @since v0.19.0
   * @category List
   * @sig [[a]] -> [[a]]
   * @param {Array} list A 2D list
   * @return {Array} A 2D list
   * @example
   *
   *      R.transpose([[1, 'a'], [2, 'b'], [3, 'c']]) //=> [[1, 2, 3], ['a', 'b', 'c']]
   *      R.transpose([[1, 2, 3], ['a', 'b', 'c']]) //=> [[1, 'a'], [2, 'b'], [3, 'c']]
   *
   *      // If some of the rows are shorter than the following rows, their elements are skipped:
   *      R.transpose([[10, 11], [20], [], [30, 31, 32]]) //=> [[10, 20, 30], [11, 31], [32]]
   * @symb R.transpose([[a], [b], [c]]) = [a, b, c]
   * @symb R.transpose([[a, b], [c, d]]) = [[a, c], [b, d]]
   * @symb R.transpose([[a, b], [c]]) = [[a, c], [b]]
   */
  var transpose = _curry1(function transpose(outerlist) {
    var i = 0
    var result = []
    while (i < outerlist.length) {
      var innerlist = outerlist[i]
      var j = 0
      while (j < innerlist.length) {
        if (typeof result[j] === 'undefined') {
          result[j] = []
        }
        result[j].push(innerlist[j])
        j += 1
      }
      i += 1
    }
    return result
  })

  /**
   * Creates a thunk out of a function. A thunk delays a calculation until
   * its result is needed, providing lazy evaluation of arguments.
   *
   * @func
   * @memberOf R
   * @since v0.26.0
   * @category Function
   * @sig ((a, b, ..., j) -> k) -> (a, b, ..., j) -> (() -> k)
   * @param {Function} fn A function to wrap in a thunk
   * @return {Function} Expects arguments for `fn` and returns a new function
   *  that, when called, applies those arguments to `fn`.
   * @see R.partial, R.partialRight
   * @example
   *
   *      R.thunkify(R.identity)(42)(); //=> 42
   *      R.thunkify((a, b) => a + b)(25, 17)(); //=> 42
   */
  var thunkify = _curry1(function thunkify(fn) {
    return curryN(fn.length, function createThunk() {
      var fnArgs = arguments
      return function invokeThunk() {
        return fn.apply(this, fnArgs)
      }
    })
  })

  exports.F = F
  exports.T = T
  exports.__ = __
  exports.add = add
  exports.addIndex = addIndex
  exports.adjust = adjust
  exports.all = all
  exports.allPass = allPass
  exports.always = always
  exports.and = and
  exports.any = any
  exports.anyPass = anyPass
  exports.ap = ap
  exports.aperture = aperture
  exports.append = append
  exports.apply = apply
  exports.applySpec = applySpec
  exports.applyTo = applyTo
  exports.ascend = ascend
  exports.assoc = assoc
  exports.assocPath = assocPath
  exports.binary = binary
  exports.bind = bind
  exports.both = both
  exports.call = call
  exports.chain = chain
  exports.clamp = clamp
  exports.clone = clone
  exports.comparator = comparator
  exports.complement = complement
  exports.compose = compose
  exports.composeK = composeK
  exports.composeP = composeP
  exports.composeWith = composeWith
  exports.concat = concat
  exports.cond = cond
  exports.construct = construct
  exports.constructN = constructN
  exports.contains = contains$1
  exports.converge = converge
  exports.countBy = countBy
  exports.curry = curry
  exports.curryN = curryN
  exports.dec = dec
  exports.defaultTo = defaultTo
  exports.descend = descend
  exports.difference = difference
  exports.differenceWith = differenceWith
  exports.dissoc = dissoc
  exports.dissocPath = dissocPath
  exports.divide = divide
  exports.drop = drop
  exports.dropLast = dropLast$1
  exports.dropLastWhile = dropLastWhile$1
  exports.dropRepeats = dropRepeats
  exports.dropRepeatsWith = dropRepeatsWith
  exports.dropWhile = dropWhile
  exports.either = either
  exports.empty = empty
  exports.endsWith = endsWith
  exports.eqBy = eqBy
  exports.eqProps = eqProps
  exports.equals = equals
  exports.evolve = evolve
  exports.filter = filter
  exports.find = find
  exports.findIndex = findIndex
  exports.findLast = findLast
  exports.findLastIndex = findLastIndex
  exports.flatten = flatten
  exports.flip = flip
  exports.forEach = forEach
  exports.forEachObjIndexed = forEachObjIndexed
  exports.fromPairs = fromPairs
  exports.groupBy = groupBy
  exports.groupWith = groupWith
  exports.gt = gt
  exports.gte = gte
  exports.has = has
  exports.hasIn = hasIn
  exports.hasPath = hasPath
  exports.head = head
  exports.identical = identical
  exports.identity = identity
  exports.ifElse = ifElse
  exports.inc = inc
  exports.includes = includes
  exports.indexBy = indexBy
  exports.indexOf = indexOf
  exports.init = init
  exports.innerJoin = innerJoin
  exports.insert = insert
  exports.insertAll = insertAll
  exports.intersection = intersection
  exports.intersperse = intersperse
  exports.into = into
  exports.invert = invert
  exports.invertObj = invertObj
  exports.invoker = invoker
  exports.is = is
  exports.isEmpty = isEmpty
  exports.isNil = isNil
  exports.join = join
  exports.juxt = juxt
  exports.keys = keys
  exports.keysIn = keysIn
  exports.last = last
  exports.lastIndexOf = lastIndexOf
  exports.length = length
  exports.lens = lens
  exports.lensIndex = lensIndex
  exports.lensPath = lensPath
  exports.lensProp = lensProp
  exports.lift = lift
  exports.liftN = liftN
  exports.lt = lt
  exports.lte = lte
  exports.map = map
  exports.mapAccum = mapAccum
  exports.mapAccumRight = mapAccumRight
  exports.mapObjIndexed = mapObjIndexed
  exports.match = match
  exports.mathMod = mathMod
  exports.max = max
  exports.maxBy = maxBy
  exports.mean = mean
  exports.median = median
  exports.memoizeWith = memoizeWith
  exports.merge = merge
  exports.mergeAll = mergeAll
  exports.mergeDeepLeft = mergeDeepLeft
  exports.mergeDeepRight = mergeDeepRight
  exports.mergeDeepWith = mergeDeepWith
  exports.mergeDeepWithKey = mergeDeepWithKey
  exports.mergeLeft = mergeLeft
  exports.mergeRight = mergeRight
  exports.mergeWith = mergeWith
  exports.mergeWithKey = mergeWithKey
  exports.min = min
  exports.minBy = minBy
  exports.modulo = modulo
  exports.move = move
  exports.multiply = multiply
  exports.nAry = nAry
  exports.negate = negate
  exports.none = none
  exports.not = not
  exports.nth = nth
  exports.nthArg = nthArg
  exports.o = o
  exports.objOf = objOf
  exports.of = of
  exports.omit = omit
  exports.once = once
  exports.or = or
  exports.otherwise = otherwise
  exports.over = over
  exports.pair = pair
  exports.partial = partial
  exports.partialRight = partialRight
  exports.partition = partition
  exports.path = path
  exports.paths = paths
  exports.pathEq = pathEq
  exports.pathOr = pathOr
  exports.pathSatisfies = pathSatisfies
  exports.pick = pick
  exports.pickAll = pickAll
  exports.pickBy = pickBy
  exports.pipe = pipe
  exports.pipeK = pipeK
  exports.pipeP = pipeP
  exports.pipeWith = pipeWith
  exports.pluck = pluck
  exports.prepend = prepend
  exports.product = product
  exports.project = project
  exports.prop = prop
  exports.propEq = propEq
  exports.propIs = propIs
  exports.propOr = propOr
  exports.propSatisfies = propSatisfies
  exports.props = props
  exports.range = range
  exports.reduce = reduce
  exports.reduceBy = reduceBy
  exports.reduceRight = reduceRight
  exports.reduceWhile = reduceWhile
  exports.reduced = reduced
  exports.reject = reject
  exports.remove = remove
  exports.repeat = repeat
  exports.replace = replace
  exports.reverse = reverse
  exports.scan = scan
  exports.sequence = sequence
  exports.set = set
  exports.slice = slice
  exports.sort = sort
  exports.sortBy = sortBy
  exports.sortWith = sortWith
  exports.split = split
  exports.splitAt = splitAt
  exports.splitEvery = splitEvery
  exports.splitWhen = splitWhen
  exports.startsWith = startsWith
  exports.subtract = subtract
  exports.sum = sum
  exports.symmetricDifference = symmetricDifference
  exports.symmetricDifferenceWith = symmetricDifferenceWith
  exports.tail = tail
  exports.take = take
  exports.takeLast = takeLast
  exports.takeLastWhile = takeLastWhile
  exports.takeWhile = takeWhile
  exports.tap = tap
  exports.test = test
  exports.andThen = andThen
  exports.times = times
  exports.toLower = toLower
  exports.toPairs = toPairs
  exports.toPairsIn = toPairsIn
  exports.toString = toString$1
  exports.toUpper = toUpper
  exports.transduce = transduce
  exports.transpose = transpose
  exports.traverse = traverse
  exports.trim = trim
  exports.tryCatch = tryCatch
  exports.type = type
  exports.unapply = unapply
  exports.unary = unary
  exports.uncurryN = uncurryN
  exports.unfold = unfold
  exports.union = union
  exports.unionWith = unionWith
  exports.uniq = uniq
  exports.uniqBy = uniqBy
  exports.uniqWith = uniqWith
  exports.unless = unless
  exports.unnest = unnest
  exports.until = until
  exports.update = update
  exports.useWith = useWith
  exports.values = values
  exports.valuesIn = valuesIn
  exports.view = view
  exports.when = when
  exports.where = where
  exports.whereEq = whereEq
  exports.without = without
  exports.xor = xor
  exports.xprod = xprod
  exports.zip = zip
  exports.zipObj = zipObj
  exports.zipWith = zipWith
  exports.thunkify = thunkify

  Object.defineProperty(exports, '__esModule', { value: true })
})
