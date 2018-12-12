it(`shuffling three cards labeled a, b, and c. Then the space of all possible outcomes is`, () => {
    const a = 'a', b = 'b', c = 'c', arr = []
    const group = [a, b], groupReverse = [...group].reverse()
    arr.push([c, ...group], group.slice(0, 1).concat([c]).concat(group.slice(1)), [...group, c])
    arr.push([c, ...groupReverse], groupReverse.slice(0, 1).concat([c]).concat(groupReverse.slice(1)), [...groupReverse, c])
    const outcomes = arr.map(item => item.join(''))
    expect(outcomes.length).toBe(6)
    expect(outcomes).toEqual(["cab", "acb", "abc", "cba", "bca", "bac"])
});