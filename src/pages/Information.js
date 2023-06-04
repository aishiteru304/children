import React, { useRef } from 'react'

export default function Information() {
    const storageUser = JSON.parse(sessionStorage.getItem('user'))
    const userRef = useRef(storageUser ?? null)
    const user = userRef.current
    return (
        <div className='mt-10'>
            {user &&
                <div className='bg-white max-w-max mx-auto p-4 rounded-md flex flex-col gap-3'>
                    {user.name && <h3 className='text-slate-600'><span className='inline-block min-w-[200px] text-start text-lg text-slate-900'>Name:</span><span className='inline-block min-w-[220px] max-w-max text-start'>{user.name}</span></h3>}
                    {user.sex && <h3 className='text-slate-600'><span className='inline-block min-w-[200px] text-start text-lg text-slate-900'>Sex:</span><span className='inline-block min-w-[220px] max-w-max text-start'>{user.sex}</span></h3>}
                    {user.birth && <h3 className='text-slate-600'><span className='inline-block min-w-[200px] text-start text-lg text-slate-900'>Birthday:</span><span className='inline-block min-w-[220px] max-w-max text-start'>{user.birth}</span></h3>}
                    {user.phone && <h3 className='text-slate-600'><span className='inline-block min-w-[200px] text-start text-lg text-slate-900'>Phone Number:</span><span className='inline-block min-w-[220px] max-w-max text-start'>{user.phone}</span></h3>}
                    {user.email && <h3 className='text-slate-600'><span className='inline-block min-w-[200px] text-start text-lg text-slate-900'>Email:</span><span className='inline-block min-w-[220px] max-w-max text-start'>{user.email}</span></h3>}
                </div>
            }
        </div>
    )
}
