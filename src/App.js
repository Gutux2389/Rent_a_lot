import redCar from "./photos/red-car.png";
import { useState, useEffect,useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {v4} from 'uuid';
import { VehicleCard } from "./components/vehicle-car";
import { CaretDown, MapPin,Car,CalendarBlank,CreditCard,ThumbsUp,Tag,User,Headset } from "@phosphor-icons/react";
import { CaretUp } from "@phosphor-icons/react/dist/ssr";
import visaCard  from './photos/visa-logo-svgrepo-com.svg';
import masterCard from './photos/mastercard-svgrepo-com.svg';
import { Testimonials } from "./components/testimonials";
import { Budgeting } from "./components/budgeting";

function App() {
  const [carPicker,setCarPicker] = useState(false);
  const [pickedVehicle,setPickedVehicle] = useState(null);
  const { data,isLoading,error} = useQuery({
    queryKey: ["cars"],
    queryFn: () => fetch("../local-json/fakecars.json").then((res)=>res.json()),
  })
  
  console.log(data);
 
  const dummy = useRef(null);
  const snapBackCar = useRef();
  const snapBackVehicles = useRef();

  
  useEffect(()=>{
    const handleOutSideClick = (event) => {
      if (!dummy.current?.contains(event.target)) {
        setCarPicker(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  },[dummy])

  if(isLoading) return <div>Data is fetching</div>
  if(error) return <div>An error occured</div>
  let rentPrice = null;
  if(pickedVehicle){
    rentPrice = pickedVehicle.price * (1/100);
  }else{
    rentPrice = data[0].price * (1/100);
  }

  
  return (
    <div>
      <div class="flex shadow-lg text-xl py-4 fixed w-full z-20 bg-white">
        <span class="ml-10 text-red-500 p-2 ">Rentalot</span>
        <ul class="list-none mx-auto flex">
          <li class="mx-2 md:mx-5 p-2  transition-all rounded-2xl overflow-hidden inline-flex bg-white border-stone-700 border  relative group hover:cursor-pointer">
            <span class="absolute justify-center transition-all left-0 top-0 rounded-2xl bg-red-600 w-full h-full text-center scale-0 group-hover:scale-100"></span>
            <span class="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
              Home
            </span>
          </li>

          <li class="mx-2 md:mx-5 p-2  transition-all rounded-2xl overflow-hidden inline-flex bg-white border-stone-700 border  relative group hover:cursor-pointer">
            <span class="absolute justify-center transition-all left-0 top-0 rounded-2xl bg-red-600 w-full h-full text-center scale-0 group-hover:scale-100"></span>
            <span class="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
              About
            </span>
          </li>
          <li class="mx-2 md:mx-5 p-2  transition-all rounded-2xl overflow-hidden inline-flex bg-white border-stone-700 border  relative group hover:cursor-pointer">
            <span class="absolute justify-center transition-all left-0 top-0 rounded-2xl bg-red-600 w-full h-full text-center scale-0 group-hover:scale-100"></span>
            <span class="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
              Policy
            </span>
          </li>
          <li class="mx-2 md:mx-5 p-2  transition-all rounded-2xl overflow-hidden inline-flex bg-white border-stone-700 border  relative group hover:cursor-pointer">
            <span class="absolute justify-center transition-all left-0 top-0 rounded-2xl bg-red-600 w-full h-full text-center scale-0 group-hover:scale-100"></span>
            <span class="w-full text-black transition-colors duration-300 ease-in-out group-hover:text-white z-10">
              Pricing
            </span>
          </li>
        </ul>
      </div>
      <div>
        <div class="flex flex-col">
          <div class="flex flex-col-reverse md:flex-col-reverse lg:flex-row ">
          <aside class="w-1/4 mx-auto mt-auto my-10 lef-1/4 md:top-0">
            Rent from us to save <span class="text-red-600">BIG</span> on expenses.
            No need to come to the establishment to pick up the vehicle.
            Choose your drop off place,put it payment info and our employees will come drop off your vehicle of choice.
            
          </aside>
          
          <img
            src={redCar}
            class="w-1/2 h-auto mx-auto mt-20 md:mb-auto"
          />
          
          </div>
          
        </div>
        <div class="flex flex-col">
        <div class='flex  justify-center items-center mb-3'>
          <div class="bg-red-600 p-2 rounded-xl text-white">
            Make it happens in 4 steps
          </div>
        </div>
          <div class='grid grid-cols-2 gap-5 md:grid-cols-4'>
            <div class="mx-auto text-center flex flex-col">
              <Car class="size-20 text-zinc-200 mx-auto border border-white rounded-xl shadow-lg bg-red-500"/>
              <div class="text-xl font-bold mb-5">Select a vehicle</div>
              <div>
                Select directly from our rental fleet or search and find to your liking
              </div>
              <div class="bg-red-500 text-white m-2 p-2 cursor-pointer" onClick={()=>snapBackVehicles.current.scrollIntoView({behavior: "smooth"})}>Check out our rental fleet</div>
              <div class="bg-red-500 text-white m-2 p-2 cursor-pointer"
              onClick={()=>snapBackCar.current.scrollIntoView({behavior : 'smooth'})}>Search and Pick</div>
            </div>
            <div class="mx-auto text-center flex flex-col">
              <MapPin class="size-20 text-zinc-200 mx-auto border border-white rounded-xl shadow-lg bg-red-500"/>
              <div class="text-xl font-bold mb-5">Pick a drop off place and date</div>
              
              <div>
                Pick a drop off place and date for our employee to deliver the vehicle
              </div>
              <div class="mt-auto">
              <div class="bg-red-500 text-white m-2 p-2 cursor-pointer" onClick={()=>snapBackCar.current.scrollIntoView({behavior : 'smooth'})}>Date and Place</div>
              </div>
            </div>
            <div class="mx-auto text-center flex flex-col">
              <CreditCard class="size-20 text-zinc-200 mx-auto border border-white rounded-xl shadow-lg bg-red-500"/>
              <div class="text-xl font-bold mb-5">Put in billing infos</div>
              
              <div>
                Put in credit card or debit card infos for your convenience
              </div>
              <div class="mt-auto">
              <div class="bg-red-500 text-white m-2 p-2 cursor-pointer" onClick={()=>snapBackCar.current.scrollIntoView({behavior : 'smooth'})}>Pay it your way</div>
              </div>
            </div>
            <div class="mx-auto text-center flex flex-col">
              <ThumbsUp class="size-20 text-zinc-200 mx-auto border border-white rounded-xl shadow-lg bg-red-500"/>
              <div class="text-xl font-bold mb-5">Book your car</div>
              
              <div>
                Finish putting in infos and enjoy your vehicle
              </div>
              <div class="mt-auto">
              <div class="bg-red-500 text-white m-2 p-2">Enjoy the vehicle</div>
              </div>
            </div>
           
          </div>
        
        </div>
      </div>
      <div class="m-10 relative h-auto flex md:border md:border-black rounded-lg flex-col md:flex-row">
        <div class='mx-auto my-5'>
        <div class="" ref={dummy}>
        <Car class='inline-block size-5 m-1' />
        <input type="text" class="rounded-md mb-0.5 border-black border" onClick={()=>setCarPicker(!carPicker)}  
        placeholder={pickedVehicle ? pickedVehicle.make + " " + pickedVehicle.model  : data[0].make + " " + data[0].model}/>
        
        {carPicker
          ? <CaretUp class="inline-block m-1 size-5 cursor-pointer" onClick={()=>setCarPicker(!carPicker)}  />
          : <CaretDown class="inline-block m-1 size-5 cursor-pointer" onClick={()=>setCarPicker(!carPicker)} />}
        {carPicker &&
        <ul class="ml-7 absolute overflow-y-scroll border-2 h-full bg-white  border-black rounded border-t-0" >
          
          {data &&
           data.map(car =>{
            return(
              <li class="m-2 cursor-pointer" onClick={()=>{setPickedVehicle(car);setCarPicker(!carPicker)}}>
                
                {car.make} {car.model}
                
              </li>
            )
           })}
        </ul>
        }
        <div class="my-5">
          <MapPin class="inline-block size-5 m-1" />
          <input type="text" class="rounded-md mb-0.5 border border-black" placeholder="Pick up place"/> 
        </div>
        <div class="my-5">
          <CalendarBlank class="inline-block size-5 m-1" />
          <input type="text" class="rounded-md mb-0.5 border-black border" placeholder="Pick up date"/> 
        </div>
        <div class="my-5">
          <CalendarBlank class="inline-block size-5 m-1" />
          <input type="text" class="rounded-md mb-0.5 border-black border" placeholder="Drop off date"/> 
        </div>
        <div class="my-5">
          <span class="inline-block size-5 m-1"></span>
          <input type="text" class="rounded-md mb-0.5 border-black border" placeholder="XXXX-XXXX-XXXX-XXXX"/> 
          <div>
          <span class="inline-block size-5 m-1"></span>
          <img src={visaCard} class="inline-block w-10 h-10 m-2 cursor-pointer" />
          <img src={masterCard} class="inline-block w-10 h-10 m-2 cursor-pointer" />
          </div>

        </div>
        
        </div>
        </div>
        <div class="mx-auto h-1/2 w-1/3" ref={snapBackCar}>
          {pickedVehicle
          ?<img src={pickedVehicle.image} class=""/>
          : <img src={data[0].image} class=""/>
          } 
        </div>
        <div class="mx-auto mb-2">
          {pickedVehicle
          ?<ul class="border border-black mt-5 ">
            <li class="border-b border-black p-2 text-center bg-red-500 text-white">
              ${rentPrice} / per month
            </li>
            <li class="grid p-2 border-b border-black grid-cols-2">
              <span class="border-r border-black border-collapse">Model</span>
              
              <span class="border-l border-black border-collapse pl-5">{pickedVehicle.model}</span>  
            </li>
            <li class="grid p-2 border-b border-black grid-cols-2">
              <span class="border-r border-black border-collapse">Make</span>
              
              <span class="border-l border-black border-collapse pl-5">{pickedVehicle.make}</span>  
            </li>
            <li class="grid p-2 border-b border-black grid-cols-2">
              <span class="border-r border-black border-collapse">Year</span>
              
              <span class="border-l border-black border-collapse pl-5">{pickedVehicle.year}</span>  
            </li>
            <li class="grid p-2 border-b border-black grid-cols-2">
              <span class="border-r border-black border-collapse">Horsepower</span>
              
              <span class="border-l border-black border-collapse pl-5">{pickedVehicle.horsepower}</span>  
            </li>
            <li class="grid p-2 border-b border-black grid-cols-2">
              <span class="border-r border-black border-collapse pt-5">Features</span>
                
              <span class="border-l border-black border-collapse pl-5">
              <div>
                  {pickedVehicle.features[0]}
                </div>
                <div>
                  {pickedVehicle.features[1]}
                </div>
                <div>
                  {pickedVehicle.features[2]}
                </div>
              </span>  
            </li>

          </ul>
          : <ul class="border border-black mt-5 ">
          <li class="border-b border-black p-2 text-center bg-red-500 text-white">
            ${rentPrice} / per month
          </li>
          <li class="grid p-2 border-b border-black grid-cols-2">
            <span class="border-r border-black border-collapse">Model</span>
            
            <span class="border-l border-black border-collapse pl-5">{data[0].model}</span>  
          </li>
          <li class="grid p-2 border-b border-black grid-cols-2">
            <span class="border-r border-black border-collapse">Make</span>
            
            <span class="border-l border-black border-collapse pl-5">{data[0].make}</span>  
          </li>
          <li class="grid p-2 border-b border-black grid-cols-2">
            <span class="border-r border-black border-collapse">Year</span>
            
            <span class="border-l border-black border-collapse pl-5">{data[0].year}</span>  
          </li>
          <li class="grid p-2 border-b border-black grid-cols-2">
            <span class="border-r border-black border-collapse">Horsepower</span>
            
            <span class="border-l border-black border-collapse pl-5">{data[0].horsepower}</span>  
          </li>
          <li class="grid p-2 border-b border-black grid-cols-2">
            <span class="border-r border-black border-collapse pt-5">Features</span>
              
            <span class="border-l border-black border-collapse pl-5">
            <div>
                {data[0].features[0]}
              </div>
              <div>
                {data[0].features[1]}
              </div>
              <div>
                {data[0].features[2]}
              </div>
            </span>  
          </li>

        </ul>}
        </div>
      </div>
      <div>
      <div class="flex flex-row justify-center items-center">
      <div class="my-7 mx-auto p-2 transition-all rounded-2xl overflow-hidden inline-flex bg-white border-stone-700 border  relative">
            <span class="absolute justify-center transition-all left-0 top-0 rounded-2xl bg-red-600 w-full h-full text-center"></span>
            <span class=" w-full transition-colors duration-300 ease-in-out text-white z-10">
              Our Rental Fleet
            </span>
      </div>
      </div>
        <VehicleCard snapBackVehicles={snapBackVehicles}  cars={data} setPickedVehicle={setPickedVehicle} snapBackCar={snapBackCar} />
      </div>
      <div class="">
        <Testimonials />
      </div>
      <div class="md:mt-96 flex">
        <img src={redCar}
         class="w-1/2 h-auto mx-auto  md:mb-auto scale-x-[-1]" />
        <div class="mx-auto"> 
            
            <div class="my-5 flex">
              <Tag size="50" color="red" weight="fill" class="my-auto mr-5 border shadow-lg px-2 rounded-lg bg-gray-200"/>
              <div>
              <h2 class="font-bold text-lg">Best prices to be found</h2>
              <p class="font-light">
                A deal for every budget range.  
                Found a better,cheaper deal elsewhere?Contact us and negotiate
                a deal to your liking or refund 100% no questions asked.
              </p>
              </div>
            </div>
            <div class="my-5 flex">
            <User size="70" color="red" weight="fill" class="my-auto mr-5 border shadow-lg px-2  rounded-lg bg-gray-200"/>
              <div>
              <h2 class="font-bold text-lg">Best services around</h2>
              <p class="font-light">
                We intend to bring the best experience to you by simplifying the steps
                to rent our vehicles.We deliver the vehicle to your desire Location and Date
                for your convenience.After rental time limit has expired,our employee will come retrieve
                the vehicle using the GPS.
              </p>
              </div>
            </div>
            <div class="my-5 flex">
            <Headset size="60" color="red" weight="fill" class="my-auto mr-5 border shadow-lg px-2 rounded-lg bg-gray-200"/>
              <div>
              <h2 class="font-bold text-lg">24 Hours Support</h2>
              <p class="font-light">
                24 hours customer support for your convenience.Call our customer support for
                booking,renting and inquiring about our deals and services.10/10 customer service.100% customer satisfaction
                guaranteed.
              </p>
              </div>
            </div>
        </div>
      </div>
      <div>
        <Budgeting data={data} setPickedVehicle={setPickedVehicle} snapBackCar={snapBackCar}/>
      </div>
      
    </div>
  );
}

export default App;
