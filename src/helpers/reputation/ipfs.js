import { getChluIPFS, types } from 'helpers/ipfs'

const gatewayUrl = 'https://ipfs.io/ipfs/'

export const viewerUrl = gatewayUrl + 'Qmb1wmJes6m1koDcbNevbUzMJKeUJfgTLhCsB6zTgnNftu'

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

export async function openDB() {
  if (window.reputationDb) return window.reputationDb
  const chluIpfs = await getChluIPFS()
  const orbitDb = chluIpfs.instance.orbitDb.orbitDb
  window.reputationDb = await orbitDb.kvstore('chlu-reputation-experimental-2', {
    write: ['*']
  })
  await window.reputationDb.load()
  return window.reputationDb
}

// store reputation using full IPFS node
export async function storeReputation(didDocument, reviews) {
    const chluIpfs = await getChluIPFS()
    // ChluIPFS does not have DID/Reputation code implemented yet so we go manual
    const db = await openDB()
    const ipfs = chluIpfs.instance.ipfs
    console.log('Saving DID document for DID', didDocument.id)
    const dagNode = await ipfs.object.put(Buffer.from(JSON.stringify(didDocument)))
    const didMultihash = dagNode.toJSON().multihash
    const existingDid = await db.get(didDocument.id)
    if (existingDid === didMultihash) {
      console.log('DID document for DID', didDocument.id, 'was already there', didMultihash)
    } else {
      await db.set(didDocument.id, didMultihash)
      console.log('Saved DID document for DID', didDocument.id, didMultihash)
    }
    console.log('Saving Reputation (' + reviews.length + ' reviews) for DID', didDocument.id)
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

export async function readReputation(didId) {
    const chluIpfs = await getChluIPFS(types.customer)
    // ChluIPFS does not have DID/Reputation code implemented yet so we go manual
    const db = await openDB()
    const ipfs = chluIpfs.instance.ipfs
    const didDocumentMultihash = await db.get(didId)
    if (!didDocumentMultihash) throw new Error('DID not found')
    const reputationMultihash = await db.get(didDocumentMultihash)
    if (!reputationMultihash) throw new Error('Reputation not found')
    const reputationDagNode = await ipfs.object.get(reputationMultihash)
    try {
      const stringReputation = reputationDagNode.data.toString('utf-8')
      return JSON.parse(stringReputation)
    } catch (error) {
      console.log(error)
      throw new Error('Could not parse Reputation at ' + reputationMultihash)
    }
}