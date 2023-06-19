'use client'
import { Heading, Box, Container, Button} from '@chakra-ui/react';

export default function Page() {
  return (
    <>
      <Container maxW='4xl' centerContent>
        <Box h={200} display='flex' justifyContent='center' alignItems='center'>
          <Heading as='h1' size='4xl'>
            Hello!<br />
            Let&rsquo;s mix your songs!!
          </Heading>
        </Box>
        <Box h={200} display='flex' justifyContent='center' alignItems='center'>
          <Button colorScheme='green'>
            Authorize!
          </Button>
        </Box>
      </Container>
    </>
  )
}
