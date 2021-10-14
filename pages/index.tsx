import { useCallback, useState } from 'react';

import Head from 'next/head';

// components
import Map from 'components/map';
import { BASEMAPS, DEFAULT_VIEWPORT } from 'components/map/constants';
import ZoomControls from 'components/map/controls/zoom';
import Sidebar from 'components/sidebar';
// constants

const Home: React.FC = () => {
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);

  const handleViewport = useCallback((_viewport) => {
    setViewport(_viewport);
  }, []);

  const handleZoom = useCallback((zoom) => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      zoom,
      transitionDuration: 250,
    }));
  }, []);

  return (
    <>
      <Head>
        <title>Land Carbon Explorer</title>
      </Head>
      <div className="flex flex-col h-screen">
        <Sidebar />
        <div className="absolute top-0 left-0 w-full h-full">
          <Map
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            viewport={viewport}
            basemap={BASEMAPS.dark.value}
            onMapViewportChange={handleViewport}
          >
            {() => (
              <>
                {/* <LayerManager map={_map} layers={layers} />
                {tooltip.lngLat && (
                  <Popup
                    latitude={tooltip.lngLat[1]}
                    longitude={tooltip.lngLat[0]}
                    closeButton={false}
                    className="rw-ow-popup-layer"
                  >
                    <span
                      style={{
                        color: '#fab72e',
                        textShadow: '1px 1px 2px rgba(15, 69, 115, 0.75)',
                      }}
                    >
                      {tooltip.countryName}
                    </span>
                  </Popup>
                )} */}
              </>
            )}
          </Map>
          <div className="z-10 absolute top-10 right-5">
            <ZoomControls viewport={viewport} onZoomChange={handleZoom} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
