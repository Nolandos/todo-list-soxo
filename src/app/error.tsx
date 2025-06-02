'use client'

import { useEffect } from 'react'
import { Paper, Typography } from '@mui/material'
import Button from "@/components/ui/Button/Button";

interface CustomError extends Error {
  digest?: string
  status?: number
  statusText?: string
}

export default function Error({
  error,
  reset,
}: {
  error: CustomError
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  const status = error.status || 500
  const statusText = error.statusText || 'An unexpected error occurred'

  return (
    <div className="w-full flex items-center justify-center p-8">
      <Paper elevation={3} className="p-8 max-w-xl w-full h-auto flex flex-col items-center justify-start">
        <Typography variant="h4" color="error" gutterBottom>
          Error: {status}
        </Typography>

        <Typography variant="h6" gutterBottom>
          {statusText}
        </Typography>

        <Typography variant="body1" className="my-4 text-gray-700">
          {error.message || 'Something went wrong while loading data.'}
        </Typography>

        <Button
          variant="contained"
          onClick={() => reset()}
          className="mt-4"
        >
          Try again
        </Button>
      </Paper>
    </div>
  )
}
