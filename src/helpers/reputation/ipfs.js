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
  window.reputationDb = await orbitDb.kvstore('chlu-reputation-experimental-3', {
    write: ['*']
  })
  await window.reputationDb.load()
  return window.reputationDb
}

// store reputation using full IPFS node
export async function storeReputation(didId, reviews) {
  const chluIpfs = await getChluIPFS()
  // ChluIPFS does not have DID/Reputation code implemented yet so we go manual
  const db = await openDB()
  const ipfs = chluIpfs.instance.ipfs
  const reputation = { didId, reviews }
  const reputationDagNode = await ipfs.object.put(Buffer.from(JSON.stringify(reputation)))
  const reputationMultihash = reputationDagNode.toJSON().multihash
  const existing = await db.get(didId)
  if (existing === reputationMultihash) {
      console.log('Reputation (' + reviews.length + ' reviews) for DID', didId, 'was already in the DB')
  } else {
      await db.set(didId, reputationMultihash)
      console.log('Reputation (' + reviews.length + ' reviews) for DID', didId, 'saved successfully')
  }
}

export async function readReputation(didId) {
  console.log('Reading reputation for', didId)
  const chluIpfs = await getChluIPFS(types.customer)
  // ChluIPFS does not have DID/Reputation code implemented yet so we go manual
  const db = await openDB()
  const ipfs = chluIpfs.instance.ipfs
  const reputationMultihash = await db.get(didId)
  if (!reputationMultihash) throw new Error('Reputation not found')
  console.log('Reading reputation for', didId, 'found reputation at', reputationMultihash)
  const reputationDagNode = await ipfs.object.get(reputationMultihash)
  try {
    const stringReputation = reputationDagNode.data.toString('utf-8')
    const reputation = JSON.parse(stringReputation)
    console.log('Reading reputation for', didId, 'found reputation', reputation)
    return reputation
  } catch (error) {
    console.log(error)
    throw new Error('Could not parse Reputation at ' + reputationMultihash)
  }
}