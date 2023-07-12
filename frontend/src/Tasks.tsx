
import React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';

export default function Tasks({token}: {token: string | null}) {
  const [tasks, setTasks] = useState([]);
  const fetchData = async(token: string)=>{
    const response = await axios.get('http://localhost:8000/quizz/tasks',{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });

    console.log(response);

    if (response.status !== 200) {
      return alert('Error fetching tasks');
    }

    setTasks(response.data.tasks);
    console.log(response.data);
  };
  useEffect(()=>{
   if(token){
    fetchData(token);
   }
  },[]);


  return (
    <div>{tasks.map((task: any,index)=>(
        <p key={index}>{task.title}</p>
    ))}</div>
  );
}