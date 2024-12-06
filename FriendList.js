import React from 'react';

const FriendList = ({ friends, onEditFriend, onDeleteFriend }) => {
  if (friends.length === 0)
    return <p className="text-center text-gray-500">No friends added yet!</p>;

  return (
    <div className="grid gap-4">
      {friends.map((friend) => (
        <div
          key={friend.id}
          className="p-4 border rounded shadow-md bg-gray-100 flex flex-col"
        >
          <p><strong>Name:</strong> {friend.name}</p>
          <p><strong>DOB:</strong> {friend.dob}</p>
          <p><strong>Description:</strong> {friend.textarea}</p>
          <p><strong>Number:</strong> {friend.number}</p>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => onEditFriend(friend)}
              className="bg-yellow-500 text-white px-4 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteFriend(friend.id)}
              className="bg-red-500 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendList;
