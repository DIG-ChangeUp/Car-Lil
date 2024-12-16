// import { useEffect, useState } from "react"
//
// export default function TestView(){
//   const [users, setUsers] = useState([])
//
//   useEffect( () => {
//     async function getUsers(){
//       const usersArr = await fetch("/api")
//       const jsonData = await usersArr.json()
//       setUsers(jsonData.data[0].user_name)
//     }
//     getUsers()
//   }, []);
//
//   return (
//         <div>
//           <h1>TEST</h1>
//           <div>{users}</div>
//         </div>
//   )
// }