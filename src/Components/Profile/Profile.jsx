import React from 'react'

export default function Profile({userData}) {
  return (
    <div>Hello {userData?.name}</div>
  )
}
