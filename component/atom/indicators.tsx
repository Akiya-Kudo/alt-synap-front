import { ChevronRightIcon, InfoIcon } from "@chakra-ui/icons"
import { Box, Flex, HStack, Stack, Step, StepIcon, StepIndicator, Stepper, StepSeparator, StepStatus, Tab, TabProps, Text, useColorMode, useSteps } from "@chakra-ui/react"
import React from "react"
import { BasicStepperProps, StepsType, TabPagenationSwitchProps } from "../../type/atom"
import { useNeumorphismColorMode } from "../../util/hook/useColor"

export const  BasicStepper = ({
    steps, activeStep, setActiveStep,
    ...props
}: BasicStepperProps) => {
    const activeStepTitle = steps[activeStep].title
    const activeStepText = steps[activeStep].description

    const { colorMode } = useColorMode()
    return (
    <Stack {...props}>
        <Stepper size='sm' index={activeStep} gap='0' colorScheme={colorMode === 'light' ? 'teal' : 'pink'}>
        {steps.map((step, index) => (
            <Step key={index}>
                <StepIndicator>
                    <StepStatus complete={<StepIcon />} active={<ChevronRightIcon/>}/>
                </StepIndicator>
                <StepSeparator />
            </Step>
        ))}
        </Stepper>
        <Text>
            Step {activeStep + 1}: <b>{activeStepTitle}</b>
        </Text>
    </Stack>
    )
}

export const NeumTab = ({
    children,
    ...props
}: TabProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    return (
        <Tab
        {...props}
        borderTopRadius={15}
        boxShadow={`inset -1px -1px 5px -2px ${highlight}, inset 1px 1px 5px -3px  ${shadow}`}
        _hover={{ 
            boxShadow: `inset -2px -2px 10px -4px ${highlight}, inset 3px 3px 10px -6px  ${shadow};` ,
            color: "tipsy_color_3"
        }}
        _selected={{ 
            boxShadow: `inset -5px -5px 15px -8px ${highlight}, inset 7px 7px 12px -8px  ${shadow};`,
            color: "tipsy_color_3"
        }}
        >
            { children }
        </Tab>
    )
}

export const NeumTabaPagenationSwitch = ({
    children,
    ...props
}: TabPagenationSwitchProps) => {
    const { highlight, shadow } = useNeumorphismColorMode()
    return (
        <Flex
        borderTopRadius={15}
        boxShadow={`inset -1px -1px 5px -2px ${highlight}, inset 1px 1px 5px -3px  ${shadow}`}
        _hover={{ 
            boxShadow: `inset -2px -2px 10px -4px ${highlight}, inset 3px 3px 10px -6px  ${shadow};` ,
            color: "tipsy_color_3"
        }}
        _selected={{ 
            boxShadow: `inset -5px -5px 15px -8px ${highlight}, inset 7px 7px 12px -8px  ${shadow};`,
            color: "tipsy_color_3"
        }}
        {...props}
        >
            { children }
        </Flex>
    )
}
