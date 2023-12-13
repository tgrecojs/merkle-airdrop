import test from 'ava';
import {generateProof,verifyProof,createMerkleTree, addLeaf} from '../src/merkle.js'
const makeBuffer = x => Buffer.from([x]);
const testInputs = ['tom', 'nicole', 'josh', 'fran', 'tyler'];
const trace = label => value => {
    console.log(label, ':::', value)
    return value
}

test('Buffer utils',  t =>  {
    const testObjects = testInputs.map(x => ({key: x, value: Buffer.from(x)}))
    t.deepEqual(testObjects, testObjects.map(x => ({...x, unserialized: x.value.toString('utf8')})))
})
test('merkle tree:: first one', t => {
    // Creating a merkle tree of usernames.
const usernames = [Buffer.from(["Bob"]), Buffer.from(["Alice"])].map(trace('alice andbob'));
const testHashes = testInputs.map(x => Buffer.from([x])).map(trace('tracing'))
t.is(testHashes, usernames)
let tree = createMerkleTree(testHashes)

// Adding a new user to the tree.
const newUser = Buffer.from("Charlie");
t.deepEqual(tree.length, 4)
tree = addLeaf(tree, newUser);
tree = addLeaf(tree, makeBuffer(['ba', 'toot', 'hils']));

console.log({length: tree.length,tree})

// Generating an inclusion proof for the new user.
const proof = generateProof(tree, newUser);

const length = ({length}) => length;
// Verifying the proof.
    t.deepEqual(4, tree.length, 'tree should have the correct length')


});
