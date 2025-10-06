import Badge from "../components/Badge"
import Button from "../components/Button"
import Header from "../components/Header"

const Page2 = (props: { name: string, acceptedPersonalData: boolean, onAcceptPersonalData: () => void, onNext: () => void }) => {
  return (
    <div className='flex flex-col items-center max-w-[600px]'>
      <Badge text="GENERAL" />
      <Header text={`Welcome ${props.name}!`}/>
      <p className='text-lg text-center leading-6'>
        We're going to ask you a few questions so that we can <strong>offer you a selection of supplements</strong> tailored to your needs.
      </p>
      <p className='text-lg text-center leading-6 mt-8'>
        The purpose of this questionnaire is not to make a diagnosis, but to give you
        recommendations on how to stay in good health.
      </p>
      <p className='text-lg text-center leading-6 mt-8'>
        To do this, we will <strong>collect personal data</strong> about you.
      </p>

      <div className="mt-15 flex gap-5 items-center">
        <input
          type="checkbox"
          id="personalData"
          className='scale-150'
          checked={props.acceptedPersonalData}
          onChange={props.onAcceptPersonalData}
        />
        <label htmlFor="personalData">
          By ticking this box, I accept that the personal data I provide to Cuure will be used to
          create my personalised Cuure of supplements.
        </label>
      </div>

      <Button onClick={props.onNext} disabled={!props.acceptedPersonalData} text="Next"/>
    </div>
  )
}

export default Page2