import { Tooltip, Box, Icon } from '@chakra-ui/react'
import { TiStarburst } from 'react-icons/ti'

/**
 * Simple component to display a subscription indicator icon.
 * 
 * @param {boolean} subscribed Wether the device is subscriped to or not.
 */
const SubStatusIcon = ({ subscribed }) => {

  return subscribed ? (
    <Tooltip placement="left" hasArrow label="Device is sending data to Zapier.">
      <Box>
        <Icon className="enabledStar" as={TiStarburst} mr="0.5rem" color="green.400" />
      </Box>
    </Tooltip>
  ) : (
    <Tooltip placement="left" hasArrow label="Device is not sending data to Zapier.">
      <Box>
        <Icon className="disabledStar" as={TiStarburst} mr="0.5rem" color="red.400" />
      </Box>
    </Tooltip>
  )
}

export default SubStatusIcon