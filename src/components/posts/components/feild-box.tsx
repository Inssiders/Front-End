import React from 'react'
interface FeildBoxProps {
    children: React.ReactNode
    label: string
}
const FeildBox = ({children, label}: FeildBoxProps) => {
  return (
    <div className='w-full flex flex-col gap-2 mt-5'>
        <div className='text-sm font-medium text-main-700'>
            {label}
        </div>
        <div>
            {children}
        </div>
    </div>
  )
}

export default FeildBox
