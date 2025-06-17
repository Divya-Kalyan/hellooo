// Get pantry items from localStorage
export const getPantryItems = () => {
  try {
    const items = localStorage.getItem('pantryItems');
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('Error getting pantry items:', error);
    return [];
  }
};

// Add item to pantry
export const addPantryItem = (item) => {
  try {
    const items = getPantryItems();
    const newItem = {
      id: Date.now(),
      name: item,
      dateAdded: new Date().toISOString()
    };
    const updatedItems = [...items, newItem];
    localStorage.setItem('pantryItems', JSON.stringify(updatedItems));
    return updatedItems;
  } catch (error) {
    console.error('Error adding pantry item:', error);
    throw new Error('Failed to add item to pantry');
  }
};

// Remove item from pantry
export const removePantryItem = (itemId) => {
  try {
    const items = getPantryItems();
    const updatedItems = items.filter(item => item.id !== itemId);
    localStorage.setItem('pantryItems', JSON.stringify(updatedItems));
    return updatedItems;
  } catch (error) {
    console.error('Error removing pantry item:', error);
    throw new Error('Failed to remove item from pantry');
  }
};

// Update pantry item
export const updatePantryItem = (itemId, updatedItem) => {
  try {
    const items = getPantryItems();
    const updatedItems = items.map(item => 
      item.id === itemId ? { ...item, ...updatedItem } : item
    );
    localStorage.setItem('pantryItems', JSON.stringify(updatedItems));
    return updatedItems;
  } catch (error) {
    console.error('Error updating pantry item:', error);
    throw new Error('Failed to update pantry item');
  }
}; 