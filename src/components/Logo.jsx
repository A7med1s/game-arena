import React from 'react'
import { Link } from 'react-router-dom'
const Logo = () => {
    function disableScroll(event) {
        const keysToDisable = ['ArrowUp', 'ArrowDown',];

        if (keysToDisable.includes(event.key)) {
            event.preventDefault();
        }
    }
  return (
    <>
        <div className='bg-sky-800 px-4 py-4 text-center'>
        <Link to={'/'} className='font-serif text-3xl text-white '>Game Arena</Link>
        </div>
    </>
  )
}

export default Logo
