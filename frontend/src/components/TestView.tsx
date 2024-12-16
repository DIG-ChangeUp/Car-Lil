import { useEffect, useState } from 'react';

export default function TestView() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function getUsers() {
      const usersData = await fetch('/api');
      console.log('usersData', usersData);
      const jsonUsers = await usersData.json();
      console.log('jsonUsers', jsonUsers);
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
