import { Tooltip, Flex, Icon } from '@chakra-ui/react'
import { TiStarburst } from 'react-icons/ti'

/**
 * Simple component to display a subscription indicator icon.
 * 
 * @param {boolean} subscribed Wether the device is subscriped to or not.
 */
const SubStatusIcon = ({ subscribed, placement }) => {

  return subscribed ? (
    <Tooltip placement={placement || 'left'} hasArrow label="Device is sending data to Zapier.">
      <Flex>
        <Icon className="enabledStar" as={TiStarburst} mr="0.5rem" color="green.400" />
      </Flex>
    </Tooltip>
  ) : (
    <Tooltip placement={placement || 'left'} hasArrow label="Device is not sending data to Zapier.">
      <Flex>
        <Icon className="disabledStar" as={TiStarburst} mr="0.5rem" color="gray.300" />
      </Flex>
    </Tooltip>
  )
}

export default SubStatusIcon