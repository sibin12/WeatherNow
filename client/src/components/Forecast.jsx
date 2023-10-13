import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from "react-accessible-accordion";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
    const dayInAWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    return (
        <>
            <label className="text-3xl font-bold">Daily <span className="text-sm">(Click any day for see more infromation.)</span> </label>
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 7).map((item, idx) => (
                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="bg-gray-400 rounded-3xl h-40 my-5 flex items-center cursor-pointer text-lg p-5 ">
                                    <img
                                        src={`icons/${item.weather[0].icon}.png`}
                                        className="w-40"
                                        alt="weather"
                                    />
                                    <label className="flex-1 font-semibold ml-5">
                                        {forecastDays[idx]}
                                    </label>
                                    <label className="flex-1 text-right mr-5">
                                        {item.weather[0].description}
                                    </label>
                                    <label className="text-gray-600">
                                        {Math.round(item.main.temp_max) / 10}°C / {Math.round(item.main.temp_min) / 10}°C
                                    </label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="grid gap-y-0 gap-x-4 sm:gap-x-4 sm:grid-cols-2 p-5">
                                <div className="flex items-center">
                                    <label className="font-semibold text-gray-700">Pressure:</label>
                                    <label>{item.main.pressure}</label>
                                </div>
                                <div className="flex items-center">
                                    <label className="font-semibold text-gray-700">Humidity:</label>
                                    <label>{item.main.humidity}</label>
                                </div>
                                <div className="flex items-center">
                                    <label className="font-semibold text-gray-700">Clouds:</label>
                                    <label>{item.clouds.all}%</label>
                                </div>
                                <div className="flex items-center">
                                    <label className="font-semibold text-gray-700">Wind speed:</label>
                                    <label>{item.wind.speed} m/s</label>
                                </div>
                                <div className="flex items-center">
                                    <label className="font-semibold text-gray-700">Sea level:</label>
                                    <label>{item.main.sea_level}m</label>
                                </div>
                                <div className="flex items-center">
                                    <label className="font-semibold text-gray-700">Feels like:</label>
                                    <label>{Math.round(item.main.feels_like / 10)}°C</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );

};

export default Forecast;
