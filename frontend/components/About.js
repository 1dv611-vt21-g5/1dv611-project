import _ from 'lodash'

import { Heading, Text, Container, Stack, Box, Link, Flex } from '@chakra-ui/react'

const About = () => {
  return (
    <Container maxW="container.lg">
      <Flex my="2rem">
        <Heading as="h1">About</Heading>
      </Flex>
      <Box padding="10" bg="lime.white" borderRadius="md" shadow="md">
        <Stack spacing="1rem">
          <Heading size="md" as="h2">Client</Heading>
          <Text color="lime.grey"> Sensative AB </Text>
          <Link color="teal.500" href="https://sensative.com/"> https://sensative.com/</Link>
          <Heading size="md" as="h2">Team</Heading>
          <Text color="lime.grey">
            Filippa Jakobsson, <Link color="teal.500" href="mailto:fj222nq@student.lnu.se"> fj222nq@student.lnu.se</Link>
          </Text>
          <Text color="lime.grey">
            Johannes Segerlund, <Link color="teal.500" href="mailto:js224em@student.lnu.se"> js224em@student.lnu.se</Link>
          </Text>
          <Text color="lime.grey">
            Adam Karlsten, <Link color="teal.500" href="mailto:ak222ye@student.lnu.se"> ak222ye@student.lnu.se</Link>
          </Text>
          <Text color="lime.grey">
            Lisa Veltman, <Link color="teal.500" href="mailto:lv222fz@student.lnu.se"> lv222fz@student.lnu.se</Link>
          </Text>
          <Heading size="md" as="h2">Background</Heading>
          <Text color="lime.grey">
            The project is carried out as part of the course 1dv611 (Mjukvaruutvecklingsprojekt i grupp) at Linnaeus University. In this course, students collaborate with real enterprises to develop an application or part of an application, depending on the vision of the company.        
          </Text>
          <Text color="lime.grey">
            Sensative AB was interested in developing a new functionality for their existing platform Yggio. Yggio is a platform for IoT devices where different sensors of different types can be connected, regardless of protocol. You can get an overview of your IoT devices, their status and administrate them from the platform. The platform also has an API that developers can use to access data. 
          </Text>
          <Text color="lime.grey">
            The functionality that Sensative AB was interested in was to make their users able to share sensor data via social media or another platform when something specific happened or at a certain time. The platform that Sensative AB expressed to be the most interested in was Zapier as you can share the data with many other platforms easily. 
          </Text>
          <Text color="lime.grey">
            We are 4 students who will work during 10 weeks to develop this service, part time.
          </Text>
          <Heading size="md" as="h2">How does YSocial work?</Heading>
          <Text color="lime.grey">TBC...</Text>
        </Stack>
      </Box>
    </Container>
  )
}

// Exports.
export default About
