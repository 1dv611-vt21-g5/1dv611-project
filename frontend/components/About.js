import _ from 'lodash'

import { Heading, Text, Container, Stack, Flex, Link, Center } from '@chakra-ui/react'

const About = () => {

    return (
      <Container maxW="container.lg">
        <Center my="2rem">
          <Heading size="2xl" as="h1">About</Heading>
        </Center>
        <Stack spacing="1rem">
        

        <Heading as="h2">Kund</Heading>
        <Text> Sensative AB </Text>
        <Link color="teal.500" href="https://sensative.com/"> https://sensative.com/</Link>
        
        <Heading as="h2">Uppdragstagare</Heading>
        <Text>
        Filippa Jakobsson, <Link color="teal.500" href="mailto:fj222nq@student.lnu.se"> fj222nq@student.lnu.se</Link>
        </Text>
        <Text>
        Johannes Segerlund, <Link color="teal.500" href="mailto:js224em@student.lnu.se"> js224em@student.lnu.se</Link>
        </Text>
        <Text>
        Adam Karlsten, <Link color="teal.500" href="mailto:ak222ye@student.lnu.se"> ak222ye@student.lnu.se</Link>
        </Text>
        <Text>
        Lisa Veltman, <Link color="teal.500" href="mailto:lv222fz@student.lnu.se"> lv222fz@student.lnu.se</Link>
        </Text>

        <Heading as="h2">Bakgrund</Heading>
        <Text>
            Projektet genomförs som en del av kursen 1dv611 (Mjukvaruutvecklingsprojekt i grupp) vid Linnéuniversitetet. Företag får anmäla sig för att ge uppdrag till studenter som ska utveckla nya applikationer eller delar av applikationer.
        </Text>
        <Text>
            Sensative AB var intresserade av att utveckla en ny funktion till deras befintliga platform Yggio. Yggio är en plattform för IoT dit olika sensorer av olika slag kan kopplas, oavsett protocol och man kan få en överblick av sina IoT, deras status samt administrera dem. Plattformen har också ett API som man jobba mot. Den nya funktionen som Sensative AB önskade var att användarna av deras plattform på något sätt skulle kunna aktivera att data delades från någon sensor via sociala medier eller liknande, när något specifikt hände eller vid en viss tid. Den kanal som var mest önskvärd var Twitter men de var öppna för förslag. Vi är 4 studenter som har 10 veckor på oss att utveckla denna tjänst.
        </Text>

        <Heading as="h2">Hur fungerar YSocial?</Heading>
        <Text>Kommer snart...</Text>

        </Stack>
      </Container>
    )
  }
  
  export default About