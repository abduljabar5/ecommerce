import { openDB } from 'idb';

async function setupDB() {
  const db = await openDB('myDatabase', 1, {
    upgrade(db) {
      db.createObjectStore('cart', { keyPath: '_id' });
    },
  });
  return db;
}

export async function addToCart(item) {
    console.log('running');
  const db = await setupDB();
  const tx = db.transaction('cart', 'readwrite');
  const store = tx.objectStore('cart');
  await store.add(item);
  return tx.done;
}

export async function getCartItems() {
  const db = await setupDB();
  return db.getAll('cart');
}