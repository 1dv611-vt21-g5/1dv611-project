import _ from 'lodash'

import { Heading, Container, Stack, Flex, Link } from '@chakra-ui/react'

const About = () => {

    return (
      <Container maxW="container.xl">
        <Flex my="2rem">
          <Heading as="h1">About</Heading>
        </Flex>
        <Stack spacing="1rem">
        <Heading as="h2">Bakgrund</Heading>
        <p>
            Projektet genomförs som en del av kursen 1dv611 (Mjukvaruutvecklingsprojekt i grupp) vid Linnéuniversitetet. Företag får anmäla sig för att ge uppdrag till studenter som ska utveckla nya applikationer eller delar av applikationer.
        </p>
        <p>
            Sensative AB var intresserade av att utveckla en ny funktion till deras befintliga platform Yggio. Yggio är en plattform för IoT dit olika sensorer av olika slag kan kopplas, oavsett protocol och man kan få en överblick av sina IoT, deras status samt administrera dem. Plattformen har också ett API som man jobba mot. Den nya funktionen som Sensative AB önskade var att användarna av deras plattform på något sätt skulle kunna aktivera att data delades från någon sensor via sociala medier eller liknande, när något specifikt hände eller vid en viss tid. Den kanal som var mest önskvärd var Twitter men de var öppna för förslag. Vi är 4 studenter som har 10 veckor på oss att utveckla denna tjänst.
        </p>
        <Heading as="h2">Kund</Heading>
        <p>Sensative AB 

        
        <Link color="teal.500" href="https://sensative.com/"> https://sensative.com/</Link>
        

        Kontaktperson: Fredrik Westman, fredrik.westman@sensative.com

        Uppdragstagare
        Filippa Jakobsson, fj222nq@student.lnu.se

        Johannes Segerlund, js224em@student.lnu.se

        Adam Karlsten, ak222ye@student.lnu.se

        Lisa Veltman, lv222fz@student.lnu.se
        </p>
        </Stack>
      </Container>
    )
  }
  
  export default About