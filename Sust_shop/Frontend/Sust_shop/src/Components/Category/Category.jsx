import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // your axios instance
import { useSelector } from 'react-redux';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [editedName, setEditedName] = useState('');

  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === 'admin';

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/v1/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!newCategory.trim()) return;

    try {
      const response = await api.post('/api/v1/categories/', { name: newCategory });
      setCategories([...categories, response.data]);
      setNewCategory('');
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/v1/categories/${id}/`);
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleUpdate = async () => {
    if (!editedName.trim() || !editingCategory) return;

    try {
      const response = await api.put(`/api/v1/categories/${editingCategory.id}/`, {
        name: editedName,
      });
      setCategories(categories.map((cat) =>
        cat.id === editingCategory.id ? response.data : cat
      ));
      setEditingCategory(null);
      setEditedName('');
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>

      {isAdmin && (
        <div className="mb-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="border px-2 py-1 mr-2"
          />
          <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-1 rounded">
            Create
          </button>
        </div>
      )}

      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id} className="flex justify-between items-center border-b pb-1">
            {editingCategory?.id === category.id ? (
              <>
                <input
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="border px-2 py-1 mr-2"
                />
                <button onClick={handleUpdate} className="bg-green-500 text-white px-2 py-1 mr-1 rounded">
                  Save
                </button>
                <button onClick={() => setEditingCategory(null)} className="text-gray-500">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{category.name}</span>
                {isAdmin && (
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        setEditingCategory(category);
                        setEditedName(category.name);
                      }}
                      className="bg-yellow-400 px-2 py-1 rounded text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="bg-red-500 px-2 py-1 rounded text-white"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
