import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { useData } from '../hooks/useData';

const geoURL = `https://raw.githubusercontent.com/nos-nart/nos-react-covid-map/master/src/world-110m.json`;

export const MapChart = ({ setTooltipContent }) => {
  const { data, error } = useData('https://opendata.arcgis.com/datasets/1cb306b5331945548745a5ccd290188e_2.geojson');
  const highestCases = data && data.features.reduce((res, current) => {
    return current.properties.Confirmed > res ? current.properties.Confirmed : res;
  }, [0]);

  if (error) return <p>Something went wrong!</p>;
  if (!data) return <p>Loading!</p>;

  return (
    <>
      <ComposableMap
        data-tip=""
        width={1150}
        height={800}
        projectionConfig={{ scale: 240 }}
      >
        <ZoomableGroup>
          <Geographies geography={geoURL}>
          {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME } = geo.properties;
                    setTooltipContent(`${NAME}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={
                    {
                      default: {
                        fill: "#D6D6DA",
                        outline: "none",
                      },
                      hover: {
                        fill: "#D4EBFF",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#2E9BFF",
                        outline: "none",
                      },
                    }
                  }
                />
              ))
            }
          </Geographies>
          {data && data.features.map((item) => {
            const coordinates = item.geometry ? item.geometry.coordinates : [1, 1];
            const location = item.properties.Country_Region;
            const width = item.properties.Confirmed > 750000
              ? item.properties.Confirmed * 150 / highestCases
              : 5;
            return (
              <Marker key={location} coordinates={coordinates}>
                <svg width={width} height={width} viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="25.5" cy="25.5" r="25.5" fill="#FF4B4B"/>
                </svg>
              </Marker>
            )
          })}
        </ZoomableGroup>
      </ComposableMap>
    </>
  )
}
