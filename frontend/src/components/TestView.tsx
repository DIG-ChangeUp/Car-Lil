import { useEffect, useState } from 'react';

export default function TestView() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function getUsers() {
      const usersData = await fetch('/api');
      const jsonUsers = await usersData.json();
      setUsers(jsonUsers.data);
      console.log('users', users);
      setUserName(jsonUsers.data[0].user_name);
    }
    getUsers();
  }, []);

  return (
    <div>
      <h1>TEST</h1>
      <div>{userName}</div>
    </div>
  );
}
