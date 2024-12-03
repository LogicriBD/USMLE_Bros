'use client' // Error components must be Client Components

import { logger } from '@/utils/Logger'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
})
{
    useEffect(() =>
    {
        logger.error(error)
    }, [error])

    return (
        <div className='h-full min-h-full flex flex-col items-center justify-center bg-marrow'>
            <h2>Something went wrong!</h2>
            <button
                className='bg-marrow-dark hover:bg-cyan-900 text-white px-4 py-2 rounded-lg mt-4'
                onClick={
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    )
}