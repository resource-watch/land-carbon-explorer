import { useCallback, useState } from 'react';

import { useDispatch } from 'react-redux';

import Head from 'next/head';

// components
import { setBasemap, setBoundaries, setLabels } from 'store/features/ui/map';
import { useAppSelector } from 'store/hooks';

import Map from 'components/map';
import { DEFAULT_VIEWPORT } from 'components/map/constants';
import BasemapControls from 'components/map/controls/basemap';
import ZoomControls from 'components/map/controls/zoom';
import Sidebar from 'components/sidebar';
import { AppDispatch } from 'store';

const Home: React.FC = () => {
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const dispatch: AppDispatch = useDispatch();
  const basemap = useAppSelector((state) => state.map.basemap);
  const labels = useAppSelector((state) => state.map.labels);
  const boundaries = useAppSelector((state) => state.map.boundaries);

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

  const handleBasemap = useCallback(({ id }) => {
    dispatch(setBasemap(id));
  }, []);

  const handleBoundaries = useCallback((_boundaries) => {
    dispatch(setBoundaries(_boundaries));
  }, []);

  const handleLabels = useCallback(({ value }) => {
    dispatch(setLabels(value));
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
            basemap={basemap}
            labels={labels}
            boundaries={boundaries}
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
            <BasemapControls
              basemap={basemap}
              labels={labels}
              boundaries={boundaries}
              onChangeBasemap={handleBasemap}
              onChangeLabels={handleLabels}
              onChangeBoundaries={handleBoundaries}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
