import { useCallback, useState } from 'react';

import { useDispatch } from 'react-redux';

import flatten from 'lodash/flatten';

import Head from 'next/head';

import { setBasemap, setBoundaries, setLabels } from 'store/features/ui/map';
import { useAppSelector } from 'store/hooks';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';

// components

import { useFetchDatasets } from 'hooks/dataset';

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
            basemap={basemap}
            labels={labels}
            boundaries={boundaries}
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
