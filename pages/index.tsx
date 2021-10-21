import { useCallback, useState, useMemo, useEffect } from 'react';

import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';

import flatten from 'lodash/flatten';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { setActiveDatasets } from 'store/features/datasets';
import { setLayerParams } from 'store/features/layers';
import { setBasemap, setBoundaries, setLabels } from 'store/features/ui/map';
import { useAppSelector } from 'store/hooks';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';
import {
  Legend,
  LegendListItem,
  LegendItemToolbar,
  LegendItemTypes,
  Icons,
} from 'vizzuality-components';

import { useFetchDatasets } from 'hooks/dataset';

import Icon from 'components/icon';
import Map from 'components/map';
import { DEFAULT_VIEWPORT } from 'components/map/constants';
import BasemapControls from 'components/map/controls/basemap';
import ZoomControls from 'components/map/controls/zoom';
import Modal from 'components/modal';
import Sidebar from 'components/sidebar';
import { GAPage } from 'lib/analytics/ga';
import { AppDispatch } from 'store';
import { getLayerGroups } from 'utils/layers';

import RW_LOGO_SVG from 'svgs/rw-logo.svg?sprite';

const DEFAULT_MODAL_STATE = {
  title: null,
  content: null,
};

const Home: React.FC = () => {
  const { pathname } = useRouter();
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const [modalContent, setModalContent] = useState(DEFAULT_MODAL_STATE);
  const [layersOrder, setLayersOrder] = useState([]);
  const dispatch: AppDispatch = useDispatch();
  const basemap = useAppSelector((state) => state.map.basemap);
  const labels = useAppSelector((state) => state.map.labels);
  const boundaries = useAppSelector((state) => state.map.boundaries);
  const layerParams = useAppSelector((state) => state.layers);
  const activeDatasets = useAppSelector((state) => state.activeDatasets);

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

  const onChangeOrder = useCallback((newOrder) => {
    setLayersOrder(newOrder);
  }, []);

  const onChangeOpacity = useCallback((layer, opacity) => {
    dispatch(
      setLayerParams({
        id: layer.id,
        params: {
          opacity,
        },
      })
    );
  }, []);

  const onChangeVisibility = useCallback((layer) => {
    dispatch(
      setLayerParams({
        id: layer.id,
        params: {
          visibility: !layer.visibility,
        },
      })
    );
  }, []);

  const onChangeLayer = useCallback(() => {}, []);

  const onRemoveLayer = useCallback(
    (layer) => {
      dispatch(
        setActiveDatasets(activeDatasets.filter((datasetId) => datasetId !== layer.dataset))
      );
    },
    [activeDatasets]
  );

  const { data: datasets } = useFetchDatasets(
    {},
    {
      placeholderData: [],
    }
  );

  const layers = useMemo(
    () =>
      flatten(
        datasets
          .filter(({ id }) => activeDatasets.includes(id))
          .map(({ layer }) =>
            layer.map((_layer) => ({
              ..._layer,
              ...(layerParams[_layer.id] || {}),
            }))
          )
      ).sort((a, b) => (layersOrder.indexOf(a.dataset) > layersOrder.indexOf(b.dataset) ? 1 : -1)),
    [datasets, activeDatasets, layerParams, layersOrder]
  );

  const layerGroups = useMemo(() => getLayerGroups(layers, layerParams), [layers, layerParams]);

  const onChangeInfo = useCallback(
    (layer) => {
      const datasetMetadata = datasets.find(({ id }) => id === layer.dataset)?.metadata;

      const { name, source, description, info } = datasetMetadata?.[0];

      const {
        technical_title: techincalTitle,
        sources,
        functions,
        cautions,
        citations,
        license,
        license_link: licenseLink,
        spatial_resolution: spatialResolution,
        date_of_content: dateOfContent,
        geographic_coverage: geographicCoverage,
        learn_more_link: learnMoreLink,
        data_download_original_link: dataDownloadOriginalLink,
        data_download_link: dataDownloadLink,
      } = info;

      setModalContent({
        title: name,
        content: (
          <div>
            <h2>{name}</h2>
            <p className="text-xs">SOURCE: {source}</p>

            {functions && <p>{functions}</p>}

            <p>
              <ul>
                <li>
                  {(dataDownloadLink || dataDownloadOriginalLink) && (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={dataDownloadLink || dataDownloadOriginalLink}
                    >
                      Download
                    </a>
                  )}
                </li>
                <li>
                  {learnMoreLink && (
                    <a target="_blank" rel="noopener noreferrer" href={learnMoreLink}>
                      Learn more from source
                    </a>
                  )}
                </li>
              </ul>
            </p>
            {description && <ReactMarkdown>{description}</ReactMarkdown>}

            <h3>Further Information</h3>

            {techincalTitle && (
              <div>
                <h4>Formal Name</h4>
                <p>{techincalTitle}</p>
              </div>
            )}

            {cautions && (
              <div>
                <h4>Cautions</h4>
                <ReactMarkdown>{cautions}</ReactMarkdown>
              </div>
            )}

            {citations && (
              <div>
                <h4>Suggested Citation</h4>
                <ReactMarkdown>{citations}</ReactMarkdown>
              </div>
            )}

            {spatialResolution && (
              <div>
                <h4>Spatial Resolution</h4>
                <p>{spatialResolution}</p>
              </div>
            )}

            {sources.length && (
              <div>
                <h4>Sources</h4>
                <p>
                  <ul>
                    {sources.map((sourceMeta) => (
                      <li>{sourceMeta['source-name'] || sourceMeta['source-description']}</li>
                    ))}
                  </ul>
                </p>
              </div>
            )}

            {license && (
              <div>
                <h4>License</h4>
                <p>
                  {licenseLink ? (
                    <a target="_blank" rel="noreferrer noopener" href={licenseLink}>
                      {license}
                    </a>
                  ) : (
                    license
                  )}
                </p>
              </div>
            )}

            {dateOfContent && (
              <div>
                <h4>Date of content</h4>
                <p>{dateOfContent}</p>
              </div>
            )}

            {geographicCoverage && (
              <div>
                <h4>Geographic coverage</h4>
                <p>{geographicCoverage}</p>
              </div>
            )}
          </div>
        ),
      });
    },
    [datasets]
  );

  useEffect(() => {
    const newActiveDatasets = datasets.filter(({ active }) => active).map(({ id }) => id);

    dispatch(setActiveDatasets(newActiveDatasets));
  }, [datasets]);

  useEffect(() => {
    GAPage(pathname);
  }, [pathname]);

  return (
    <>
      <Head>
        <title>Global Land Cover Change Explorer</title>
        <meta name="description" content="Explore global high-resolution land cover change data" />
      </Head>
      <div
        className="bg-rw-pink bg-no-repeat bg-center bg-cover pl-4 pr-4"
        style={{
          height: 75,
          backgroundImage:
            'url(/images/header-bg-texture.png), linear-gradient(86deg,rgba(195,45,123,.8),rgba(201,14,57,.7))',
        }}
      >
        <div className="md:max-w-screen-md xl:max-w-screen-xl m-auto flex items-center justify-between h-full">
          <a href="https://resourcewatch.org">
            <Icon
              icon={RW_LOGO_SVG}
              className="text-white"
              style={{
                width: 200,
                height: 35,
              }}
            />
          </a>
          <nav>
            <ul>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://landcarbonlab.org/contact-us"
                  className="text-white hover:text-rw-yellow no-underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex flex-col relative" style={{ height: 'calc(100vh - 75px)' }}>
        <Sidebar />
        <div className="absolute top-0 left-0 right-0 h-full">
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
          <div className="z-10 absolute bottom-10 right-5">
            <Legend maxHeight={300} onChangeOrder={onChangeOrder}>
              {layerGroups.map((lg, i) => (
                <LegendListItem
                  index={i}
                  key={lg.id}
                  layerGroup={lg}
                  toolbar={<LegendItemToolbar />}
                  onChangeInfo={onChangeInfo}
                  onChangeOpacity={onChangeOpacity}
                  onChangeVisibility={onChangeVisibility}
                  onChangeLayer={onChangeLayer}
                  onRemoveLayer={onRemoveLayer}
                >
                  <LegendItemTypes />
                </LegendListItem>
              ))}
            </Legend>
          </div>
        </div>
      </div>
      <Modal
        open={Boolean(modalContent.content)}
        onDismiss={() => setModalContent(DEFAULT_MODAL_STATE)}
        title={modalContent.title}
      >
        <div className="p-6 overflow-y-auto">{modalContent.content}</div>
      </Modal>
      <Icons />
    </>
  );
};

export default Home;
