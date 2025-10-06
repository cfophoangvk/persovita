import Badge from "../components/Badge";
import Header from "../components/Header";
import Button from "../components/Button";

const Page10 = (props: { country: string, setCountry: (country: string) => void, onNext: () => void }) => {

  const countries = [
    'Austria',
    'Belgium',
    'Bulgaria',
    'Croatia',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Hungary',
    'Ireland',
    'Italy',
    'Latvia',
    'Lithuania',
    'Luxembourg',
    'Malta',
    'Netherlands',
    'Poland',
    'Portugal',
    'Romania',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'United Kingdom'
  ];
  return (
    <div className='flex flex-col items-center'>
      <Badge text="GENERAL" />
      <Header text="What country do you live in?" />
      <select className="w-60 px-2 py-4 rounded-md border border-gray-300" value={props.country} onChange={e => props.setCountry(e.target.value)}>
        {countries.map((country, index) => <option key={index} value={country}>{country}</option>)}
      </select>
      <Button text="Next" onClick={props.onNext} />
    </div>
  )
}

export default Page10