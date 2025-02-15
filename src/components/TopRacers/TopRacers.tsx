import TopRacersCard from "./component/TopRacersCard"
import team1 from "../../assets/component/TopRacers/team1.jpg";
import team2 from "../../assets/component/TopRacers/team2.jpg";
import team3 from "../../assets/component/TopRacers/team3.jpg";
import team4 from "../../assets/component/TopRacers/team4.jpg";
const topRacherarray = [
  {
    img:team1,
    name:"John Carter",
    winingdate:"2018 Champian"
  },
  {
    img:team2,
    name:"David Martin",
    winingdate:"2020 Champian"
  },
  {
    img:team3,
    name:"Nikki Bella",
    winingdate:"2022 Champian"
  },
  {
    img:team4,
    name:"Johnsan",
    winingdate:"2016 Champian"
  },
]

const TopRacers = () => {
  return (
    <div className="space-y-5 container ">
      <h2 className="text-center text-5xl font-semibold">Top Racers</h2>
      <p className="text-center">Experience speed and performance with our top-rated racing bicycles!</p>
       <ul className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {
            topRacherarray.map(item => <li key={item.name}><TopRacersCard name={item.name} wining={item.winingdate} imge={item.img} /></li>)
          }
       </ul>
    </div>
  )
}

export default TopRacers
