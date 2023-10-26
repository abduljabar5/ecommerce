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
export async function clearCartItems() {
  const db = await setupDB();
  return db.clear('cart');
}
export async function deleteFromCart(itemId) {
  const db = await setupDB();
  const tx = db.transaction('cart', 'readwrite');
  const store = tx.objectStore('cart');
  await store.delete(itemId);
  return tx.done;
}
export async function updateCartItem(updatedProperties) {
  try {
    const db = await setupDB();
    const tx = db.transaction('cart', 'readwrite');
    const store = tx.objectStore('cart');

    // Retrieve the existing item
    const existingItem = await store.get(updatedProperties._id);

    // Merge existing item with updated properties
    const newItem = { ...existingItem, ...updatedProperties };

    // Save merged item back to IndexedDB
    await store.put(newItem);

    return tx.done;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error; // Re-throwing error to potentially handle it upstream
  }
}


 