import Head from 'next/head';

// components
import Map from 'components/map';

const Home: React.FC = () => (
  <div>
    <Head>
      <title>Land Carbon Explorer</title>
    </Head>
    <div className="absolute top-0 left-0 w-full h-full">
      <Map
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onMapViewportChange={() => {}}
      />
    </div>
  </div>
);

export default Home;
