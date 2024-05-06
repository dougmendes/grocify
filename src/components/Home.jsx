import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaPencilAlt, FaTrash, FaPlus } from 'react-icons/fa';
import { auth } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [shoppingLists, setShoppingLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); 
  const [currentListIndex, setCurrentListIndex] = useState(null);
  const [currentList, setCurrentList] = useState(null);
  const [newListName, setNewListName] = useState('');
  const [newListItems, setNewListItems] = useState([{ name: '', quantity: '' }]);
  const [viewListItems, setViewListItems] = useState(null);

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  const handleDelete = (index) => {
    setShoppingLists(current => current.filter((_, i) => i !== index));
  };

  const handleAddList = () => {
    if (modalMode === 'add') {
      setShoppingLists(current => [...current, { name: newListName, items: newListItems }]);
    } else if (modalMode === 'edit' && currentListIndex !== null) {
      const updatedLists = [...shoppingLists];
      updatedLists[currentListIndex] = { name: newListName, items: newListItems };
      setShoppingLists(updatedLists);
    }
    setShowModal(false);
    resetModal();
  };

  const handleAddItem = () => {
    setNewListItems(current => [...current, 
      { 
        name: '', 
        quantity: '' ,
        completed: false,
      }]);
  };

  const updateItem = (index, key, value) => {
    const updatedItems = [...newListItems];
    updatedItems[index][key] = value;
    setNewListItems(updatedItems);
  };

  const handleEdit = (index) => {
    setModalMode('edit');
    setCurrentListIndex(index);
    setNewListName(shoppingLists[index].name);
    setNewListItems([...shoppingLists[index].items]);
    setShowModal(true);
  };

  const resetModal = () => {
    setNewListName('');
    setNewListItems([{ name: '', quantity: '' }]);
    setCurrentListIndex(null);
    setModalMode('add');
  };

  const toggleViewItemModal = (list) => {
    setViewListItems([...list.items]);
    setCurrentList(list);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-black">
      <div className="navbar bg-base-100 justify-between items-center px-4 py-2">
        <a className="btn btn-ghost normal-case text-xl">Grocify</a>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <FaUserCircle size="100%" />
              </div>
            </label>
            <ul tabIndex="0" className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li><a>Profile</a></li>
              <li><a>Settings</a></li>
              <li><a onClick={handleLogout}><FaSignOutAlt className="mr-2"/>Sign out</a></li>
            </ul>
          </div>
          <div className="text-white mx-2">
            {currentUser ? currentUser.displayName || currentUser.email : 'No user logged in'}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-3xl overflow-hidden rounded-lg shadow-lg">
          <table className="w-full text-sm">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">List Name</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shoppingLists.map((list, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="px-6 py-4 cursor-pointer" onClick={() => toggleViewItemModal(list)}>
                    {list.name}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="btn btn-xs btn-warning" onClick={() => handleEdit(index)}>
                      <FaPencilAlt />
                    </button>
                    <button className="btn btn-xs btn-error" onClick={() => handleDelete(index)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="btn btn-circle btn-primary fixed bottom-4 right-4" onClick={() => { setModalMode('add'); setShowModal(true); }}>
        <FaPlus />
      </button>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 md:w-1/2">
            <h3 className="font-bold text-lg">{modalMode === 'add' ? 'Create New Shopping List' : 'Edit Shopping List'}</h3>
            <input
              type="text"
              placeholder="List name"
              className="input input-bordered w-full max-w-xs my-2"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            {newListItems.map((item, index) => (
              <div key={index} className="flex gap-2 my-2">
                <input
                  type="text"
                  placeholder="Item name"
                  className="input input-bordered flex-grow"
                  value={item.name}
                  onChange={(e) => updateItem(index, 'name', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  className="input input-bordered"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                />
                <button className="btn btn-error btn-xs" onClick={() => {
                  const updatedItems = newListItems.filter((_, i) => i !== index);
                  setNewListItems(updatedItems);
                }}>
                  <FaTrash />
                </button>
              </div>
            ))}
            <button className="btn btn-primary my-2" onClick={handleAddItem}>Add Item</button>
            <div className="modal-action">
              <button className="btn" onClick={() => { setShowModal(false); resetModal(); }}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAddList}>Save List</button>
            </div>
          </div>
        </div>
      )}

      {viewListItems && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 md:w-1/2">
            <h3 className="font-bold text-lg">{currentList ? currentList.name : 'List Details'}</h3>
            <ul>
              {viewListItems.map((item, index) => (
                <li key={index} className={`flex justify-between items-center my-2 ${item.completed ? 'line-through' : ''}`}>
                  <span>{item.name} - Quantity: {item.quantity}</span>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => {
                      const updatedItems = [...viewListItems];
                      updatedItems[index].completed = !updatedItems[index].completed;
                      setViewListItems(updatedItems);
                    }}
                    className="checkbox checkbox-primary"
                  />
                </li>
              ))}
            </ul>
            <div className="modal-action">
              <button className="btn" onClick={() => setViewListItems(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
