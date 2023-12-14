import crypto  from 'crypto';
const toString = x => String(x);
const addresses = 
["0x77485F4Df482fC2abe4C787AF523b260f740C1FF",
"0xF12d911576bbC4b55Ba9A12A14E3e9186BEd6528",
"0xA19f91cabAC5cEA3a72216C04d85aeFF3fB17937",
"0x8568B8B239a85Ec08B6A7138ef486d78E0445ab5",
"0x0105B02885F73b242ee57F12FA4a7BE2eefE0d22",
"0x657225e87d88388568AA1145b269D6781fbc5101",
"0x9d3f5026AB7Eb1EAB1765E73899A04C3EFb9c431",
"0xA4945Cd5EFc76013C78b690Ca726167F0a87Eb95",
"0x3357FE2D05f58d7E73ba8D36dc173b231AdFb8Fe",
"0x9f46999129E29dDFa956dD303da0A1C49E4999D8",
"0x645E1E69dDB750251BBDC4fA0F9EdcdF60Ea01dF",
"0x440e31BE4488524c61552a01E02439122A8451Ee",
"0xfEaC0FE5ABee90B171C1B80FE088Ca9040b16F67",
"0xB79d682Ce671D09e13885D88339F27fE849A3aFC",
"0x3C9F87ca1A93A2f99B33B4EBFE962094b1C62e10",
"0xAa1773C762dBD49F3faf141e2a7144807a2398d6",
"0xC7D800Ab0244A25a049F5eE64d4e9f2C8b1BC47f",
"0x8298a14aB7Dbd2861F457Aa3B28F3e41C3f562C0",
"0x58703aA3Cf95538Ee2F6C8A8e440948c4CD4fce9",
"0x1629f2253Cb30074F50655d2f0506730a0Bd1e2e",
"0x929d297389145eC5758703B0dE5F390cca9Bd159",
"0x21C6C8c827E5fF77837665c3D37110B211B431B5",
"0xFB269779AA6244751dae827F14D3B07811DdF857",
"0x07BdE42d13379d7820BFcE061C0A929Fa6C2497B",
"0x7fE54E61E24926eb8F3214Dc5D2894a56F4293de",
"0xaC2Aea21935a832FF1307e636EfecaE0AA238958",
"0x65e428586655EFA413B2D9Bf38503f5Ca158CAce",
"0x6fAda0dB57A8d380a71d6346aEEb034c59b5CA7F",
"0x4Ef170B296789913F297263dC10Bcb4A94430d72",
"0x0DDd459122E1bEFF01482aDAaF3A57FFCF205134",
"0x9002eAb3E32d03c0A118cC1Eac17d2e94469d08E",
"0x4c4975Cdd2D6229626BA59f73b1f15d4cC702192",
"0x1acA2476D7372F6529d34B45389Bc6efcAbD1fA9",
"0x7791e9e5F435E8f0521942E344aceec5F303bD7A",
"0x96AeBB49c170897be4fD75Fd85d2ed96af73eC10",
"0x6F4EF623255F5EE6DbEb3d1e521e6579B6226c91",
"0x4503D86f9eE145D8Ef25eEa30c47295Ca41EcE7a",
"0x85282ec3C86fe5752D5f84D47fF538c7E92b0c38",
"0x39653eBf5D9c5966771a7205A6AB9F0AF6170F63",
"0xb821d5faA43C3fA9887824e4faee03422750254c"];
// .map(toString)
const sha256 = data => crypto.createHash('sha256').update(data, 'utf8').digest();

const createLayers = (leaves = []) => {
  // console.log('leaves::', {leaves})
  const result = leaves.length > 1
    ? [leaves].concat(
        createLayers(
          leaves.reduce((acc, _, i, arr) => {
            // console.log('accumulator:::', { acc })
            if (i % 2 === 0) {
              // console.log('i % 2 === 0 === true :::')

              const hash1 = arr[i];
              const hash2 = arr[i + 1] ? arr[i + 1] : hash1;
              // console.log('------------------------')
              // console.log('@@@ hash1::', hash1)
              // console.log('------------------------')
              // console.log('@@@ hash2::', hash2)
              acc = [...acc, sha256(hash1 + hash2)];
              // console.log('new accumulator::::', acc)
            }
            return acc;
          }, [])
        )
      )
    : [leaves];
        
    return result
}

const createMerkleTree = (leaves) => createLayers(leaves);

const generateProof = (tree, leaf) => {
  let index = tree[0].indexOf(leaf);
  console.log({index})
  return index === -1
    ? null
    : tree.slice(0, -1).map(layer => {
        let isRightNode = index % 2;
        index = Math.floor(index / 2);
        return layer[index + (isRightNode ? -1 : 1)];
      });
};

const verifyProof = (leaf, proof, root) => proof.reduce((hash, node) => sha256(hash + node), leaf).toString() === root[0];

// const tree = createMerkleTree(addresses.map(address =>  Buffer.from(address.slice(2), 'utf8')))

// // Print root of the tree
// console.log(tree[tree.length - 1][0].toString('utf8'));

  
export {
  createMerkleTree,
  generateProof,
  verifyProof
};
