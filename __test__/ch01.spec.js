const cab = "cab", acb = "acb", abc = "abc", cba = "cba", bca = "bca", bac = "bac"
const Ω = { cab, acb, abc, cba, bca, bac }
const n = Object.values(Ω).length
const ϕ = 0
const outcomeSpace = 1
const threeCards = Object.values(Ω)
it(`shuffling three cards labeled a, b, and c. Then the space of all possible outcomes is`, () => {
    const a = 'a', b = 'b', c = 'c', arr = []
    const group = [a, b], groupReverse = [...group].reverse()
    arr.push([c, ...group], group.slice(0, 1).concat([c]).concat(group.slice(1)), [...group, c])
    arr.push([c, ...groupReverse], groupReverse.slice(0, 1).concat([c]).concat(groupReverse.slice(1)), [...groupReverse, c])
    const outcomes = arr.map(item => item.join(''))
    expect(outcomes.length).toBe(n)
    expect(outcomes).toEqual(threeCards)
});
describe(`Random Permutations`, () => {
    it(`a appears first`, () => {
        const startWithA = threeCards.filter(item => item.startsWith('a'))
        expect(startWithA).toEqual(["acb", "abc"])
        expect(startWithA.length / threeCards.length).toBe(1 / 3)
    });
    it(`b  and c are not next to each other`, () => {
        const BFarFromC = threeCards.filter(item => !(item.includes('bc') || item.includes('cb')))
        expect(BFarFromC).toEqual(["cab", "bac"])
        expect(BFarFromC.length / threeCards.length).toBe(1 / 3)
    });
    it(`the letters are in alphabetical order`, () => {
        const alphabetical = threeCards.filter(item => {
            return item === item.split('').sort().join('')
        })
        expect(alphabetical).toEqual(["abc"])
        expect(alphabetical.length / threeCards.length).toBe(1 / n)
    });
    it(`a  appears first, b next, but c isn't third`, () => {
        const abNotFollowC = threeCards.filter(item => item.startsWith('ab') && !item.endsWith('c'))
        expect(abNotFollowC).toEqual([])
        expect(abNotFollowC.length / threeCards.length).toBe(0 / n).toBe(ϕ)
    });
    it(`c is either first, second, or third`, () => {
        const cIncluded = threeCards.filter(item => item.includes('c'))
        expect(cIncluded).toEqual(threeCards)
        expect(cIncluded.length / threeCards.length).toBe(n / n).toBe(outcomeSpace)
    });
    it(`the letters form a word that means "taxi"`, () => {
        const word = { cab: 'taxi' }
        const taxi = threeCards.filter(item => word[item] === 'taxi')
        expect(taxi).toEqual(["cab"])
        expect(taxi.length / threeCards.length).toBe(1 / n)
    });
});
describe(`Random Number Generator`, () => {
    let P = 0
    it(`(i) What is the probability that the pair consists of two different digits?`, () => {
        const natural = Array.from(Array(10).keys())
        const firstP = natural.length
        const secondP = natural.length
        const total = firstP * secondP
        const secondPDiff = natural.length - 1
        const totalDiff = firstP * secondPDiff
        P = totalDiff / total;
        expect(P).toBe(90 / 100).toBe(0.9)
    })
    it(`(ii) What is the chance that the two digits are the same?`, () => {
        const sameDigits = outcomeSpace - P
        expect(+sameDigits.toFixed(1)).toBe(0.1)
    });
});