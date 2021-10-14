import { useCallback, useState } from 'react';

import flatten from 'lodash/flatten';

import Head from 'next/head';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';

// components
import { useFetchDatasets } from 'hooks/dataset';

import Map from 'components/map';
import { BASEMAPS, DEFAULT_VIEWPORT } from 'components/map/constants';
import ZoomControls from 'components/map/controls/zoom';
import Sidebar from 'components/sidebar';

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

  const { data: layers } = useFetchDatasets(
    {},
    {
      select: (_datasets) => flatten(_datasets.map(({ layer }) => layer)),
      placeholderData: [],
    }
  );

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
            {(map) => (
              <>
                <LayerManager map={map} plugin={PluginMapboxGl}>
                  {layers.map((l) => (
                    <Layer key={l.id} {...l} />
                  ))}
                </LayerManager>
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
