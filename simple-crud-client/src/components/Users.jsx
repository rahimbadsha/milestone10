import React, { use, useState } from 'react';
import { Link } from 'react-router-dom';


const Users = ({userPromise}) => {

    const initialUsers = use(userPromise)
    const [users, setUsers] = useState(initialUsers)

    const handleDeleteUser = (id) => {
        console.log("deleting user", id)
        fetch(`http://localhost:3000/users/${id}`, {
            method: "DELETE"
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("after delete", data);
            if(data.deletedCount) {
                alert('deleted successfully')
                const remaining = users.filter(user => user._id !== id)
                setUsers(remaining)
            }
          });
    }

    const handleAddUser = e => {
        e.preventDefault();
        const name = e.target.name.value
        const email = e.target.email.value
        console.log(name, email)
        const newUser = {name, email}

        // save this user data to the database(via server)
        fetch("http://localhost:3000/users", {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(newUser)
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("after saving user", data);
            if(data.insertedId) {
                newUser._id = data.insertedId
                const newUsers = [...users, newUser]
                setUsers(newUsers)
                alert('users added successfully')
                e.target.reset()
            }
          });
    }
    return (
      <div>
        <h3>users: {users.length}</h3>
        <form onSubmit={handleAddUser}>
          <input type="text" name="name" id="" defaultValue={users.name} />
          <br />
          <input type="email" name="email" id="" defaultValue={users.email} />
          <br />
          <input type="submit" value="Add User" />
        </form>
        <p>----------------</p>
        <div>
          {users.map((user) => (
            <p key={user._id}>
              {user.name} : {user.email}
              <Link to={`/users/${user._id}`}> Details </Link>
              <Link to={`/update/${user._id}`}> Edit </Link>
              <button onClick={() => handleDeleteUser(user._id)}>x</button>
            </p>
          ))}
        </div>
      </div>
    );
};

export default Users;