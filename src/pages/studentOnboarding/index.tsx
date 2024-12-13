import React, { useState } from 'react'
import StudentStep1 from '../../components/Onboarding/StudentStep1'
import StudentStep2 from '../../components/Onboarding/StudentStep2'
import StudentStep3 from '../../components/Onboarding/StudentStep3'


const StudentOnboarding: React.FC = () => {
  const [step, setStep] = useState(0)

  const handleNextStep = () => {
    setStep(prev => prev + 1)
  }

  const onboarding = () => {
    switch (step) {
      case 0:
      return <StudentStep1 handleNextStep={handleNextStep} />
        break;
      case 1:
        return <StudentStep2 handleNextStep={handleNextStep} />
        break;
      case 2:
        return <StudentStep3 />
      default:
        return <StudentStep1 handleNextStep={handleNextStep} />
        break;
    }
  }
  return (
    <section className='h-full w-full'>
        {onboarding()}
    </section>
  )
}

export default StudentOnboarding