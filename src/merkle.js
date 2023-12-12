import crypto from "crypto";
const sha256 = (data) => {
  return crypto.createHash("sha256").update(data).digest();
};

const createMerkleTree = (leaves = []) => {
  let layers = [leaves];
  const iterate = (layer) => {
    if (layer.length === 1) return;
    let newLayer = [];
    for (let i = 0; i < layer.length; i += 2) {
      const hash1 = layer[i];
      const hash2 = layer[i + 1] ? layer[i + 1] : hash1;
      const combined = Buffer.concat([hash1, hash2]);
      newLayer.push(sha256(combined));
    }
    layers.push(newLayer);
    iterate(newLayer);
  };
  iterate(layers[0]);
  return layers;
};

const addLeaf = (tree, leaf) => {
  const newLeaves = Array.from(tree[0]);
  newLeaves.push(leaf);
  return createMerkleTree(newLeaves);
};

const generateProof = (tree, leaf) => {
  console.log({ tree, leaf });
  let path = [];
  let idx = tree[0].indexOf(leaf);

  if (idx === -1) return null;

  for (let i = 0; i < tree.length - 1; i++) {
    let isRightNode = idx % 2;
    idx = Math.floor(idx / 2);
    console.log({ idx });
    path.push(tree[i + 1][idx + isRightNode ? -1 : 1]);
  }
  return path;
};

const getLength = ({ length }) => length;
const verifyProof = (leaf, proof, root) => {
  console.log({ leaf, proof, root });
  let hash = leaf;
  console.log({ hash, length: getLength(proof), l2: getLength([1, 2, 3, 4]) });
  for (let i = 0; i <= proof.length; i++) {
    let node = proof[i];
    hash = sha256(Buffer.concat([hash, node]));
  }
  return Buffer.compare(hash, root) === 0;
};

/*
Example Usage:

const {createMerkleTree, addLeaf} = require('./merkle');

// Creating a merkle tree
*/


export {
  createMerkleTree,
  sha256, 
  verifyProof,
  generateProof,
  addLeaf
}