import type {
    NextPage
} from 'next';
import AddressSelection
    from '@/components/google/AddressSelection';
import GoogleSearchComponent
    from "@/components/google/GoogleSearch";

const Home: NextPage = () => {
    return (
        <div style={{ display: 'flex', height: '500px', width: '600px' }}>
            <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                <AddressSelection />
            </div>
            <div style={{ flex: 1 }}>
                <GoogleSearchComponent />
            </div>
        </div>
    );
};

export default Home;