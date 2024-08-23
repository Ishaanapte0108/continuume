import React from 'react'
import TaskEdit from '../components/TaskEdit'

export default function TaskManagement() {
  return (
    <div>
      <TaskEdit isAdminView={true}/>
    </div>
  )
}
