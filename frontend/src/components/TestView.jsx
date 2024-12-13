import { useEffect, useState } from "react"

console.log("--------------")
export default function TestView(){
  const [users, setUsers] = useState("")

  useEffect(async () => {
    const data = await fetch("http://localhost:4000/api"
    ).then(response => response.json())
    setUsers(data)
  }, []);

  return (
        <div>
          <h1>TEST</h1>
          <div>{users}</div>
        </div>
  )
}