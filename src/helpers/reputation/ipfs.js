import { getChluIPFS } from 'helpers/ipfs'

// Uses did.chlu.io (chlu-reputation-service-node) to do the heavy lifting
export function storeReputationThroughDIDService(did, reviews) {
  return new Promise(function (resolve, reject) {
    console.log('storeReputation', did, reviews);
    //var url = 'http://localhost:3001/reputation';
    var url = 'https://did.chlu.io/service/reputation';
    var req = {
      didDocument: did,
      reviews: reviews
    };
    // https://stackoverflow.com/questions/39519246/make-xmlhttprequest-post-using-json#39519299
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onreadystatechange = function () {
      if(xmlhttp.readyState === 4) {
        if (xmlhttp.status === 200) {
          console.log('XMLHTTPREQUEST OK');
          resolve({ did: req.didDocument });
        } else {
          console.log('XMLHTTPREQUEST FAILED', xmlhttp.status);
          reject(xmlhttp.responseText);
        }
      }
    };
    xmlhttp.send(JSON.stringify(req));
  });
}

// store reputation using full IPFS node
export async function storeReputation(didDocument, reviews) {
    const chluIpfs = await getChluIPFS()
    // ChluIPFS does not have DID/Reputation code implemented yet so we go manual
    const ipfs = chluIpfs.instance.ipfs
    const orbitDb = chluIpfs.instance.orbitDb.orbitDb
    const db = await orbitDb.kvstore('chlu-reputation-experimental-2')
    console.log('Saving Reputation (' + reviews.length + ' reviews) for DID', didDocument.id)
    const dagNode = await ipfs.object.put(Buffer.from(JSON.stringify(didDocument)))
    const didMultihash = dagNode.toJSON().multihash
    const reputation = {
        reviews,
        did: { '/': didMultihash }
    }
    const reputationDagNode = await ipfs.object.put(Buffer.from(JSON.stringify(reputation)))
    const reputationMultihash = reputationDagNode.toJSON().multihash
    const existing = await db.get(didMultihash)
    if (existing === reputationMultihash) {
        console.log('Reputation (' + reviews.length + ' reviews) for DID', didDocument.id, 'was already in the DB')
    } else {
        await db.set(didMultihash, reputationMultihash)
        console.log('Reputation (' + reviews.length + ' reviews) for DID', didDocument.id, 'saved successfully')
    }
}