import { Box, Typography } from '@mui/material'
import Link from 'next/link'

export default function FourOhFour() {
  return <Box>
    <Typography align="center" variant="h2">404 - Page Not Found</Typography >
      <Typography align="center">
            <Link href="/">
                Go back home
            </Link>
      </Typography>
  </Box>
}