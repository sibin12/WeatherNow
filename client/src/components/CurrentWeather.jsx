import React from 'react'

function CurrentWeather({data}) {
  return (
    <div className='w-3/4 rounded-lg text-white bg-slate-800 mt-10 me-auto mb-0 ms-auto p-5'>

      <div className='flex justify-between align-middle '>
        <div className='pt-5'>
          <p className='font-bold text-lg m-0 leading-none'>{data?.city}</p>
          <p className='text-base font-thin m-0 leading-none '>{data?.weather[0]?.description}</p>
        </div>
        <img alt='weater' src={`icons/${data.weather[0].icon}.png`} className='w-96' />
      </div>
      <div className='flex justify-between align-middle'>
        <p className='font-black text-4xl w-auto'>{Math.round(data.main.temp)} °C </p>
        <div className='w-full pl-10 grid grid-cols-6 '>
          <div className='col-span-6'>Details</div>
          <div className='col-span-4'>
            <p>Feels like </p>
            <p>Wind </p>
            <p>Humidity </p>
          </div>
          <div className='col-start-6 col-span-1'>
            <p>{Math.round(data.main.feels_like)}</p>
            <p>{data.wind.speed}</p>
            <p>{data.main.humidity}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
