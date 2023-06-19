'use client'
import { Link } from '@chakra-ui/next-js';
import { Heading, Box, Container } from '@chakra-ui/react';

export default function Page() {
  return (
    <>
      <Container maxW='2xl' centerContent>
        <Box>
          <Heading as='h1' size='4xl' noOfLines={1}>
            Already login!
          </Heading>
          <Link href='/' color='blue.500' _hover={{ color: 'blue.300' }}>
            Back to HOME!
          </Link>
        </Box>
      </Container>
    </>
  )
}