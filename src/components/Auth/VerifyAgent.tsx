import React, { useState } from 'react'
// import Step3 from '../AgentKyc/Step3'
import Step1 from '../AgentKyc/Step1'
import Step2 from '../AgentKyc/Step2'

const VerifyAgent: React.FC = () => {
  const [step, setStep] = useState(0)

  const handleNextStep = () => {
    setStep(prev => prev + 1)
  }

  const handlePrevStep = () => {
    setStep(prev => prev - 1)
  }

  const verification = () => {
    switch (step) {
      case 0:
      return <Step1 handleNextStep={handleNextStep} />
        break;
      case 1:
        return <Step2 handleNextStep={handleNextStep} handlePrevStep={handlePrevStep} />
        break;
      // case 2:
      //   return <Step3 handlePrevStep={handlePrevStep} />
      default:
        return <Step1 handleNextStep={handleNextStep} />
        break;
    }
  }
  return (
    <section>
        {verification()}
    </section>
  )
}

export default VerifyAgent