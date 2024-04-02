import { Gauge,GasPump, Car} from "@phosphor-icons/react";

export const VehicleCard = (props) =>{
    const cars = props.cars;
    const setPickedVehicle = props.setPickedVehicle;
    const snapBackCar = props.snapBackCar;
    const snapBackVehicles = props.snapBackVehicles;
    return(

        <div class="grid-flow-row lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 gap-4 mx-auto group
        flex   overflow-y-hidden" ref={snapBackVehicles}>
            {cars &&
             cars.map((car)=>{
              
              return(
              <div class="flex flex-col border border-black rounded-xl md:group-hover:opacity-50 md:hover:!opacity-100">
              <img src={car.image} class="md:w-10/12 mx-auto w-1/2" />
              <div class="mx-5 mt-auto">
                
                <h2 class="border border-black inline-block py-2 px-3 rounded-lg md:text-lg text-sm ">{car.year}</h2>
                <h1 class="md:text-lg text-sm">{car.make} {car.model}</h1>
                <div class='my-3 md:text-lg text-sm'>
                <span class="text-orange-500 mr-5">${car.price}</span>
                |
                <span class="ml-5">${car.weekly}/week</span>
                </div>
                <hr></hr>
                <div class="my-3 flex md:text-lg text-sm">
                  <div class='flex '>
                  <Gauge size={25} />
                  <span class="">{car.mileage}</span>
                  </div>
                  <div class='flex md:mx-auto mx-3'>
                  <Car size={25} />
                  <span class="">{car.transmission}</span>
                  </div>
                  <div class='flex'>
                  <GasPump size={25} />
                  <span class="">{car.fuelType}</span>
                  </div>  

                </div>
                <button class="w-full md:text-lg text-sm my-3 py-2 px-3 mx-auto border border-red-500 bg-red-500 text-white rounded-lg
                " onClick={()=>{setPickedVehicle(car);snapBackCar.current.scrollIntoView({behavior: 'smooth' })}}>Rent Now</button>
              </div>
              </div>
              )
             })}
        </div>
    )
}