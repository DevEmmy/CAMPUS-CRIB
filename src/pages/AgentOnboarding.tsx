import React, { useState } from 'react'
import AgentStep1 from '../components/Onboarding/AgentStep1'
import AgentStep2 from '../components/Onboarding/AgentStep2'
import AgentStep3 from '../components/Onboarding/AgentStep3'

const AgentOnboarding: React.FC = () => {
    const [step, setStep] = useState(0)

    const handleNextStep = () => {
      setStep(prev => prev + 1)
    }
  
    const onboarding = () => {
      switch (step) {
        case 0:
        return <AgentStep1 handleNextStep={handleNextStep} />
          break;
        case 1:
          return <AgentStep2 handleNextStep={handleNextStep} />
          break;
        case 2:
          return <AgentStep3 />
        default:
          return <AgentStep1 handleNextStep={handleNextStep} />
          break;
      }
    }
  return (
    <section>
        {onboarding()}
    </section>
  )
}

export default AgentOnboarding