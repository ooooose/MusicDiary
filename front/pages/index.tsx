'use client'

import { Heading, Box, Container, Button} from '@chakra-ui/react';

import type {  NextPage, GetServerSideProps } from "next";
import Head from 'next/head';
import { Login } from '../components/page/login';
import { Playlists } from '../components/page/playlists';

type Props = {
  token: string;
};

const Page: NextPage<Props> = ({ token }) => {
  console.log(process.env.SPOTIFY_CLIENT_ID);
  return (
    <>
      <Head>
        <title>Spotify Web Playback Example</title>
        <meta
          name="description"
          content="An example app of Spotify Web Playback SDK based on Next.js and Typescript."
        />
      </Head>
      <Container maxW='4xl' centerContent>
        <Box h={200} display='flex' justifyContent='center' alignItems='center'>
          <Heading as='h1' size='4xl'>
            Hello!<br />
            Let&rsquo;s mix your songs!!
          </Heading>
        </Box>
        <Box h={200} display='flex' justifyContent='center' alignItems='center'>
          {token === "" ? <Login /> : <Playlists />}
        </Box>
      </Container>
    </>
  )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.req.cookies["spotify-token"]) {
    const token: string = context.req.cookies["spotify-token"];
    return {
      props: { token: token },
    };
  } else {
    return {
      props: { token: "" },
    };
  }
};

export default Page;