import { Gauge,Car,GasPump } from "@phosphor-icons/react";
import { useState } from "react";

export const Budgeting = (props) =>{
    const [makeName,setMakeName] = useState(null);
    const [filteredMake,setFilteredMake] = useState(null);
    const [transmissionType,setTransmissionType] = useState(null);
    const [budget,setBudget] = useState(null);
    const [timeSpan,setTimeSpan] = useState("weekly");
    const [budgetResults,setBudgetResults] = useState(null);
    const data = props.data;
    const setPickedVehicle = props.setPickedVehicle;
    const snapBackCar = props.snapBackCar;

    const searchSuggestion = (makeName) =>{
      console.log('ha');
      const makeCheck = makeName.toLowerCase();
      const final = data.filter((item)=>{
        return item.make.toLowerCase().startsWith(makeCheck);
      })
      const mapOfFinal = new Map(final.map(data => [data.make,data]));
      const uniqueMakeNames =  [...mapOfFinal.values()];
      if(makeCheck){
        setFilteredMake(uniqueMakeNames);
      }else{
        setFilteredMake(null);
      }
    }
    const searchDeals = () => {
      const final = data.filter((item) => {
        if (makeName && item.make.toLowerCase() !== makeName.toLowerCase()) {
          return false;
        }
        if (budget) {
          if (timeSpan === "weekly" && item.weekly > budget) {
            return false;
          }
          if (timeSpan === "monthly" && item.monthly > budget) {
            return false;
          }
        }
        if (transmissionType && item.transmission !== transmissionType) {
          return false;
        }
        return true;
      });
      if(final[0]){
        setBudgetResults(final);
      }else{
        setBudgetResults(data);
      }
    };
    
    
    return(
        <div>
         <div class="flex justify-center items-center mb-5">
            <div class="bg-red-600 text-white p-2 rounded-lg">
              Find the most suitable deal for your budget
            </div>
         </div>
         <div class="flex flex-col mb-5">
            <div class="flex flex-col sm:flex-row justify-center items-center mb-14">
            <div class="mx-auto relative">
            <label for="make" class="block font-medium">Search by make</label>
            <input type="text" id="make" value={makeName ? makeName : null} class="border border-black rounded-lg" onChange={(e)=>{searchSuggestion(e.target.value);}} />
            {filteredMake &&
            <div class="h-13 w-full border border-black overflow-y-auto absolute">
                {filteredMake.map((make)=>{
                  const name = make.make;
                  return(
                    <div onClick={()=>setMakeName(name)} class="border-b border-black last:border-none text-lg p-2">
                      {name}
                    </div>
                  )
                })}
            </div>
            }
            </div>
            <div class="mx-auto">
            <label for="transmission" class="block font-medium">Search by transmission</label>
            <select onClick={(e)=>setTransmissionType(e.target.value)}  type="text" id="transmission" class="border border-black rounded-lg w-44">
              <option value={null}>none</option>
              <option value="Automatic">Automatic</option>
              <option value="CVT">CVT</option>
              <option value="Manual">Manual</option>
              </select>
            </div>
            <div class="mx-auto">
            <label for="prices" class="block font-medium">Search by Price</label>
            <input type="text" id="prices" class="border border-black rounded-lg block sm:inline" onChange={(e)=>setBudget(e.target.value)} />
            <select type="text" onChange={(e)=>setTimeSpan(e.target.value)}>
                <option value="weekly">Weekly Fee</option>
                <option value="monthly">Monthly Fee</option>
            </select>
            </div>
            </div>
            <div class="ml-auto sm:mr-40 ">
            <button onClick={()=>searchDeals()}  class="border border-red-600 py-3 px-5 bg-red-600 text-white rounded-xl">Search</button>
            </div>
            
         </div>
         <div class="flex overflow-y-hidden grid-flow-row mx-auto gap-4">
            {budgetResults
             ? budgetResults.map(car =>{
                
                return(
                    <div class="flex flex-col border border-black rounded-lg">
                        <img src={car.image} class=" mx-auto w-[150px]" />
              <div class="mx-5 mt-auto">
                
                <h2 class="border border-black inline-block py-2 px-3 rounded-lg text-sm ">{car.year}</h2>
                <h1 class=" text-sm">{car.make} {car.model}</h1>
                <div class='my-3  text-sm'>
                <span class="text-orange-500 mr-5">${car.price}</span>
                |
                <span class="ml-5">${car.weekly}/week</span>
                </div>
                <hr></hr>
                <div class="my-3 flex text-sm">
                  <div class='flex '>
                  <Gauge size={25} />
                  <span class="">{car.mileage}</span>
                  </div>
                  <div class='flex mx-3'>
                  <Car size={25} />
                  <span class="">{car.transmission}</span>
                  </div>
                  <div class='flex'>
                  <GasPump size={25} />
                  <span class="">{car.fuelType}</span>
                  </div>  

                </div>
                <button class="w-full text-sm my-3 py-2 px-3 mx-auto border border-red-500 bg-red-500 text-white rounded-lg
                " onClick={()=>{setPickedVehicle(car);snapBackCar.current.scrollIntoView({behavior: 'smooth' })}}>Rent Now</button>
              </div>
                    </div>
                )
             })
            : data.map(car =>{
                
              return(
                  <div class="flex flex-col border border-black rounded-lg">
                      <img src={car.image} class=" mx-auto w-[150px]" />
            <div class="mx-5 mt-auto">
              
              <h2 class="border border-black inline-block py-2 px-3 rounded-lg text-sm ">{car.year}</h2>
              <h1 class=" text-sm">{car.make} {car.model}</h1>
              <div class='my-3  text-sm'>
              <span class="text-orange-500 mr-5">${car.price}</span>
              |
              <span class="ml-5">${car.weekly}/week</span>
              </div>
              <hr></hr>
              <div class="my-3 flex text-sm">
                <div class='flex '>
                <Gauge size={25} />
                <span class="">{car.mileage}</span>
                </div>
                <div class='flex mx-3'>
                <Car size={25} />
                <span class="">{car.transmission}</span>
                </div>
                <div class='flex'>
                <GasPump size={25} />
                <span class="">{car.fuelType}</span>
                </div>  

              </div>
              <button class="w-full text-sm my-3 py-2 px-3 mx-auto border border-red-500 bg-red-500 text-white rounded-lg
              " onClick={()=>{setPickedVehicle(car);snapBackCar.current.scrollIntoView({behavior: 'smooth' })}}>Rent Now</button>
            </div>
                  </div>
              )
           })
            }
         </div>
      </div>
    )
}