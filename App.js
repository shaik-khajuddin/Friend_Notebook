import React, { useState, useEffect } from 'react';
import './App.css';
import FriendForm from './components/FriendForm';
import FriendList from './components/FriendList';

const App = () => {
  const [friends, setFriends] = useState([]);
  const [editFriend, setEditFriend] = useState(null);

  useEffect(() => {
    const storedFriends = JSON.parse(localStorage.getItem('friends'));
    if (storedFriends) setFriends(storedFriends);
  }, []);

  useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(friends));
  }, [friends]);

  const handleAddFriend = (newFriend) => {
    setFriends([...friends, newFriend]);
  };

  const handleEditFriend = (updatedFriend) => {
    const updatedFriends = friends.map((friend) =>
      friend.id === updatedFriend.id ? updatedFriend : friend
    );
    setFriends(updatedFriends);
    setEditFriend(null);
  };

  const handleDeleteFriend = (id) => {
    const updatedFriends = friends.filter((friend) => friend.id !== id);
    setFriends(updatedFriends);
  };

  return (
    <div className="App p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Friend Notebook</h1>
      <FriendForm onAddFriend={handleAddFriend} />
      <FriendList
        friends={friends}
        onEditFriend={(friend) => setEditFriend(friend)}
        onDeleteFriend={handleDeleteFriend}
      />
      {editFriend && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Friend</h2>
            <FriendForm
              friend={editFriend}
              onAddFriend={handleEditFriend}
              isEdit
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
