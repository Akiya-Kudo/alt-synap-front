import { ChevronRightIcon, InfoIcon } from "@chakra-ui/icons"
import { HStack, Stack, Step, StepIcon, StepIndicator, Stepper, StepSeparator, StepStatus, Text, useColorMode, useSteps } from "@chakra-ui/react"
import React from "react"
import { BasicStepperProps, StepsType } from "../../type/atom"

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
        {/* <HStack m={2}>
            <InfoIcon color={"tipsy_color_3"} boxSize={6} m={2}/>
            <Text fontSize={"0.9rem"}>{ activeStepText }</Text>
        </HStack> */}
    </Stack>
    )
}